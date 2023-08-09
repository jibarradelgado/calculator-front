import React, { useEffect, useState } from 'react'

import Layout from '../Layout/Layout'
import OperationForm from '../OperationForm/OperationForm'
import RecordTable from '../RecordTable/RecordTable'

const MainApp = () => {

  return (
    <Layout title='Calculator Dashboard'>
      <OperationForm />
      <RecordTable records={[]} onDeleteRecord={() => {}} />
    </Layout>
  )
}

export default MainApp
