import ReusableTable from './table';
import type { Package } from '../types/package';
import FINAL_STATUSES from '../constants/finalStatuses';
import { columns } from '../constants/packageListColumns'
import CustomButton from './button';

const mockPackages: Package[] = [
    {
        id: 1,
        status: "Created",
        sender: "Alice Smith",
        recipient: "Bob Johnson",
        createdAt: "2025-08-10T14:32:00Z",
    },
    {
        id: 2,
        status: "Sent",
        sender: "Charlie Brown",
        recipient: "Daisy Miller",
        createdAt: "2025-08-11T09:15:00Z",
    },
    {
        id: 3,
        status: "Accepted",
        sender: "Edward Green",
        recipient: "Fiona White",
        createdAt: "2025-08-12T08:45:00Z",
    },
    {
        id: 4,
        status: "Returned",
        sender: "George Black",
        recipient: "Helen Blue",
        createdAt: "2025-08-13T16:05:00Z",
    },
    {
        id: 5,
        status: "Canceled",
        sender: "Isaac Red",
        recipient: "Julia Yellow",
        createdAt: "2025-08-14T11:20:00Z",
    },
    {
        id: 6,
        status: "Created",
        sender: "Alice Smith",
        recipient: "Bob Johnson",
        createdAt: "2025-08-10T14:32:00Z",
    },
    {
        id: 7,
        status: "Sent",
        sender: "Charlie Brown",
        recipient: "Daisy Miller",
        createdAt: "2025-08-11T09:15:00Z",
    },
    {
        id: 8,
        status: "Accepted",
        sender: "Edward Green",
        recipient: "Fiona White",
        createdAt: "2025-08-12T08:45:00Z",
    },
    {
        id: 9,
        status: "Returned",
        sender: "George Black",
        recipient: "Helen Blue",
        createdAt: "2025-08-13T16:05:00Z",
    },
    {
        id: 10,
        status: "Canceled",
        sender: "Isaac Red",
        recipient: "Julia Yellow",
        createdAt: "2025-08-14T11:20:00Z",
    }, {
        id: 11,
        status: "Created",
        sender: "Alice Smith",
        recipient: "Bob Johnson",
        createdAt: "2025-08-10T14:32:00Z",
    },
    {
        id: 12,
        status: "Sent",
        sender: "Charlie Brown",
        recipient: "Daisy Miller",
        createdAt: "2025-08-11T09:15:00Z",
    },
    {
        id: 13,
        status: "Accepted",
        sender: "Edward Green",
        recipient: "Fiona White",
        createdAt: "2025-08-12T08:45:00Z",
    },
    {
        id: 14,
        status: "Returned",
        sender: "George Black",
        recipient: "Helen Blue",
        createdAt: "2025-08-13T16:05:00Z",
    },
    {
        id: 15,
        status: "Canceled",
        sender: "Isaac Red",
        recipient: "Julia Yellow",
        createdAt: "2025-08-14T11:20:00Z",
    }
];

interface PackageListTableProps {
    rows: Package[];
}

function canChangeStatus(status: string): boolean {
    return !FINAL_STATUSES.includes(status);
}

export default function PackageListTable({ rows }: PackageListTableProps) {
    return (
        <ReusableTable
            columns={columns}
            rows={mockPackages}
            rowKey="id"
            emptyMessage="No packages found."
            actions={(row) => (
                <CustomButton
                    onClick={() => alert(`Change status for ${row.id}`)}
                    disabled={!canChangeStatus(row.status)}
                    label="Change Status"
                    color="inherit"
                />
            )}
        />
    );
}