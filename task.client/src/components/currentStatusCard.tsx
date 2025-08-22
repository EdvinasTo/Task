import React from 'react';
import './personalInfo/personalInfo.css'
import type { Status } from '../types/status';
import CustomButton from './button';
import { statusColors } from '../constants/statusColors';

interface StatusInfo {
    status: Status;
    date: string;
}

const CurrentStatusCard: React.FC<StatusInfo> = ({ status, date }: StatusInfo) => {
    return (
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
                    <CustomButton label={'Change Status'} />
                </div>
            </div>
        </div>
    );
};

export default CurrentStatusCard;
