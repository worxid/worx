import { useState, useEffect } from 'react'

// COMPONENTS
import AppBar from 'components/AppBar/AppBar'
import Header from './Header'
import InputComponent from './InputComponent'
import ItemGrid from './ItemGrid'
import LoadingPaper from 'components/LoadingPaper/LoadingPaper'

// CONSTANTS
import { dummyData } from './formsSubmissionsDetailConstants'

// MUIS
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'

// STYLES
import useStyles from './formsSubmissionsDetailUseStyles'

const FormsSubmissionsDetail = () => {
  // STYLES
  const classes = useStyles()

  // CONTENT
  const [ isFormLoading, setIsFormLoading ] = useState(false)

  // HANDLE GET SUBMISSION DETAIL
  const getSubmissionDetail = async () => {

  }

  useEffect(() => {
    getSubmissionDetail()
  }, [])

  return (
    <>
      <AppBar
        hasFab={false}
        hasBack={true}
        backLink='/forms'
        pageTitle='Form View'
        hasSearch={false}
      />

      {/* MAIN CONTENT */}
      <LoadingPaper isLoading={isFormLoading} className='overflowYauto'>
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
    </>
  )
}

export default FormsSubmissionsDetail