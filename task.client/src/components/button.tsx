import Button, { type ButtonProps } from '@mui/material/Button';
import type { MouseEventHandler } from 'react';

interface CustomButtonProps {
    label: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    color?: ButtonProps['color'];
    type?: 'button' | 'submit';
}

export default function CustomButton({ type = 'button', label, onClick, disabled, color = "success" }: CustomButtonProps) {
    return (
        <Button
            type={type}
            disabled={disabled}
            variant="contained"
            color={color}
            onClick={onClick}
        >
            {label}
        </Button>
    );
}