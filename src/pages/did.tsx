import * as React from 'react';
import { Typography, Container, Grid, Snackbar, Alert} from '@mui/material';
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