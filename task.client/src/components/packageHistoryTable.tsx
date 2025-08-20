import ReusableTable from './table';
import type { History } from '../types/packageHistory';
import { columns } from '../constants/packageHistoryColumns'

const mockPackages: History[] = [
    {
        status: "Created",
        date: "2025-08-10T14:32:00Z",
    },
    {
        status: "Sent",
        date: "2025-08-11T09:15:00Z",
    },
    {
        status: "Returned",
        date: "2025-08-12T08:45:00Z",
    },
    {
        status: "Sent",
        date: "2025-08-13T16:05:00Z",
    },
];

interface PackageListTableProps {
    rows: History[];
}

export default function PackageListTable({ rows }: PackageListTableProps) {
    return (
        <ReusableTable
            columns={columns}
            rows={mockPackages}
            rowKey="date"
            emptyMessage="No packages found."
            enablePagination={false}
        />
    );
}