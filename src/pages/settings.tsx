import * as React from 'react';
import { Typography, Container, Grid, Button, TextField, Snackbar, Alert } from '@mui/material';
import { Save as IconSave } from '@mui/icons-material'

export const PageSettings = () => {
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

  const saveSettings = () => {
    handleOpen();
  };

  return (
    <>
      <Typography variant='h5'>
        Settings
      </Typography>
      <Container maxWidth='sm' sx={{marginTop: '16px'}}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField id='ion-node-url' fullWidth label='ION Node URL' variant='outlined' />
          </Grid>
          <Grid item xs={8}>
            <Button fullWidth variant='contained' startIcon={<IconSave />} onClick={saveSettings}>保存</Button>
          </Grid>
          <Grid item xs={4}>
            <Button fullWidth variant='outlined'>リセット</Button>
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