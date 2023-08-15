import React, { useState, Dispatch, SetStateAction } from 'react'
import axios from 'axios'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  TablePagination,
} from '@mui/material'
import { useCurrentUser } from '@store/AuthContext'
import { retrieveToken } from '@service/auth'

import { baseUrl } from '@service/config'
import { Pagination } from '@components/App/MainApp'

interface Record {
  record_id: number
  operationType: string
  dateTime: string
  balanceBefore: number
  balanceAfter: number
  operationResponse: string
}

interface Props {
  records: Record[]
  recordCount: number
  onUpdateRecords: () => void
  pagination: Pagination
  setPagination: Dispatch<SetStateAction<Pagination>>
  searchQuery: string
  setSearchQuery: Dispatch<SetStateAction<string>>
}

const RecordTable: React.FC<Props> = ({
  onUpdateRecords,
  records,
  recordCount,
  pagination,
  setPagination,
  searchQuery,
  setSearchQuery, 
}) => {
  const [deleteDialogOpen, setDeleteDialogOpen ] = useState(false)
  const [recordToDelete, setRecordToDelete] = useState<Record | null>(null)

  const handleDeleteDialogOpen = (record: Record) => {
    setRecordToDelete(record);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setRecordToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (recordToDelete) {
      const token = `Bearer ${await retrieveToken()}`
      axios.patch(`${baseUrl}/calculator/api/v1/records/delete`, {
        recordId: recordToDelete.record_id
      }, {
        headers: {
          Authorization: token
        }
      })
      .then(() => {
        onUpdateRecords()
      })
      .catch(err => {
        console.log(err)
      })
    }
    setDeleteDialogOpen(false);
    setRecordToDelete(null);
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPagination((prevPagination) => ({...prevPagination, page: newPage}))
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      rowsPerPage: parseInt(event.target.value, 10), 
      page: 0}))
  }

  const handleSortRequest = (property: 'date_time' | 'operation_type' ) => {
    const isAsc = pagination.orderBy === property && pagination.order === 'ASC'
    setPagination((prevPagination) => ({
      ...prevPagination,
      orderBy: property,
      order: isAsc ? 'DESC' : 'ASC',
      page: 0, // Reset page when changing sort order or property
    }))
  }

  return (
    <>
      <TextField 
        sx={{ mt: 5 }}
        label="Search by Operation Response"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Button onClick={() => handleSortRequest('operation_type')}>Operation Type</Button>
              </TableCell>
              <TableCell>
                <Button onClick={() => handleSortRequest('date_time')}>Date</Button>
              </TableCell>
              <TableCell>Balance Before</TableCell>
              <TableCell>Balance After</TableCell>
              <TableCell>Operation Response</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((record) => {
              const date = new Date(record.dateTime)
              const formattedDate = date.toISOString().slice(0, 10)
              const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              const formattedDateTime = `${formattedDate} ${formattedTime}`

              return( 
                <TableRow key={record.record_id}>
                  <TableCell>{record.operationType}</TableCell>
                  <TableCell>{formattedDateTime}</TableCell>
                  <TableCell>{record.balanceBefore}</TableCell>
                  <TableCell>{record.balanceAfter}</TableCell>
                  <TableCell>{record.operationResponse}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleDeleteDialogOpen(record)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              )})}
          </TableBody>
        </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={recordCount}
          rowsPerPage={pagination.rowsPerPage}
          page={pagination.page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this record?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteDialogClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirmDelete} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
    </>
  )
}

export default RecordTable;