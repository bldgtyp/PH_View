// See: https://mui.com/x/react-data-grid/style/

import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 0,
  color:
    theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.85)',
  WebkitFontSmoothing: 'auto',
  letterSpacing: 'normal',
  '& .MuiDataGrid-columnsContainer': {
    backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#1d1d1d',
  },
  '& .MuiDataGrid-iconSeparator': {
    display: 'none',
  },
  '& .MuiDataGrid-columnHeader, .MuiDataGrid-columnHeaderTitle': {
    fontWeight: '600',
    borderBottom: `2px solid`,
  },
  '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
    borderRight: `1px solid ${
      theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
    }`,
  },
  '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
    borderBottom: `1px solid ${
      theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
    }`,
  },
  '& .MuiDataGrid-cell': {
    color:
      theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.65)',
  },
  '& .MuiPaginationItem-root': {
    borderRadius: 0,
  },
  '& .checkbox:not(:checked)': {
    boxShadow: 'inset 0 0 0.2em 0.1em red, 0 0 0.5em 0.1em red',
  },
  '& .checkbox-needed': {
    boxShadow: 'inset 0 0 0.2em 0.1em red, 0 0 0.5em 0.1em red',
  },
  '& .checkbox-question': {
    color: 'red',
    boxShadow: 'inset 0 0 0.05em 0.05em red, 0 0 0.5em 0.05em red',
    textAlign: 'center', // center the text
    lineHeight: '14px', // adjust this to vertically center the text
    fontSize: '10px', // set the size of the text
    fontWeight: 'bold', // make sure it's bold  

    '&::after': {
      content: '"?"', // add a "?" inside the checkbox
    },
  },
  '& .checkbox-na':  {
    position: 'relative',
    boxShadow: 'inset 0 0 0.2em 0.1em lightgrey',
  
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '0',
      width: '100%',
      height: '2px',
      backgroundColor: 'lightgrey',
      transform: 'rotate(-45deg)',
    },
  },
  '& .critical-info-icon': {
    color: 'red',
  },
  theme,
}));

export default StyledDataGrid;