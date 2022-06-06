import * as React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Typography, Container, Card, CardContent, CardHeader, Button, TextField, Avatar, Grid } from '@mui/material';
import { QrReader } from 'react-qr-reader';
import { fetch } from 'cross-fetch';
import * as QueryString from 'query-string';
import { VerifiableTool, DidTool, PrivateKeyTool, VcTool } from '../helpers/didTools';
import { useDidContext, useSettingsContext, useNowLoadingContext } from '../layout/sideMenuLayout';
import * as uuid from 'uuid';

export const PageQr = () => {
  const [qrText, setQrText] = React.useState('');
  const [inputText, setInputText] = React.useState('');
  const [inputPin, setInputPin] = React.useState('');
  const [vcProcess, setVcProcess] = React.useState({credentialOffer:{} as any, credentialIssuerUrl:''});
  const [isFinished, setFinished] =  React.useState(false);
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

  const issueVc = async () => {
    setQrText(inputText);

    if (!settingsContext.settings) {
      return
    }
    if (!didContext.didModel) {
      return
    }

    nowLoadingContext.setNowLoading(true);

    // 1. オファーリクエストを取得(Issure→HolderへのSIOP Request)
    const credentialOffer = await getCredentialOffer(inputText);

    // 2. オファーリクエストの検証
    const manifestUrl = credentialOffer.payload.claims.vp_token.presentation_definition.input_descriptors[0].issuance[0].manifest;
    const vcExpert = await getVCExpert(manifestUrl);

    // 情報を一時保存
    setVcProcess({
      credentialOffer: credentialOffer,
      credentialIssuerUrl: vcExpert.payload.input.credentialIssuer
    })

    // ここで内容をユーザーに提示し、確認を行う
    setTimeout(() => {
      nowLoadingContext.setNowLoading(false);
    }, 300);
  }

  const addVC = async () => {
    // 3. レスポンス(Holder→IssureへのSIOP Response)
    if (!settingsContext.settings) {
      return
    }
    if (!didContext.didModel) {
      return
    }

    nowLoadingContext.setNowLoading(true);

    // 未公開の場合はDID(Long)を使用
    const did = didContext.didModel.published ? didContext.didModel.did : didContext.didModel.didLong;
    
    // 自身の公開鍵を取得
    const didInfo = await DidTool.resolve(settingsContext.settings.urlResolve, did);

    const credentialRequest = {
      header: {
        alg: 'ES256K',
        typ: 'JWT',
        kid: did + '#' + didContext.didModel.signingKeyId
      },
      payload: {
        iss: 'https://self-issued.me',
        // 一旦固定値
        aud: 'https://beta.did.msidentity.com/v1.0/f55d947c-0f8e-48d7-b1ea-b7f5c99291ce/verifiableCredential/card/issue',
        contract: 'https://beta.did.msidentity.com/v1.0/f55d947c-0f8e-48d7-b1ea-b7f5c99291ce/verifiableCredential/contracts/VerifiedCredentialExpert',
        iat: Date.now(),
        exp: Date.now() + 600,
        sub_jwk: JSON.parse(JSON.stringify(didInfo.didDocument.verificationMethod[0].publicKeyJwk)),
        sub: VerifiableTool.generateSub(didInfo.didDocument.verificationMethod[0].publicKeyJwk),
        jti: uuid.v4(),
        did: did,
        pin: VerifiableTool.generateHash(inputPin),
        attestations: {
          idTokens: {
            'https://self-issued.me': vcProcess.credentialOffer.payload.id_token_hint
          }
        }
      }
    };
    console.log(credentialRequest);

    // 秘密鍵で署名
    const privateKeyModel = await PrivateKeyTool.load(didContext.didModel.signingKeyId);
    const credentialRequestJws = await VerifiableTool.signJws(credentialRequest.header, credentialRequest.payload, privateKeyModel?.privateKey);
    console.log(credentialRequestJws);

    const response = await fetch(vcProcess.credentialIssuerUrl, {
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

    setTimeout(() => {
      nowLoadingContext.setNowLoading(false);
      setFinished(true);
    }, 300);
  };

  const qr = (
    <QrReader
      constraints={{ facingMode: 'environment' }}
      onResult={(result) => {
        if (result) {
          console.log(result);
          setQrText(result.getText());
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
        <Button variant='contained' sx={{marginTop: '8px'}} onClick={issueVc}>手入力</Button>
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
      <TextField id='input-pin' label='PIN' fullWidth sx={{marginTop: '16px'}} value={inputPin} onChange={handleChange} />
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

  if (isFinished) {
    return vcComp;
  }

  if (vcProcess.credentialIssuerUrl) {
    return vcConfirm;
  }

  return qrRead;
}