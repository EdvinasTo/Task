export type SnackbarSeverity = 'success' | 'error' | 'warning' | 'info';

export interface SnackbarContextType {
    showSnackbar: (message: string, severity?: SnackbarSeverity) => void;
}
