import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import PackageListPage from '../pages/packageListPage.tsx';
import DetailsPage from '../pages/detailsPage.tsx';
import CreatePackagePage from '../pages/createPackagePage.tsx';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <PackageListPage />,
            },
            {
                path: 'details',
                element: <DetailsPage />
            },
            {
                path: 'create',
                element: <CreatePackagePage />
            },
        ],
    },
]);