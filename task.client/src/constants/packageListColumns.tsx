import { Box } from "@mui/material";
import type TableColumn from "../interfaces/column";
import type { Package } from "../types/package";
import { statusColors } from "./statusColors";

export const columns: TableColumn<Package>[] = [
    { id: 'id', label: 'Tracking #', minWidth: 100, align: 'right' },
    {
        id: 'status',
        label: 'Status',
        minWidth: 100,
        format: (value) => (
            <Box
                sx={{
                    display: 'inline-block',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 2,
                    backgroundColor: statusColors[value as string] ?? '#ccc',
                    color: '#fff',
                    fontWeight: 500,
                    fontSize: '0.95em',
                    textAlign: 'center',
                    minWidth: 80,
                }}
            >
                {value}
            </Box>
        ),
    },
    { id: 'sender', label: 'Sender', minWidth: 120 },
    { id: 'recipient', label: 'Recipient', minWidth: 120 },
    {
        id: 'createdAt',
        label: 'Created',
        minWidth: 140,
        format: (val) => (val ? new Date(val as string).toLocaleString() : ''),
    },
];