import * as React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Typography, Container, Card, CardContent, CardHeader, Button, TextField, Avatar, Grid } from '@mui/material';
import { QrReader } from 'react-qr-reader';
import { fetch } from 'cross-fetch';
import * as QueryString from 'query-string';
import { VerifiableTool, DidTool, PrivateKeyTool, VcTool, JWTObject } from '../helpers/didTools';
import { useDidContext, useSettingsContext, useNowLoadingContext } from '../layout/sideMenuLayout';
import * as uuid from 'uuid';

const STATUS = {
  QR_READ: 0,
  QR_READED: 1,
  VC_CONFIRM: 2,
  VC_RECEIVED: 3
};

export const PageQr = () => {
  const [status, setStatus] = React.useState(STATUS.QR_READ);
  const [qrText, setQrText] = React.useState('');
  const [inputText, setInputText] = React.useState('');
  const [inputPin, setInputPin] = React.useState('');
  const [vcProcess, setVcProcess] = React.useState({credentialOffer:{} as JWTObject, vcExpert:{} as JWTObject});

  const didContext = useDidContext();
  const settingsContext = useSettingsContext();
  const nowLoadingContext = useNowLoadingContext();
  const navigate = useNavigate();

  if (!didContext.didModel) {
    return (<Navigate to="/" replace />);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.id) {
      case 'input-text':
        setInputText(() => e.target.value)
        break;
      case 'input-pin':
        setInputPin(() => e.target.value)
        break;
    }
  };

  const getCredentialOffer = async (url: string) => {
    const parsed = QueryString.parseUrl(url);
    const response = await fetch(parsed.query.request_uri as string);
    const body = await response.text();
    const jwt = VerifiableTool.decodeJWS(body);
    console.log(jwt);
    return jwt;
  };

  const getVCExpert = async (url: string) => {
    const response = await fetch(url);
    const resJson = await response.json();
    const jwt = VerifiableTool.decodeJWS(resJson.token);
    console.log(jwt);
    return jwt;
  };

  const manualInput = async () => {
    issueVc(inputText);
  };

  const issueVc = async (requestUrl: string) => {
    if (!settingsContext.settings) {
      return
    }
    if (!didContext.didModel) {
      return
    }

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
      setStatus(STATUS.VC_CONFIRM);
    } catch (e) {
      alert(e);
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
      console.log(credentialRequestJws);

      const response = await fetch(vcProcess.vcExpert.payload.input.credentialIssuer, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        body: credentialRequestJws,
      });

      const resJson = await response.json();
      const jwt = VerifiableTool.decodeJWS(resJson.vc);
      console.log(jwt);

      // VCの保存
      await VcTool.save(jwt);

      setStatus(STATUS.VC_RECEIVED);
    } catch (e) {
      alert(e);
    };

    setTimeout(() => {
      nowLoadingContext.setNowLoading(false);
    }, 300);
  };

  const qr = (
    <QrReader
      constraints={{ facingMode: 'environment' }}
      onResult={(result) => {
        if (result) {
          console.log(result);
          setQrText(result.getText());
          issueVc(result.getText());
        }
      }}
    />
  );

  const qrResult = (
    <Card variant='outlined'>
      <CardContent>
        <Typography variant='h6'>
          QR読み取り結果
        </Typography>
        <Typography sx={{wordWrap: 'break-word', marginTop: '16px'}}>
          { qrText }
        </Typography>
      </CardContent>
    </Card>
  );

  const qrRead = (
    <Container maxWidth='sm' sx={{paddingX: '8px'}}>
      <Typography variant='h5' sx={{marginBottom: '16px'}}>
        QR読み取り
      </Typography>
      <Container maxWidth='sm'>
        { !qrText && qr }
        { qrText && qrResult }
      </Container>
      <Container maxWidth='sm' sx={{marginTop: '16px'}}>
        <TextField id='input-text' label='URL(openid://vc/)' fullWidth multiline maxRows={6} size='small' value={inputText} onChange={handleChange} />
        <Button variant='contained' sx={{marginTop: '8px'}} onClick={manualInput}>手入力</Button>
      </Container>
    </Container>
  );

  const vcConfirm = (
    <Container maxWidth='sm' sx={{paddingX: '8px'}}>
      <Typography variant='h5' sx={{marginBottom: '16px'}}>
        VC発行確認
      </Typography>
      <Card sx={{bgcolor: '#2E4053'}}>
        <CardHeader 
        avatar={<Avatar src='https://didcustomerplayground.blob.core.windows.net/public/VerifiedCredentialExpert_icon.png' />}
        title='Verified Credential Expert'
        sx={{color: 'white'}}
        />
        <CardContent>
          <Typography sx={{color: 'white'}}>
            <br/>
            Microsoft
          </Typography>
        </CardContent>
      </Card>
      <Typography sx={{marginTop: '16px'}}>Do you want to get your Verified Credential?</Typography>
      <TextField id='input-pin' label='PIN' fullWidth sx={{marginTop: '16px'}} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        value={inputPin} onChange={handleChange} 
      />
      <Grid container spacing={2} sx={{marginTop: '16px'}}>
        <Grid item xs={6}>
          <Button variant='outlined' fullWidth onClick={() => navigate('/')}>キャンセル</Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant='contained' fullWidth onClick={addVC}>追加</Button>
        </Grid>
      </Grid>
    </Container>
  );

  const vcComp = (
    <Container maxWidth='sm' sx={{paddingX: '8px'}}>
      <Typography variant='h5' sx={{marginBottom: '16px'}}>
        VC受け取り完了
      </Typography>
      <Typography>
        VCをウォレットに登録しました。
      </Typography>
    </Container>
  );

  if (status === STATUS.VC_RECEIVED) {
    return vcComp;
  }

  if (status === STATUS.VC_CONFIRM) {
    return vcConfirm;
  }

  return qrRead;
}