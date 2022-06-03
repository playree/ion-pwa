import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { Typography, Container, Card, CardContent, Button, TextField } from '@mui/material';
import { QrReader } from 'react-qr-reader';
import { fetch } from 'cross-fetch';
import * as QueryString from 'query-string';
import { VerifiableTool, DidTool, PrivateKeyTool } from '../helpers/didTools';
import { useDidContext, useSettingsContext } from '../layout/sideMenuLayout';

export const PageQr = () => {
  const [qrText, setQrText] = React.useState('');
  const [inputText, setInputText] = React.useState('');
  const didContext = useDidContext();
  const settingsContext = useSettingsContext();

  if (!didContext.didModel) {
    return (<Navigate to="/" replace />);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.id) {
      case 'input-text':
        setInputText(() => e.target.value)
        break;
    }
  };

  const issueVc = async () => {
    const parsed = QueryString.parseUrl(inputText);
    let requestBody = inputText;

    setQrText(inputText);

    if (!settingsContext.settings) {
      return
    }
    if (!didContext.didModel) {
      return
    }

    if (parsed.url === 'openid://vc/') {
      const res = await fetch(parsed.query.request_uri as string);
      requestBody = await res.text();
    };

    const credentialOffer = VerifiableTool.decodeJWS(requestBody);
    console.log(credentialOffer);

    const didInfo = await DidTool.resolve(settingsContext.settings.urlResolve, didContext.didModel.did);

    const credentialRequest = {
      header: {
        alg: 'ES256K',
        typ: 'JWT',
        kid: didContext.didModel.did
      },
      payload: {
        iss: 'https://self-issued.me',
        aud: 'https://beta.did.msidentity.com/v1.0/f55d947c-0f8e-48d7-b1ea-b7f5c99291ce/verifiableCredential/card/issue',
        nonce: credentialOffer.payload.nonce,
        iat: Date.now(),
        exp: Date.now() + 600,
        sub_jwk: JSON.parse(JSON.stringify(didInfo.didDocument.verificationMethod[0].publicKeyJwk)),
        sub: '',
        //jti: credentialOffer.payload.jti,
        did: didContext.didModel.did,
        pin: credentialOffer.payload.pin,
        given_name: 'Megan',
        family_name: 'Bowen'
      }
    };

    credentialRequest.payload.sub_jwk.kid = didContext.didModel.did + '#' + didContext.didModel.signingKeyId;
    credentialRequest.payload.sub = VerifiableTool.generateSub(credentialRequest.payload.sub_jwk);
    console.log(credentialRequest);

    const privateKeyModel = await PrivateKeyTool.load(didContext.didModel.signingKeyId);
    const credentialRequestJws = await VerifiableTool.signJws(credentialRequest.header, credentialRequest.payload, privateKeyModel?.privateKey);
    console.log(credentialRequestJws);

    const check = await VerifiableTool.verifyJws(
      credentialRequestJws, 
      didInfo.didDocument.verificationMethod[0].publicKeyJwk
      );
    console.log(check);

    const params = new URLSearchParams();
    params.append('id_token', credentialRequestJws);
    params.append('state', credentialOffer.payload.state);
    params.append('code', 'issuance_successful');
    const res = await fetch(credentialOffer.payload.client_id, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache', 
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    });

    console.log(res);
    const resText = await res.text();
    console.log(resText);
  }

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

  return (
    <>
      <Container maxWidth='sm' sx={{paddingX: '8px'}}>
        <Typography variant='h5' sx={{marginBottom: '16px'}}>
          QR読み取り
        </Typography>
        <Container maxWidth='sm'>
          { !qrText && qr }
          { qrText && qrResult }
        </Container>
        <Container maxWidth='sm' sx={{marginTop: '16px'}}>
          <TextField id='input-text' label='URL or JWT' fullWidth multiline maxRows={6} size='small' value={inputText} onChange={handleChange} />
          <Button variant='contained' onClick={issueVc}>手入力</Button>
        </Container>
      </Container>
    </>
  );
}