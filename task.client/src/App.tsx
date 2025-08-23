import { Outlet } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <Navbar/>
            <Outlet />
        </QueryClientProvider>
    );
}

export default App;