// MUI STYELS
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    height: 70,
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: '0px 20px 0px 24px',
  },
  contentTitle: {
    color: theme.palette.text.primary,
    marginRight: 'auto',
  },
  iconButton: {
    marginLeft: 8,
  },
  columnsMenuRoot: {
    '& .MuiList-root': {
      padding: '12px 4px',
      width: 250,
    },
  },
  columnsMenuTitle: {
    fontWeight: 600,
    padding: '0px 18px 6px',
  },
  columnsMenuItem: {
    display: 'flex',
    padding: '0px 16px 0px 6px',
  },
  columnsMenuText: {
    color: theme.palette.text.secondary,
    fontWeight: 400,
  },
}))

export default useStyles