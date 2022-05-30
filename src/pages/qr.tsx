import * as React from 'react';
import { Typography, Container, Card, CardContent } from '@mui/material';
import { QrReader } from 'react-qr-reader';

export const PageQr = () => {
  const [qrText, setQrText] = React.useState('');

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
      </Container>
    </>
  );
}