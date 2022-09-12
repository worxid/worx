import { useState, useContext, useEffect } from 'react'

// COMPONENTS
import DialogForm from 'components/DialogForm/DialogForm'

// CONTEXTS
import { PrivateLayoutContext } from 'contexts/PrivateLayoutContext'

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

// STYLES
import useLayoutStyles from './dialogChangeGroupUseStyles'

const DialogChangeGroup = (props) => {
  const layoutClasses = useLayoutStyles()

  const { data } = props

  const { setIsDialogFormOpen } = useContext(PrivateLayoutContext)

  const [ search, setSearch ] = useState('')
  const groupList = ['Default', 'Medical', 'Group 1', 'Group 2', 'Group 3', 'Group 4', 'Group 5', 'Group 6', 'Group 7', 'Group 8']
  const [groupLists, setGroupLists] = useState(groupList)

  const handleActionButtonClick = async (inputType) => {
    if (inputType === 'save') {
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

  useEffect(() => {
    if(search){
      setGroupLists(groupList.filter((groups) => groups.includes(search.toLowerCase())))
    } 
    else{
      setGroupLists(groupList)
    } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

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
        {groupLists?.map((item, index) => (
          <ListItemButton 
            key={index}
            className={layoutClasses.groupItem}
            dense
          >
            {/* RADIO */}
            <ListItemIcon>
              <Checkbox
                checked={data?.includes(item)}
              />
            </ListItemIcon>
            {/* TEXT */}
            <ListItemText primary={item}/>
          </ListItemButton>
        ))}
      </List>
    </DialogForm>
  )
}

export default DialogChangeGroup