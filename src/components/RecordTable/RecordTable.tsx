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
} from '@mui/material'
import { useCurrentUser } from '@store/AuthContext';
import { retrieveToken } from '@service/auth';

import { baseUrl, TOKEN_KEY } from '@service/config';

interface Record {
  id: number;
  operationType: string;
  dateTime: string;
  balanceBefore: number;
  balanceAfter: number;
  operationResponse: string;
}

interface Props {
  records: Record[];
  onDeleteRecord: (recordId: number) => void;
}

const RecordTable: React.FC<Props> = () => {
  const { user } = useCurrentUser()
  const [records, setRecords ] = useState([] as Record[])
  const [deleteDialogOpen, setDeleteDialogOpen ] = useState(false)
  const [recordToDelete, setRecordToDelete] = useState<Record | null>(null)

  useEffect(() => {
    const getRecords = async () => {
      const token = `Bearer ${await retrieveToken()}`
      console.log(token)
      axios.get(`${baseUrl}/calculator/api/v1/records?userId=${user?.id}`, {
        headers: {
          Authorization: token
        }
      })
        .then(res => {
          console.log(res.data)
          setRecords(res.data as Record[])
        })
        .catch(err =>{
          console.log(err)
          setRecords([] as Record[])
        })
    }

    getRecords()
  }, [])

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

  return (
    <TableContainer component={Paper} sx={{ mt: 5 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Operation Type</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Balance Before</TableCell>
            <TableCell>Balance After</TableCell>
            <TableCell>Operation Response</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((record) => (
            <TableRow key={record.id}>
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
    </TableContainer>
  )
}

export default RecordTable;