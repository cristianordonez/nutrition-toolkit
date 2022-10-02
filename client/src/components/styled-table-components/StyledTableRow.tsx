import { TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
   '&:nth-of-type(even)': {
      backgroundColor: theme.palette.background,
   },
   '&:last-child td, &:last-child th': {
      border: 0,
   },
}));
