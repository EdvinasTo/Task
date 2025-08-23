import CustomButton from '../components/button';
import PackageListTable from '../components/packagesTable';
import { packagesApi } from '../api/packagesApi';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

function PackageListPage() {
    const navigate = useNavigate();

    const { data: packages = [], isLoading, error } = useQuery({
        queryKey: ['packages'],
        queryFn: () => packagesApi.getAllPackages(),
    });

    

    const handleCreatePackage = () => {
        navigate('/create');
    };

    return (
        <>
            <h1>Package List</h1>
            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p style={{ color: "red" }}>{error.message}</p>
            ) : (
                <PackageListTable rows={packages} />
            )}
            <div className="button-container">
                <CustomButton label={'Create Package'} onClick={handleCreatePackage} />
            </div>
        </>
    );
}

export default PackageListPage;
