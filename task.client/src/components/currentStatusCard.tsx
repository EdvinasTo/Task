import React, { useState } from 'react';
import './personalInfo/personalInfo.css';
import CustomButton from './button';
import { statusColors } from '../constants/statusColors';
import StatusChangeDialog from './statusChangeDialog';
import FINAL_STATUSES from '../constants/finalStatuses';
import type { Status } from '../types/status';
import { packagesApi } from '../api/packagesApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface StatusInfo {
    packageId: number;
    status: Status;
    date: string;
}

const CurrentStatusCard: React.FC<StatusInfo> = ({ status, date, packageId }) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const queryClient = useQueryClient();

    const updateStatusMutation = useMutation({
        mutationFn: ({ packageId, newStatus }: { packageId: number; newStatus: Status }) =>
            packagesApi.updatePackageStatus(packageId, newStatus),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [packageId] });
        },
    });

    const isFinalStatus = FINAL_STATUSES.includes(status);
    const isButtonDisabled = isFinalStatus;

    const handleOpenDialog = () => setDialogOpen(true);
    const handleCloseDialog = () => setDialogOpen(false);

    const handleStatusChange = (newStatus: Status) => {
        updateStatusMutation.mutate(
            { packageId, newStatus },
            {
                onSuccess: () => {
                    handleCloseDialog();
                }
            }
        );
    };

    return (
        <>
            <div className="container">
                <h2 className="header">Current Package Status</h2>
                <div className="card">
                    <div className="personal-info">
                        <div className="label">Status</div>
                        <div className="value" style={{
                            backgroundColor: statusColors[status] ?? '#ccc',
                            color: '#fff',
                            padding: '4px 10px',
                            borderRadius: '6px',
                            display: 'inline-block',
                            minWidth: '80px',
                            textAlign: 'center',
                            fontWeight: 500
                        }}>
                            {status}
                        </div>
                    </div>

                    <div className="personal-info">
                        <div className="label">Time Stamp</div>
                        <div className="value">{date}</div>
                    </div>

                    <div className="button-container">
                        <CustomButton
                            label="Change Status"
                            onClick={handleOpenDialog}
                            disabled={isButtonDisabled}
                        />
                    </div>
                </div>
            </div>

            <StatusChangeDialog
                packageId={packageId}
                open={dialogOpen}
                currentStatus={status}
                onClose={handleCloseDialog}
                onStatusChange={handleStatusChange}
                loading={updateStatusMutation.isPending}
            />
        </>
    );
};

export default CurrentStatusCard;
