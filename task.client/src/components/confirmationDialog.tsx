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
}

const ConfirmationDialog: React.FC<ConfirmDialogProps> = ({ open, title, onConfirm, onCancel }) => {
    return (
        <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
            <DialogTitle>{title}</DialogTitle>
            <DialogActions>
                <Button onClick={onCancel} color="inherit">Cancel</Button>
                <Button onClick={onConfirm} color="primary" variant="contained">Confirm</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialog;
