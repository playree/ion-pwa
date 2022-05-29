import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { Typography, Container, Grid, TextField} from '@mui/material';
import { useDidContext } from '../layout/sideMenuLayout';

export const PageDid = () => {
  const didContext = useDidContext();

  if (!didContext.didModel) {
    return (<Navigate to="/" replace />);
  }

  return (
    <>
      <Container maxWidth='sm' sx={{paddingX: '8px'}}>
        <Typography variant='h5' sx={{marginBottom: '16px'}}>
          DID詳細
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label='DID(Long)'
              fullWidth
              multiline
              value={didContext.didModel.didLong}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}