import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

interface ConfirmDialogProps {
    open: boolean;
    title: string;
    onConfirm: () => void;
    onCancel: () => void;
    loading?: boolean;
}

const ConfirmationDialog: React.FC<ConfirmDialogProps> = ({ open, title, onConfirm, onCancel, loading = false }) => {
    return (
        <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
            <DialogTitle>{title}</DialogTitle>
            <DialogActions>
                <Button onClick={onCancel} color="inherit" disabled={loading}>Cancel</Button>
                <Button onClick={onConfirm} color="primary" variant="contained" disabled={loading}>{loading ? 'Updating...' : 'Confirm'}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialog;
