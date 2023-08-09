import React, { useState, useEffect } from 'react'
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

const RecordTable: React.FC<Props> = ({records, onDeleteRecord}) => {
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

  const handleConfirmDelete = () => {
    if (recordToDelete) {
      onDeleteRecord(recordToDelete.id);
    }
    setDeleteDialogOpen(false);
    setRecordToDelete(null);
  };

  return (
    <TableContainer component={Paper}>
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