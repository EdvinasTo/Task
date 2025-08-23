import ReusableTable from './table';
import type { Package } from '../types/package';
import FINAL_STATUSES from '../constants/finalStatuses';
import { columns } from '../constants/packageListColumns'
import CustomButton from './button';
import StatusChangeDialog from './statusChangeDialog';
import { useState } from 'react';

interface PackageListTableProps {
    rows: Package[];
}

function canChangeStatus(status: string): boolean {
    return !FINAL_STATUSES.includes(status);
}

export default function PackageListTable({ rows }: PackageListTableProps) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

    const handleOpenDialog = (pkg: Package) => {
        setSelectedPackage(pkg);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setSelectedPackage(null);
    };

    const handleStatusChange = () => {
        handleCloseDialog();
    };

    return (
        <>
            <ReusableTable
                columns={columns}
                rows={rows}
                rowKey="id"
                emptyMessage="No packages found."
                actions={(row) => (
                    <CustomButton
                        onClick={() => handleOpenDialog(row)}
                        disabled={!canChangeStatus(row.status)}
                        label="Change Status"
                        color="inherit"
                    />
                )}
            />

            {selectedPackage && (
                <StatusChangeDialog
                    packageId={selectedPackage.id}
                    open={dialogOpen}
                    currentStatus={selectedPackage.status}
                    onClose={handleCloseDialog}
                    onStatusChange={handleStatusChange}
                />
            )}
        </>
    );
}