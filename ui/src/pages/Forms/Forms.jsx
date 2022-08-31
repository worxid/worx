import { useState } from 'react'

// COMPONENTS
import AppBar from 'components/AppBar/AppBar'

const Forms = () => {
  const [ pageSearch, setPageSearch ] = useState('')

  return (
    <>
      <AppBar
        hasFab={true}
        pageTitle='Forms'
        hasSearch={true}
        search={pageSearch}
        setSearch={setPageSearch}
      />
    </>
  )
}

export default Forms