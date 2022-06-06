import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { Typography, Container, Card, CardContent, Button, TextField } from '@mui/material';
import { QrReader } from 'react-qr-reader';
import { fetch } from 'cross-fetch';
import * as QueryString from 'query-string';
import { VerifiableTool, DidTool, PrivateKeyTool } from '../helpers/didTools';
import { useDidContext, useSettingsContext } from '../layout/sideMenuLayout';
import * as uuid from 'uuid';
import JwkEs256k from '@decentralized-identity/ion-sdk/dist/lib/models/JwkEs256k';

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

  const test = async () => {
    console.log(VerifiableTool.generateSub({
      "crv": "secp256k1",
      "kid": "9aa35e33b27a53c2eb9ef75271b76ff3",
      "kty": "EC",
      "use": "sig",
      "x": "rkH9Ltua6mU61m0M8TEXX4Mk6iNzqJEtZK5OJiGR4xg",
      "y": "tpzAbREmd7aYygmLbq2gXQemtrV4iF4C3mbL6_stLR8"
    }));
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

    // 未公開の場合はDID(Long)を使用
    const did = didContext.didModel.published ? didContext.didModel.did : didContext.didModel.didLong;

    // 1. オファーリクエストを取得(Issure→HolderへのSIOP Request)
    const credentialOffer = await getCredentialOffer(inputText);

    // 2. オファーリクエストの検証
    const manifestUrl = credentialOffer.payload.claims.vp_token.presentation_definition.input_descriptors[0].issuance[0].manifest;
    const vcExpert = await getVCExpert(manifestUrl);
    // ここで内容をユーザーに提示し、確認を行う

    // 3. レスポンス(Holder→IssureへのSIOP Response)
    const credentialIssuerUrl = vcExpert.payload.input.credentialIssuer;

    // 自身の公開鍵を取得
    const didInfo = await DidTool.resolve(settingsContext.settings.urlResolve, did);

    const credentialRequest = {
      header: {
        alg: 'ES256K',
        typ: 'JWT',
        kid: did
      },
      payload: {
        iss: 'https://self-issued.me',
        aud: 'https://beta.did.msidentity.com/v1.0/f55d947c-0f8e-48d7-b1ea-b7f5c99291ce/verifiableCredential/card/issue',
        contract: 'https://beta.did.msidentity.com/v1.0/f55d947c-0f8e-48d7-b1ea-b7f5c99291ce/verifiableCredential/contracts/VerifiedCredentialExpert',
        iat: Date.now(),
        exp: Date.now() + 600,
        sub_jwk: JSON.parse(JSON.stringify(didInfo.didDocument.verificationMethod[0].publicKeyJwk)),
        sub: VerifiableTool.generateSub(didInfo.didDocument.verificationMethod[0].publicKeyJwk),
        jti: uuid.v4(),
        did: did,
        pin: VerifiableTool.generateHash('1106'),
        attestations: {
          idTokens: {
            'https://self-issued.me': credentialOffer.payload.id_token_hint
          }
        }
      }
    };

    //credentialRequest.payload.sub_jwk.kid = didContext.didModel.did + '#' + didContext.didModel.signingKeyId;
    console.log(credentialRequest);

    const privateKeyModel = await PrivateKeyTool.load(didContext.didModel.signingKeyId);
    const credentialRequestJws = await VerifiableTool.signJws(credentialRequest.header, credentialRequest.payload, privateKeyModel?.privateKey);
    console.log(credentialRequestJws);

    // const params = new URLSearchParams();
    // params.append('id_token', credentialRequestJws);
    // params.append('state', credentialOffer.payload.state);
    //params.append('code', 'issuance_successful');
    //const res = await fetch(credentialOffer.payload.redirect_uri, {
    const res = await fetch(credentialIssuerUrl, {
    //const res = await fetch('https://beta.did.msidentity.com/v1.0/f55d947c-0f8e-48d7-b1ea-b7f5c99291ce/verifiableCredential/card/issue', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      body: credentialRequestJws,
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
          <TextField id='input-text' label='URL(openid://vc/)' fullWidth multiline maxRows={6} size='small' value={inputText} onChange={handleChange} />
          <Button variant='contained' onClick={issueVc}>手入力</Button>
          <Button variant='contained' onClick={test}>Test</Button>
        </Container>
      </Container>
    </>
  );
}