export default interface TableColumn<T = unknown> {
    id: keyof T;
    label: string;
    minWidth?: number;
    align?: 'right' | 'left' | 'center';
    format?: (value: T[keyof T], row: T) => React.ReactNode;
}