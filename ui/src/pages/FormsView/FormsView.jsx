import { useState } from 'react'

// COMPONENTS
import AppBar from 'components/AppBar/AppBar'
import Header from './Header/Header'
import InputComponent from './InputComponent/InputComponent'
import ItemGrid from './ItemGrid/ItemGrid'
import LoadingPaper from 'components/LoadingPaper/LoadingPaper'

// CONSTANTS
import { dummyData } from './formsViewConstants'

// MUIS
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'

// STYLES
import useStyles from './formsViewUseStyles'

const FormsView = () => {
  // STYLES
  const classes = useStyles()

  // CONTENT
  const [ isDataGridLoading, setIsDataGridLoading ] = useState(false)

  return (
    <>
      <AppBar
        hasFab={false}
        hasBack={true}
        backLink='/forms'
        pageTitle='Form View'
        hasSearch={false}
      />

      {/* CONTENTS */}
      <Stack
        direction='row'
        position='relative'
        flex='1'
        height='100%'
        className={classes.contents}
      >
        {/* MAIN CONTENT */}
        <LoadingPaper isLoading={isDataGridLoading}>
          {/* HEADER */}
          <Header title='Valid Form'/>

          <Divider />

          {/* CONTENT FORM */}
          <Grid container spacing={0} className={classes.contentForms}>
            {dummyData.value.fields.map((item, index) => (
              <ItemGrid
                label={item.label}
                description={item.description}
                key={index}
                isSeparator={item.type === 'separator'}
              >
                <InputComponent
                  type={item.type}
                />
              </ItemGrid>
            ))}
            {/* ITEM */}
          </Grid>
        </LoadingPaper>
      </Stack>
    </>
  )
}

export default FormsView