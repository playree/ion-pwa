import * as React from 'react';
import { Typography, Container, Grid, Button, Snackbar, Alert} from '@mui/material';
import { Create as IconCreate } from '@mui/icons-material'

import { Settings } from '../helpers/settings';
import { DidTool, PrivateKeyTool } from '../helpers/didTools';
import { useNowLoadingContext, useSettingsContext, useDidContext } from '../layout/sideMenuLayout';

export const PageTop = () => {
  const nowLoadingContext = useNowLoadingContext();
  const settingsContext = useSettingsContext();
  const didContext = useDidContext();

  const [openDidCreated, setOpenDidCreated] = React.useState(false);

  const handleCloseDidCreated = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenDidCreated(false);
  };

  /**
   * 各種読み込み
   */
  const setup = async () => {
    nowLoadingContext.setNowLoading(true);

    // 設定の読み込み
    settingsContext.setSettings(await Settings.load());

    // DIDの読み込み
    const didModel = await DidTool.load();
    if (didModel) {
      didContext.setDidModel(didModel);
    }

    setTimeout(() => {
      nowLoadingContext.setNowLoading(false);
    }, 500);
  };

  React.useEffect(() => {
    if (!settingsContext.settings) {
      setup();
    };
  });

  const registerDid = async () => {
    if (!settingsContext.settings) {
      return
    }
    nowLoadingContext.setNowLoading(true);
    
    // DID発行
    const didInfo = await DidTool.create(settingsContext.settings.ionNodeUrl);
    
    if (didInfo) {
      // 発行した各種情報を保存
      await PrivateKeyTool.save(didInfo.didModel.signingKeyId, didInfo.signingPrivateKey);
      await PrivateKeyTool.save(PrivateKeyTool.RESERVE_ID.RECOVERY, didInfo.recoveryPrivateKey);
      await PrivateKeyTool.save(PrivateKeyTool.RESERVE_ID.UPDATE, didInfo.updatePrivateKey);
      await DidTool.save(didInfo.didModel);

      // コンテキストにも反映
      didContext.setDidModel(didInfo.didModel);
    }

    setTimeout(() => {
      nowLoadingContext.setNowLoading(false);
      setOpenDidCreated(true);
    }, 500);
  };

  if (!didContext.didModel) {
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
        <Snackbar open={openDidCreated} autoHideDuration={6000} onClose={handleCloseDidCreated}>
          <Alert onClose={handleCloseDidCreated} severity="success" sx={{ width: '100%' }}>
            DIDを発行しました。
          </Alert>
        </Snackbar>
      </>
    );
  }
  return (
    <>
      <Typography variant='h5'>
        DID
      </Typography>
      <Container maxWidth='sm' sx={{marginTop: '16px'}}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            DID : {didContext.didModel.didSuffix}
          </Grid>
        </Grid>
      </Container>
      <Snackbar open={openDidCreated} autoHideDuration={6000} onClose={handleCloseDidCreated}>
        <Alert onClose={handleCloseDidCreated} severity="success" sx={{ width: '100%' }}>
          DIDを発行しました。
        </Alert>
      </Snackbar>
    </>
  );
}