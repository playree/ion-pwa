import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Container, Card, CardContent, CardHeader, Button, TextField, Avatar, Grid } from '@mui/material';
import { fetch } from 'cross-fetch';
import * as QueryString from 'query-string';
import { VerifiableTool, DidTool, PrivateKeyTool, VcTool, JWTObject } from '../helpers/didTools';
import { useDidContext, useSettingsContext, useNowLoadingContext } from '../layout/sideMenuLayout';
import * as uuid from 'uuid';
import { useParams } from "react-router";
import base64url from 'base64url';
import { Settings } from '../helpers/settings';

const STATUS = {
  INIT: 0,
  START: 1,
  SIOP_CONFIRM: 11,
  SIOP_RECEIVED: 12,
};

type Params = {
  param: string;
};

export const PageVcIssue = () => {
  const { param } = useParams<Params>();
  const [status, setStatus] = React.useState(STATUS.INIT);
  const [inputPin, setInputPin] = React.useState('');
  const [vcProcess, setVcProcess] = React.useState({ credentialOffer: {} as JWTObject, vcExpert: {} as JWTObject });

  const didContext = useDidContext();
  const settingsContext = useSettingsContext();
  const nowLoadingContext = useNowLoadingContext();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (status === STATUS.INIT) {
      nowLoadingContext.setNowLoading(true);
      handleProc();
    };
    return () => {

    };
  });

  const handleProc = async () => {
    setStatus(STATUS.START);
    if (param) {
      // 設定の読み込み
      settingsContext.setSettings(await Settings.load());

      // DIDの読み込み
      const didModel = await DidTool.load();
      if (didModel) {
        didContext.setDidModel(didModel);
      }

      const requestUrl = base64url.decode(param);
      if (requestUrl.indexOf('openid://vc/') === 0) {
        issueVc(requestUrl);
        return
      }
    }
    
    navigate('/');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.id) {
      case 'input-pin':
        setInputPin(() => e.target.value)
        break;
    }
  };

  const getCredentialOffer = async (url: string) => {
    if (!settingsContext.settings) {
      throw new Error('Not initialized');
    };

    // 取得
    const parsed = QueryString.parseUrl(url);
    const response = await fetch(parsed.query.request_uri as string);
    const body = await response.text();
    const jwt = VerifiableTool.decodeJws(body);
    console.log(jwt);

    // 署名検証
    if (! await VerifiableTool.verifyJwsByDid(jwt, settingsContext.settings.urlResolve)) {
      throw new Error('verifyJwsByDid NG: CredentialOffer');
    };
    console.log('verifyJwsByDid OK');

    return jwt;
  };

  const getVCExpert = async (url: string) => {
    if (!settingsContext.settings) {
      throw new Error('Not initialized');
    };

    const response = await fetch(url);
    const resJson = await response.json();
    const jwt = VerifiableTool.decodeJws(resJson.token);
    console.log(jwt);

    // 署名検証
    if (! await VerifiableTool.verifyJwsByDid(jwt, settingsContext.settings.urlResolve)) {
      throw new Error('verifyJwsByDid NG: CredentialOffer');
    };
    console.log('verifyJwsByDid OK');

    return jwt;
  };

  const issueVc = async (requestUrl: string) => {
    if (!settingsContext.settings) {
      return
    };
    if (!didContext.didModel) {
      return
    };

    if (requestUrl.indexOf('openid://vc/') !== 0) {
      alert('openid://vc/ 形式のみ有効です')
      return;
    };

    try {
      nowLoadingContext.setNowLoading(true);

      // 1. オファーリクエストを取得(Issure→HolderへのSIOP Request)
      const credentialOffer = await getCredentialOffer(requestUrl);

      // 2. オファーリクエストの検証
      const manifestUrl = credentialOffer.payload.claims.vp_token.presentation_definition.input_descriptors[0].issuance[0].manifest;
      const vcExpert = await getVCExpert(manifestUrl);

      // 情報を一時保存
      setVcProcess({
        credentialOffer: credentialOffer,
        vcExpert: vcExpert
      });
      setStatus(STATUS.SIOP_CONFIRM);
    } catch (e: any) {
      alert(e.message || e);
    };

    // ここで内容をユーザーに提示し、確認を行う
    setTimeout(() => {
      nowLoadingContext.setNowLoading(false);
    }, 300);
  }

  const addVC = async () => {
    if (!settingsContext.settings) {
      return
    }
    if (!didContext.didModel) {
      return
    }

    // 3. レスポンス(Holder→IssureへのSIOP Response)

    try {
      nowLoadingContext.setNowLoading(true);

      // 自身の公開鍵を取得
      const didInfo = await DidTool.resolve(settingsContext.settings.urlResolve, didContext.didModel.did);

      const credentialRequest = {
        header: {
          alg: 'ES256K',
          typ: 'JWT',
          kid: didContext.didModel.kid
        },
        payload: {
          iss: 'https://self-issued.me',
          aud: vcProcess.vcExpert.payload.input.credentialIssuer,
          contract: vcProcess.vcExpert.payload.display.contract,
          iat: Date.now(),
          exp: Date.now() + 600,
          sub_jwk: JSON.parse(JSON.stringify(didInfo.didDocument.verificationMethod[0].publicKeyJwk)),
          sub: VerifiableTool.generateSub(didInfo.didDocument.verificationMethod[0].publicKeyJwk),
          jti: uuid.v4(),
          did: didContext.didModel.did,
          pin: VerifiableTool.generateHash(inputPin),
          attestations: {
            idTokens: {
              'https://self-issued.me': vcProcess.credentialOffer.payload.id_token_hint
            }
          }
        }
      };

      // To Micfosoft向けの置換
      if (credentialRequest.payload.aud.indexOf('/api/issuer/card') > -1) {
        credentialRequest.payload.aud = 'https://beta.did.msidentity.com/v1.0/f55d947c-0f8e-48d7-b1ea-b7f5c99291ce/verifiableCredential/card/issue';
      };

      console.log(credentialRequest);

      // 秘密鍵で署名
      const privateKeyModel = await PrivateKeyTool.load(didContext.didModel.signingKeyId);
      const credentialRequestJws = await VerifiableTool.signJws(credentialRequest.header, credentialRequest.payload, privateKeyModel?.privateKey);
      //console.log(credentialRequestJws);

      const response = await fetch(vcProcess.vcExpert.payload.input.credentialIssuer, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        body: credentialRequestJws,
      });

      if (response.status !== 200) {
        throw Error(await response.text());
      }

      const resJson = await response.json();
      const jwt = VerifiableTool.decodeJws(resJson.vc);
      console.log(jwt);

      // 署名検証
      if (! await VerifiableTool.verifyJwsByDid(jwt, settingsContext.settings.urlResolve)) {
        throw new Error('verifyJwsByDid NG: CredentialOffer');
      };
      console.log('verifyJwsByDid OK');

      // VCの保存
      await VcTool.save(jwt);

      setStatus(STATUS.SIOP_RECEIVED);
    } catch (e: any) {
      alert(e.message || e);
    };

    setTimeout(() => {
      nowLoadingContext.setNowLoading(false);
    }, 300);
  };

  if (status === STATUS.SIOP_RECEIVED) {
    return (
      <Container maxWidth='sm' sx={{ paddingX: '8px' }}>
        <Typography variant='h5' sx={{ marginBottom: '16px' }}>
          VC受け取り完了
        </Typography>
        <Typography>
          VCをウォレットに登録しました。
        </Typography>
      </Container>
    );
  }

  if (status === STATUS.SIOP_CONFIRM) {
    return (
      <Container maxWidth='sm' sx={{ paddingX: '8px' }}>
        <Typography variant='h5' sx={{ marginBottom: '16px' }}>
          VC発行確認
        </Typography>
        <Card sx={{ bgcolor: vcProcess.vcExpert.payload.display.card.backgroundColor, maxWidth: '360px', marginX: 'auto' }}>
          <CardHeader
            avatar={<Avatar src={vcProcess.vcExpert.payload.display.card.logo.uri} />}
            title={vcProcess.vcExpert.payload.display.card.title}
            sx={{ color: vcProcess.vcExpert.payload.display.card.textColor }}
          />
          <CardContent>
            <Typography sx={{ color: vcProcess.vcExpert.payload.display.card.textColor }}>
              <br />
              Microsoft
            </Typography>
          </CardContent>
        </Card>
        <Typography sx={{ marginTop: '16px' }}>{vcProcess.vcExpert.payload.display.consent.title}</Typography>
        <TextField id='input-pin' label='PIN' fullWidth sx={{ marginTop: '16px' }} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          value={inputPin} onChange={handleChange}
        />
        <Grid container spacing={2} sx={{ marginTop: '16px' }}>
          <Grid item xs={6}>
            <Button variant='outlined' fullWidth onClick={() => navigate('/')}>キャンセル</Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant='contained' fullWidth onClick={addVC}>追加</Button>
          </Grid>
        </Grid>
      </Container>
    );
  }

  return (
    <Container maxWidth='sm' sx={{ paddingX: '8px' }}>
      <Typography variant='h5' sx={{ marginBottom: '16px' }}>
        VC発行
      </Typography>
    </Container>
  );
}