import { Box } from "@mui/material";
import type TableColumn from "../interfaces/column";
import type { History } from "../types/packageHistory";
import { statusColors } from "./statusColors";

export const columns: TableColumn<History>[] = [
    {
        id: 'date',
        label: 'Date',
        minWidth: 140,
        format: (val) => (val ? new Date(val as string).toLocaleString() : ''),
    },
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
];