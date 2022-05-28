import * as React from 'react';
import { Typography, Container, Grid, Button, TextField, Snackbar, Alert} from '@mui/material';
import { Create as IconCreate } from '@mui/icons-material'
import { IonDid, IonDocumentModel, IonKey, IonRequest } from '@decentralized-identity/ion-sdk';
import IonProofOfWork from 'ion-pow-sdk';

import { Settings } from '../helpers/settings';
import { DidTool } from '../helpers/didTools';
import { useNowLoadingContext } from '../layout/sideMenuLayout';

export const PageDid = () => {
  const [open, setOpen] = React.useState(false);

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

  const nowLoading = useNowLoadingContext();

  const registerDid = async () => {
    nowLoading.setNowLoading(true);
    
    await DidTool.create();

    setTimeout(() => {
      nowLoading.setNowLoading(false);
    }, 500);
    // const [recoveryKey, recoveryPrivateKey] = await IonKey.generateEs256kOperationKeyPair();
    // const [updateKey, updatePrivateKey] = await IonKey.generateEs256kOperationKeyPair();
    // const [signingKey, signingPrivateKey] = await IonKey.generateEs256kDidDocumentKeyPair({id: 'signing-key'});
    // const publicKeys = [signingKey];

    // const document : IonDocumentModel = {
    //   publicKeys
    // };
    // const input = { recoveryKey, updateKey, document };
    // const createRequest = IonRequest.createCreateRequest(input);
    // const longFormDid = IonDid.createLongFormDid(input);
    // const shortFormDid = longFormDid.substring(0, longFormDid.lastIndexOf(':'));
    // const didSuffix = shortFormDid.substring(shortFormDid.lastIndexOf(':') + 1);

    // console.log(createRequest);

    // const settings = new Settings();
    // await settings.load();
    // const resText = await IonProofOfWork.submitIonRequest(
    //   settings.ionNodeUrl + 'proof-of-work-challenge',
    //   settings.ionNodeUrl + 'operations',
    //   JSON.stringify(createRequest)
    // );
    // const resObj = resText ? JSON.parse(resText) : null;
    // console.log(resObj);
  };

  return (
    <>
      <Typography variant='h5'>
        DID
      </Typography>
      <Container maxWidth='sm' sx={{marginTop: '16px'}}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            DIDが発行されていません。
          </Grid>
          <Grid container item xs={12} justifyContent='center'>
            <Button variant='contained' size='large' startIcon={<IconCreate />} onClick={registerDid}>DID発行</Button>
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