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
  // Make custom checkboxes that will work in Firefox as well as Chrome.
  // regular checkboxes don't work in Firefox.
  '& .checkbox-checked': {
    display: "inline-block",
    width:" 1.25em",
    height: "1.25em",
    marginRight: "0.5em",
    border: "1px solid grey",
    verticalAlign: "text-bottom",
    borderRadius: "3px",
    background: "green",
    '&::after': {
      position: 'relative',
      top: '-10%',
      content: '"\u2714"', // Heavy Check Mark
      color: "white",
    },
  },
  '& .checkbox-na': {
    position: 'relative',
    display: "inline-block",
    width:" 1.25em",
    height: "1.25em",
    marginRight: "0.5em",
    border: "1px solid lightgrey",
    verticalAlign: "text-bottom",
    boxShadow: 'inset 0 0 0.2em 0.1em lightgrey',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '0',
      width: '100%',
      height: '1px',
      backgroundColor: 'lightgrey',
      transform: 'rotate(-45deg)',
    },
  },
  '& .checkbox-needed': {
    display: "inline-block",
    width:" 1.25em",
    height: "1.25em",
    marginRight: "0.5em",
    border: "1px solid red",
    borderRadius: "3px",
    verticalAlign: "text-bottom",
    boxShadow: "inset 0 0 0.1em 0.05em red, 0 0 0.4em 0.01em red",
  },
  '& .checkbox-question': {
    position: 'relative',
    display: "inline-block",
    width:" 1.25em",
    height: "1.25em",
    marginRight: "0.5em",
    border: "0.5px solid red",
    borderRadius: "3px",
    verticalAlign: "text-bottom",
    boxShadow: "inset 0 0 0.05em 0.02em red, 0 0 0.4em 0.01em red",
    backgroundColor: "red",
    '&::after': {
      content: '"?"',
      color: "white",
      position: 'relative',
      top: '-20%',
      fontWeight: "bold",
    },
  },
  '& .critical-info-icon': {
    color: 'red',
  },
  '& .notes-icon': {
    color: 'red',
  },
  theme,
}));

export default StyledDataGrid;