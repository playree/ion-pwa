import * as React from 'react';
import { Typography, Container, Grid, Button, Snackbar, Alert, 
  Card, CardContent, CardActions, TextField, Chip, 
  Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText} from '@mui/material';
import { 
  Create as IconCreate
} from '@mui/icons-material'

import { Settings } from '../helpers/settings';
import { DidTool, PrivateKeyTool } from '../helpers/didTools';
import { useNowLoadingContext, useSettingsContext, useDidContext } from '../layout/sideMenuLayout';
import { fontSize } from '@mui/system';

export const PageTop = () => {
  const nowLoadingContext = useNowLoadingContext();
  const settingsContext = useSettingsContext();
  const didContext = useDidContext();

  const [openDidCreated, setOpenDidCreated] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [textDialog, setTextDialog] = React.useState({title:'', text:''});

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
    const didInfo = await DidTool.create(settingsContext.settings.urlOperation);
    
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

  const resolveDid = async () => {
    if (!settingsContext.settings) {
      return
    }
    if (!didContext.didModel) {
      return
    }
    nowLoadingContext.setNowLoading(true);

    const resolveDid = await DidTool.resolve(settingsContext.settings.urlResolve, didContext.didModel.did);
    console.log(resolveDid);

    setTimeout(() => {
      setTextDialog({
        title: 'DID検証レスポンス',
        text: JSON.stringify(resolveDid, null, 2)
      });
      setOpenDialog(true);
      nowLoadingContext.setNowLoading(false);
    }, 500);
  };

  const test = async () => {
    setTextDialog({
      title: 'DID検証レスポンス',
      text: '1abcdefg\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12'
    });
    setOpenDialog(true);
  };

  const closeDialog = async () => {
    setOpenDialog(false);
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

  const published = didContext.didModel.published ? <Chip label='公開済' color='success' /> : <Chip label='未公開' color='warning' />;
  return (
    <>
      <Container maxWidth='sm' sx={{paddingX: '8px'}}>
        <Typography variant='h5' sx={{marginBottom: '16px'}}>
          DID
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <TextField
                  label='DID'
                  fullWidth
                  multiline
                  value={didContext.didModel.did}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <Container fixed sx={{marginTop: '8px', textAlign: 'right'}} >
                  {published}
                </Container>
              </CardContent>
              <CardActions>
                <Button onClick={resolveDid}>DIDを検証する</Button>
                <Button onClick={test}>test</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Snackbar open={openDidCreated} autoHideDuration={6000} onClose={handleCloseDidCreated}>
        <Alert onClose={handleCloseDidCreated} severity="success" sx={{ width: '100%' }}>
          DIDを発行しました。
        </Alert>
      </Snackbar>
      <Dialog
        fullWidth={true}
        maxWidth='sm'
        open={openDialog}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {textDialog.title}
        </DialogTitle>
        <DialogContent>
          <TextField
            label='DID'
            fullWidth
            multiline
            maxRows={16}
            value={textDialog.text}
            InputProps={{
              readOnly: true,
              sx: {fontSize: '11px'}
            }}
            sx={{ marginTop: '8px' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}