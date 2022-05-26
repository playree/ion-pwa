import * as React from 'react';
import { Typography, Container, Grid, Button, TextField, Snackbar, Alert } from '@mui/material';
import { Save as IconSave } from '@mui/icons-material'

import { dexieDb, SettingsModel } from '../dexie'

export const PageSettings = () => {
  const [open, setOpen] = React.useState(false);
  const [ionNodeUrl, setIonNodeUrl] = React.useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.id) {
      case 'ion-node-url':
        setIonNodeUrl(() => e.target.value)
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

  const saveSettings = async () => {
    // 設定の保存
    let _ionNodeUrl = await dexieDb.settings.get(SettingsModel.KEYS.ION_NODE_URL);
    if (_ionNodeUrl) {
      _ionNodeUrl.value = ionNodeUrl;
      await dexieDb.settings.update(_ionNodeUrl.key, _ionNodeUrl)
    } else {
      _ionNodeUrl = new SettingsModel(SettingsModel.KEYS.ION_NODE_URL, ionNodeUrl);
      await dexieDb.settings.add(_ionNodeUrl)
    }
    
    handleOpen();
  };

  React.useEffect(() => {
    // 設定の読み込み
    dexieDb.settings.get(SettingsModel.KEYS.ION_NODE_URL).then((obj) => {
      if (obj) {
        setIonNodeUrl(obj.value);
      } else {
        setIonNodeUrl('https://beta.ion.msidentity.com/api/v1.0/');
      }
    })
  },[])

  return (
    <>
      <Typography variant='h5'>
        Settings
      </Typography>
      <Container maxWidth='sm' sx={{marginTop: '16px'}}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField id='ion-node-url' fullWidth label='ION Node URL' variant='outlined' value={ionNodeUrl} onChange={handleChange} />
          </Grid>
          <Grid item xs={8}>
            <Button fullWidth variant='contained' startIcon={<IconSave />} onClick={saveSettings}>保存</Button>
          </Grid>
          <Grid item xs={4}>
            <Button fullWidth variant='contained' color='error'>リセット</Button>
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