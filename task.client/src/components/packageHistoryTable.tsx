import ReusableTable from './table';
import type { History } from '../types/packageHistory';
import { columns } from '../constants/packageHistoryColumns'

interface PackageListTableProps {
    rows: History[];
}

export default function PackageListTable({ rows }: PackageListTableProps) {
    return (
        <ReusableTable
            columns={columns}
            rows={rows}
            rowKey="date"
            emptyMessage="No packages found."
            enablePagination={false}
        />
    );
}