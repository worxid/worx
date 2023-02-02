import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// COMPONENTS
import DialogConfirmation from 'components/DialogConfirmation/DialogConfirmation'
import Flyout from 'components/Flyout/Flyout'
import FlyoutContent from 'components/Flyout/FlyoutContent'
import FlyoutHeader from 'components/Flyout/FlyoutHeader'
import MainMenu from './MainMenu'
import Submissions from './Submissions'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'
import { PrivateLayoutContext } from 'contexts/PrivateLayoutContext'

// HOOKS
import useAxiosPrivate from 'hooks/useAxiosPrivate'

// MUIS
import IconButton from '@mui/material/IconButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// MUI ICONS
import IconDelete from '@mui/icons-material/Delete'
import IconEdit from '@mui/icons-material/Edit'
import IconGroups from '@mui/icons-material/Groups'
import IconShare from '@mui/icons-material/Share'
import IconMoreVert from '@mui/icons-material/MoreVert'

// SERVICES
import { deleteFormTemplate } from 'services/worx/formTemplate'

// STYLES
import useStyles from './formsFlyoutUseStyles'

// UTILS
import { getDefaultErrorMessage } from 'utilities/object'
import {
  didSuccessfullyCallTheApi, 
  wasAccessTokenExpired,
  wasRequestCanceled,
} from 'utilities/validation'

const FormsFlyout = (props) => {
  const { rows, reloadData, setGroupData } = props
  const classes = useStyles()
  const navigate = useNavigate()
  const axiosPrivate = useAxiosPrivate()

  // CONTEXTS
  const { setIsFlyoutOpen, setIsDialogFormOpen } = useContext(PrivateLayoutContext)
  const { setSnackbarObject } = useContext(AllPagesContext)

  // STATES
  const [anchorActionEl, setAnchorActionEl] = useState(null)
  const [dialogDeleteForm, setDialogDeleteForm] = useState({})

  // HANDLE ACTION MENU
  const handleActionMenuClick = (event) => {
    setAnchorActionEl(event.currentTarget)
  }
  const handleActionMenuClose = () => {
    setAnchorActionEl(null)
  }

  // HANDLE DELETE FORM
  const handleDeleteForm = async () => {
    setAnchorActionEl(null)
    setDialogDeleteForm({})
    const abortController = new AbortController()

    const response = await deleteFormTemplate(
      abortController.signal, 
      axiosPrivate,
      { ids: [rows[0].id] }, 
    )

    if (didSuccessfullyCallTheApi(response?.status)) {
      setSnackbarObject({
        open: true,
        severity:'success',
        title:'',
        message:'Form deleted successfully'
      })

      reloadData(abortController, true)
      setIsFlyoutOpen(false)
    } 
    else if (!wasRequestCanceled(response?.status) && !wasAccessTokenExpired(response.status)) {
      setSnackbarObject(getDefaultErrorMessage(response))
    }
  }

  useEffect(() => {
    if(rows[0]?.assigned_groups) {
      setGroupData(rows[0]?.assigned_groups)
    }
  }, [rows])

  return (
    <>
      <Flyout 
        position='right'
        onCloseButtonClick={() => setIsFlyoutOpen(false)}
      >
        {/* TITLE */}
        <FlyoutHeader>
          {/* TEXT */}
          <Typography 
            variant='h5' 
            className='fontWeight500'
            noWrap
          >
            {rows.length > 0 && rows[0].label}
          </Typography>

          <Stack direction='row' alignItems='center'>
            {/* BUTTON SHARE */}
            <IconButton
              onClick={() => setIsDialogFormOpen('dialogShareLink')}
            >
              <IconShare fontSize='small'/>
            </IconButton>

            {/* BUTTON GROUP */}
            <IconButton
              onClick={() => setIsDialogFormOpen('dialogChangeGroup')}
            >
              <IconGroups fontSize='small'/>
            </IconButton>

            {/* BUTTON ACTION */}
            <IconButton
              id='menu-action-button'
              aria-controls={Boolean(anchorActionEl) ? 'menu-action' : undefined}
              aria-haspopup='true'
              aria-expanded={Boolean(anchorActionEl) ? 'true' : undefined}
              onClick={handleActionMenuClick}
              className='no-zoom'
            >
              <IconMoreVert className='zoom' fontSize='small'/>
            </IconButton>

            {/* CUSTOMIZE ACTION MENU */}
            <Menu
              id='menu-action'
              anchorEl={anchorActionEl}
              open={Boolean(anchorActionEl)}
              onClose={handleActionMenuClose}
              MenuListProps={{
                'aria-labelledby': 'menu-action-button',
              }}
              className={`${classes.menuDownload} neutralize-zoom-menu`}
            >
              <MenuItem
                className={classes.actionMenuItem}
                onClick={() => navigate(`/forms/edit/${rows[0].id}`)}
              >
                <ListItemIcon>
                  <IconEdit fontSize='small' className={classes.iconActionItem}/>
                </ListItemIcon>
                <Typography variant='subtitle2'>
                  Edit Form
                </Typography>
              </MenuItem>

              <MenuItem
                className={classes.actionMenuItem}
                onClick={() => setDialogDeleteForm(true)}
              >
                <ListItemIcon>
                  <IconDelete fontSize='small' className={`${classes.iconActionItem} primary`}/>
                </ListItemIcon>
                <Typography variant='subtitle2' color='primary'>
                  Delete
                </Typography>
              </MenuItem>
            </Menu>
          </Stack>
        </FlyoutHeader>

        {/* CONTENT */}
        <FlyoutContent>
          <MainMenu rows={rows}/>
          <Submissions rows={rows}/>
        </FlyoutContent>
      </Flyout>

      {/* DELETE CONFIRMATION */}
      <DialogConfirmation
        title='Delete Form'
        caption='This action can’t be undone. Are you sure you want to delete this form?'
        dialogConfirmationObject={dialogDeleteForm}
        setDialogConfirmationObject={setDialogDeleteForm}
        cancelButtonText='Cancel'
        continueButtonText='Delete'
        onContinueButtonClick={() => handleDeleteForm()}
        onCancelButtonClick={() => setDialogDeleteForm({})}
      />
    </>
  )
}

export default FormsFlyout