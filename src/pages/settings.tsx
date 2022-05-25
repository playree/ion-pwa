import { Typography, Container, TextField } from '@mui/material';

export const PageSettings = () => {
  return (
    <>
      <Typography variant='h5'>
        Settings
      </Typography>
      <Container maxWidth="sm"></Container>
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
    </>
  );
}