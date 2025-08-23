import { Outlet } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from './contexts/snackbarProvider';

function App() {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <SnackbarProvider>
                <Navbar />
                <Outlet />
            </SnackbarProvider>
        </QueryClientProvider>
    );
}

export default App;