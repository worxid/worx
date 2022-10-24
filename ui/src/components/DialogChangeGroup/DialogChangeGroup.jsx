import { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'

// COMPONENTS
import DialogForm from 'components/DialogForm/DialogForm'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'
import { PrivateLayoutContext } from 'contexts/PrivateLayoutContext'

// HOOKS
import useAxiosPrivate from 'hooks/useAxiosPrivate'

// MUIS
import Input from '@mui/material/Input'
import Stack from '@mui/material/Stack'
import Checkbox from '@mui/material/Checkbox'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

// MUI ICONS
import IconClear from '@mui/icons-material/Clear'
import IconSearch from '@mui/icons-material/Search'

// SERVICES
import { getGroupList } from 'services/group'
import { putAssignGroupDevices } from 'services/devices'
import { putAssignGroupFormTemplate } from 'services/formTemplate'

// STYLES
import useLayoutStyles from './dialogChangeGroupUseStyles'

// UTILITIES
import { didSuccessfullyCallTheApi } from 'utilities/validation'

const DialogChangeGroup = (props) => {
  const { dataChecked, page, selectedItemId, reloadData } = props

  const layoutClasses = useLayoutStyles()

  // CONTEXTS
  const { setIsDialogFormOpen } = useContext(PrivateLayoutContext)
  const { setSnackbarObject } = useContext(AllPagesContext)

  const axiosPrivate = useAxiosPrivate()

  // STATES
  const [ search, setSearch ] = useState('')
  const [ groupList, setGroupList ] = useState([])
  const [ groupChecked, setGroupChecked ] = useState([])

  const handleActionButtonClick = async (inputType) => {
    const abortController = new AbortController()

    if (inputType === 'save') {
      const listSelectedGroupId = groupChecked.map(item => item.id)
      let response
      let message = {}
      
      if(page === 'form-template') {
        response = await putAssignGroupFormTemplate(
          selectedItemId,
          abortController.signal,
          {
            assignedGroups: listSelectedGroupId
          },
          axiosPrivate,
        )
      } else if (page === 'devices') {
        response = await putAssignGroupDevices(
          selectedItemId,
          abortController.signal,
          {
            group_ids: listSelectedGroupId
          },
          axiosPrivate,
        )
      }

      if(didSuccessfullyCallTheApi(response?.status)) {
        message = {
          severity:'success',
          title:'',
          message:'Change group success'
        }
        reloadData(abortController, true)
      } else {
        message = {
          severity: 'error',
          title: response?.data?.error?.status?.replaceAll('_', ' ') || '',
          message: response?.data?.error?.message || 'Something gone wrong',
        }
      }

      setSnackbarObject({
        open: true,
        ...message,
      })
    } else {
      setGroupChecked(dataChecked)
    }

    handleClose()
  }
  
  const handleClose = () => {
    setSearch('')
    setIsDialogFormOpen(false)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    const valueSearch = e.target.value
    setSearch(valueSearch)
  }

  const handleCheckboxClick = (event, itemGroup) => {
    const hasChecked = groupChecked.find(item => item.name === itemGroup.name)
    if(!Boolean(hasChecked)) {
      // CHECKED
      setGroupChecked([ ...groupChecked, itemGroup ])
    } else {
      // UNCHECKED
      const tempGroupChecked = groupChecked.filter(item => item.name !== itemGroup.name)
      setGroupChecked(tempGroupChecked)
    }
  }

  const loadGroupListData = async (inputIsMounted, inputAbortController) => {
    const resultGroupList = await getGroupList(
      inputAbortController.signal, 
      axiosPrivate,
    )

    if (didSuccessfullyCallTheApi(resultGroupList.status) && inputIsMounted) {
      setGroupList(resultGroupList.data.list)
    }
  }

  // SIDE EFFECT FETCHING
  useEffect(() => {
    let isMounted = true
    const abortController = new AbortController()
    loadGroupListData(isMounted, abortController)

    return () => {
      isMounted = false
      abortController.abort()
    }
  }, [])

  // SIDE EFFECT SET GROUP CHECKED
  useEffect(() => {
    if(dataChecked?.length) {
      page === 'form-template' && setGroupChecked(dataChecked)
      page === 'devices' && setGroupChecked(dataChecked.map(item => {
        const findItemGroup = groupList.find(itemGroup => itemGroup.name === item.name)
        return findItemGroup
      }))
    } else {
      setGroupChecked([])
    }
  }, [dataChecked, groupList])

  return (
    <DialogForm 
      title={'Select Group'} 
      handleActionButtonClick={handleActionButtonClick}
      classNames='dialogChangeGroup'
    >
      {/* CONTENT */}
      <Stack direction='row' className={layoutClasses.menuSearchBox}>
        {/* INPUT */}
        <Input
          value={search}
          onChange={handleSearch}
          className='width100'
          placeholder='Search'
          disableUnderline
        />

        {/* ICON */}
        {search === '' 
          ? <IconSearch className={'cursorPointer'} /> 
          : <IconClear
            className={'cursorPointer'}
            onClick={() => setSearch('')}
          />
        }
      </Stack>
      <List disablePadding className='width100 padding0'>
        <ListItemButton className={layoutClasses.groupItem} dense>
          {/* RADIO */}
          <ListItemIcon>
            <Checkbox checked={groupChecked?.length <= 0}/>
          </ListItemIcon>
          {/* TEXT */}
          <ListItemText primary={'Default'}/>
        </ListItemButton>

        {groupList?.
          filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
          .map((item, index) => (
            <ListItemButton
              onClick={(event) => handleCheckboxClick(event, item)}
              key={index}
              className={layoutClasses.groupItem}
              dense
            >
              {/* RADIO */}
              <ListItemIcon>
                <Checkbox
                  checked={Boolean(groupChecked?.find(itemData => itemData.name === item.name))}
                />
              </ListItemIcon>
              {/* TEXT */}
              <ListItemText primary={item.name}/>
            </ListItemButton>
          ))}
      </List>
    </DialogForm>
  )
}

DialogChangeGroup.defaultProps = {
  dataChecked: [],
  page: 'form-template',
}

DialogChangeGroup.propTypes = {
  dataChecked: PropTypes.array,
  page: PropTypes.oneOf(['form-template', 'devices']).isRequired,
  selectedItemId: PropTypes.number,
  reloadData: PropTypes.func.isRequired,
}

export default DialogChangeGroup