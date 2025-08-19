import Button, { type ButtonProps } from '@mui/material/Button';
import type { MouseEventHandler } from 'react';

interface CustomButtonProps {
    label: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    color?: ButtonProps['color'];
}

export default function CustomButton({ label, onClick, disabled, color = "success" }: CustomButtonProps) {
    return (
        <Button
            disabled={disabled}
            variant="contained"
            color={color}
            onClick={onClick}
        >
            {label}
        </Button>
    );
}