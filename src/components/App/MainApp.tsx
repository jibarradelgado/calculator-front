import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Layout from '../Layout/Layout'
import OperationForm from '../OperationForm/OperationForm'
import RecordTable from '../RecordTable/RecordTable'

import { useCurrentUser } from '@store/AuthContext'
import { retrieveToken } from '@service/auth'
import { baseUrl } from '@service/config'

interface Record {
  record_id: number
  operationType: string
  dateTime: string
  balanceBefore: number
  balanceAfter: number
  operationResponse: string
}

export interface Pagination {
  page: number
  rowsPerPage: number
  orderBy: 'date_time' | 'operation_type'
  order: 'ASC' | 'DESC'
}

const MainApp = () => {
  const { user } = useCurrentUser()
  const [records, setRecords] = useState([] as Record[])
  const [recordCount, setRecordCount] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const initialPaginationState: Pagination =  {
    page: 0,
    rowsPerPage: 5,
    orderBy: 'date_time',
    order: 'DESC',
  }
  const [pagination, setPagination] = useState(initialPaginationState)

  const fetchRecords = async () => {
    const token = `Bearer ${await retrieveToken()}`
    const encodedOperationResponse = encodeURIComponent(searchQuery)
    axios.get(`${baseUrl}/calculator/api/v1/records?userId=${user?.id}&page=${pagination.page}&elements=${pagination.rowsPerPage}&sortBy=${pagination.orderBy}&sortDirection=${pagination.order}&operationResult=${encodedOperationResponse}`, {
      headers: {
        Authorization: token
      }
    })
      .then(res => { 
        setRecords(res.data.content as Record[])
        setRecordCount(res.data.totalElements)
      })
      .catch(err =>{
        console.log(err)
        setRecords([] as Record[])
      })
  }

  useEffect(() => {
    fetchRecords()
  },[user?.id, searchQuery, pagination.page, pagination.rowsPerPage, pagination.orderBy, pagination.order])

  return (
    <Layout title='Calculator Dashboard'>
      <OperationForm onUpdateRecords={fetchRecords}/>
      <RecordTable 
        records={records} 
        recordCount={recordCount} 
        onUpdateRecords={fetchRecords} 
        pagination={pagination} 
        setPagination={setPagination}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}  />
    </Layout>
  )
}

export default MainApp
