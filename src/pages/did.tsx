import * as React from 'react';
import { Typography, Container, Grid, Button, TextField, Snackbar, Alert } from '@mui/material';
import { Save as IconSave } from '@mui/icons-material'
import { IonDid, IonDocumentModel, IonKey, IonRequest } from '@decentralized-identity/ion-sdk';
import IonProofOfWork from 'ion-pow-sdk';

import { Settings } from '../helpers/settings';

export const PageDid = () => {
  const [open, setOpen] = React.useState(false);
  const [userId, setUserId] = React.useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.id) {
      case 'user-id':
        setUserId(() => e.target.value)
        break;
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  React.useEffect(() => {
    
  },[])

  const registerDid = async () => {
    const [recoveryKey, recoveryPrivateKey] = await IonKey.generateEs256kOperationKeyPair();
    const [updateKey, updatePrivateKey] = await IonKey.generateEs256kOperationKeyPair();
    const [signingKey, signingPrivateKey] = await IonKey.generateEs256kDidDocumentKeyPair({id: userId});
    const publicKeys = [signingKey];

    const document : IonDocumentModel = {
      publicKeys
    };
    const input = { recoveryKey, updateKey, document };
    const createRequest = IonRequest.createCreateRequest(input);
    const longFormDid = IonDid.createLongFormDid(input);
    const shortFormDid = longFormDid.substring(0, longFormDid.lastIndexOf(':'));
    const didSuffix = shortFormDid.substring(shortFormDid.lastIndexOf(':') + 1);

    console.log(createRequest);

    const settings = new Settings();
    await settings.load();
    const res = await IonProofOfWork.submitIonRequest(
      settings.ionNodeUrl + 'proof-of-work-challenge',
      settings.ionNodeUrl + 'operations',
      JSON.stringify(createRequest)
    );
    console.log(res);
  };

  return (
    <>
      <Typography variant='h5'>
        DID
      </Typography>
      <Container maxWidth='sm' sx={{marginTop: '16px'}}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            任意のIDを入力してください。(※これはDIDではありません。)
          </Grid>
          <Grid item xs={12}>
            <TextField id='user-id' fullWidth label='User ID' variant='outlined' value={userId} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant='contained' startIcon={<IconSave />} onClick={registerDid}>登録</Button>
          </Grid>
        </Grid>
      </Container>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          設定を保存しました。
        </Alert>
      </Snackbar>
    </>
  );
}