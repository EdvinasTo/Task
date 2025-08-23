import { createContext } from 'react';
import type { SnackbarContextType } from '../types/snackbarTypes';

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export default SnackbarContext;