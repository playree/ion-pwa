import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { Typography, Container, TextField, Accordion, AccordionSummary, AccordionDetails} from '@mui/material';
import { 
  ExpandMore as IconExpandMore
} from '@mui/icons-material'
import { useDidContext } from '../layout/sideMenuLayout';
import { VcModel, VcTool } from '../helpers/didTools';

export const PageVc = () => {
  const didContext = useDidContext();
  const [vcList, setVcList] = React.useState([] as VcModel[]);

  React.useEffect(() => {
    if (!vcList.length) {
      setup();
    };
    return () => {
      
    };
  });

  const setup = async () => {
    const vcList = await VcTool.all();
    setVcList(vcList);
  };

  if (!didContext.didModel) {
    return (<Navigate to="/" replace />);
  };

  const items = [];
  for (var cnt = 0; cnt < vcList.length; cnt++) {
    items.push(
      <Accordion key={'ac_' + cnt}>
        <AccordionSummary expandIcon={<IconExpandMore />}>
          <Typography>VC {cnt}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            label='vc'
            fullWidth
            multiline
            maxRows={8}
            value={JSON.stringify(vcList[cnt].vc.payload, null, 2)}
            InputProps={{
              readOnly: true,
              sx: {fontSize: '12px'}
            }}
          />
        </AccordionDetails>
      </Accordion>
    );
  }

  return (
    <>
      <Container maxWidth='sm' sx={{paddingX: '8px'}}>
        <Typography variant='h5' sx={{marginBottom: '16px'}}>
          VC一覧
        </Typography>
        { items }
        
      </Container>
    </>
  );
}