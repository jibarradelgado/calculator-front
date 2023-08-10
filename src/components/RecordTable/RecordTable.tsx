import React, { useState, useEffect } from 'react'
import axios from 'axios';
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
import { useCurrentUser } from '@store/AuthContext';
import { retrieveToken } from '@service/auth';

import { baseUrl, TOKEN_KEY } from '@service/config';

interface Record {
  record_id: number
  operationType: string
  dateTime: string
  balanceBefore: number
  balanceAfter: number
  operationResponse: string
}

interface Page {
  count: number
  Records: Record[]
}

interface Props {
  records: Record[]
  onDeleteRecord: (recordId: number) => void
}

const RecordTable: React.FC<Props> = () => {
  const { user } = useCurrentUser()
  const [records, setRecords] = useState([] as Record[])
  const [count, setCount] = useState(0)
  const [deleteDialogOpen, setDeleteDialogOpen ] = useState(false)
  const [recordToDelete, setRecordToDelete] = useState<Record | null>(null)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState<string>('date_time'); // Default sorting by dateTime
  const [order, setOrder] = useState<'ASC' | 'DESC'>('DESC'); // Default sorting order
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const getRecords = async () => {
      const token = `Bearer ${await retrieveToken()}`
      const encodedOperationResponse = encodeURIComponent(searchQuery)
      console.log(`${baseUrl}/calculator/api/v1/records?userId=${user?.id}&page=${page}&elements=${rowsPerPage}&sortBy=${orderBy}&sortDirection=${order}&operationResult=${encodedOperationResponse}`)
      axios.get(`${baseUrl}/calculator/api/v1/records?userId=${user?.id}&page=${page}&elements=${rowsPerPage}&sortBy=${orderBy}&sortDirection=${order}&operationResult=${encodedOperationResponse}`, {
        headers: {
          Authorization: token
        }
      })
        .then(res => { 
          console.log(res.data)
          console.log(res.data.content)
          setRecords(res.data.content as Record[])
          setCount(res.data.totalElements)
        })
        .catch(err =>{
          console.log(err)
          setRecords([] as Record[])
        })
    }

    getRecords()
  }, [user?.id, page, rowsPerPage, orderBy, order, searchQuery])

  const handleDeleteDialogOpen = (record: Record) => {
    setRecordToDelete(record);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setRecordToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (recordToDelete) {
      // onDeleteRecord(recordToDelete.id);
    }
    setDeleteDialogOpen(false);
    setRecordToDelete(null);
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSortRequest = (property: string) => {
    const isAsc = orderBy === property && order === 'ASC';
    setOrder(isAsc ? 'DESC' : 'ASC');
    setOrderBy(property);
  };

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
            {records.map((record) => (
              <TableRow key={record.record_id}>
                <TableCell>{record.operationType}</TableCell>
                <TableCell>{record.dateTime}</TableCell>
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
            ))}
          </TableBody>
        </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
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