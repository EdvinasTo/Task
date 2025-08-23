import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import type { Status } from '../types/status';
import statusTransitions from '../constants/statusTransitions';
import { statusColors } from '../constants/statusColors';
import ConfirmationDialog from './confirmationDialog';
import { packagesApi } from '../api/packagesApi';

interface StatusChangeDialogProps {
    open: boolean;
    currentStatus: Status;
    packageId?: number;
    onClose: () => void;
    onStatusChange: (newStatus: Status) => void;
}

const StatusChangeDialog: React.FC<StatusChangeDialogProps> = ({
    open,
    currentStatus,
    onClose,
    onStatusChange,
    packageId
}) => {
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);

    const availableTransitions = statusTransitions[currentStatus] || [];

    const handleStatusSelect = (newStatus: Status) => {
        setSelectedStatus(newStatus);
        setConfirmOpen(true);
    };

    const handleConfirmChange = async () => {
        if (!packageId || !selectedStatus) return;

        try {
            const updatedPackage = await packagesApi.updatePackageStatus(packageId, selectedStatus);
            onStatusChange(selectedStatus);
        } finally {
            setConfirmOpen(false);
            onClose();
        }
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
                <DialogTitle>
                    {packageId ? `Change Package Nr. ${packageId} Status` : 'Change Package Status'}
                </DialogTitle>

                <DialogContent>
                    <Box sx={{ mb: 2 }}>
                        <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '8px' }}>
                            Current Status:
                        </div>
                        <Chip
                            label={currentStatus}
                            sx={{
                                backgroundColor: statusColors[currentStatus],
                                color: 'white',
                                fontWeight: 'bold'
                            }}
                        />
                    </Box>

                    <Box>
                        <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '12px' }}>
                            Available transitions:
                        </div>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {availableTransitions.map((status) => (
                                <Chip
                                    key={status}
                                    label={status}
                                    clickable
                                    onClick={() => handleStatusSelect(status as Status)}
                                    sx={{
                                        backgroundColor: statusColors[status as Status],
                                        color: 'white',
                                        fontWeight: 'bold',
                                        '&:hover': {
                                            backgroundColor: statusColors[status as Status],
                                            opacity: 0.9
                                        }
                                    }}
                                />
                            ))}
                        </Box>
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

            <ConfirmationDialog
                open={confirmOpen}
                title={`Change status to "${selectedStatus}"?`}
                onConfirm={handleConfirmChange}
                onCancel={() => setConfirmOpen(false)}
            />
        </>
    );
};

export default StatusChangeDialog;
