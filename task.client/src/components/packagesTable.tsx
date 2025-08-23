import ReusableTable from './table';
import type { Package } from '../types/package';
import FINAL_STATUSES from '../constants/finalStatuses';
import { columns } from '../constants/packageListColumns'
import CustomButton from './button';
import StatusChangeDialog from './statusChangeDialog';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { packagesApi } from '../api/packagesApi';
import type { Status } from '../types/status';
import { useSnackbar } from '../hooks/useSnackbar';

interface PackageListTableProps {
    rows: Package[];
}

function canChangeStatus(status: string): boolean {
    return !FINAL_STATUSES.includes(status);
}

export default function PackageListTable({ rows }: PackageListTableProps) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

    const queryClient = useQueryClient();
    const { showSnackbar } = useSnackbar();

    const updateStatusMutation = useMutation({
        mutationFn: ({ packageId, newStatus }: { packageId: number; newStatus: Status }) =>
            packagesApi.updatePackageStatus(packageId, newStatus),
        onSuccess: (data, { packageId, newStatus }) => {
            queryClient.invalidateQueries({ queryKey: ['packages'] });
            showSnackbar(`Package ${packageId} status updated to "${newStatus}" successfully!`, 'success');
        },
        onError: (error, { packageId }) => {
            showSnackbar(`Failed to update status for package ${packageId}. Please try again.`, 'error');
        },
    });

    const handleOpenDialog = (pkg: Package) => {
        setSelectedPackage(pkg);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setSelectedPackage(null);
    };

    const handleStatusChange = (newStatus: Status) => {
        if (!selectedPackage) return;

        updateStatusMutation.mutate(
            { packageId: selectedPackage.id, newStatus },
            {
                onSuccess: () => {
                    handleCloseDialog();
                },
                onError: (error) => {
                    console.error('Failed to update status:', error);
                }
            }
        );
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
                    loading={updateStatusMutation.isPending}
                />
            )}
        </>
    );
}