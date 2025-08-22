import React, { useState } from 'react';
import './personalInfo/personalInfo.css'
import type { Status } from '../types/status';
import CustomButton from './button';
import { statusColors } from '../constants/statusColors';
import StatusChangeDialog from './dialog';
import FINAL_STATUSES from '../constants/finalStatuses';

interface StatusInfo {
    status: Status;
    date: string;
    onStatusChange?: (newStatus: Status) => void;
}

const CurrentStatusCard: React.FC<StatusInfo> = ({ status, date, onStatusChange }: StatusInfo) => {
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleOpenDialog = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const handleStatusChange = (newStatus: Status) => {
        if (onStatusChange) {
            onStatusChange(newStatus);
        }
    };

    const isFinalStatus = FINAL_STATUSES.includes(status);
    //for now there's no handler so i've commented it out
    const isButtonDisabled = isFinalStatus;// || !onStatusChange;

    return (
        <>
            <div className='container'>
                <h2 className='header'>Current Package Status</h2>
                <div className='card'>
                    <div className='personal-info'>
                        <div className='label'>Status</div>
                        <div className='value'>
                            <div
                                style={{
                                    backgroundColor: statusColors[status] ?? '#ccc',
                                    color: '#fff',
                                    padding: '4px 10px',
                                    borderRadius: '6px',
                                    display: 'inline-block',
                                    minWidth: '80px',
                                    textAlign: 'center',
                                    fontWeight: 500
                                }}
                            >
                                {status}
                            </div>
                        </div>
                    </div>

                    <div className='personal-info'>
                        <div className='label'>Time Stamp</div>
                        <div className='value'>{date}</div>
                    </div>

                    <div className="button-container">
                        <CustomButton
                            label={'Change Status'}
                            onClick={handleOpenDialog}
                            disabled={isButtonDisabled}
                        />
                    </div>
                </div>
            </div>

            <StatusChangeDialog
                open={dialogOpen}
                currentStatus={status}
                onClose={handleCloseDialog}
                onStatusChange={handleStatusChange}
            />
        </>
    );
};

export default CurrentStatusCard;