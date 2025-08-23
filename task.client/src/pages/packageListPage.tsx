import { useEffect, useState } from 'react';
import CustomButton from '../components/button';
import PackageListTable from '../components/packagesTable';
import { packagesApi } from '../api/packagesApi';
import type { Package } from '../types/package';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function PackageListPage() {
    const [packages, setPackages] = useState<Package[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const data = await packagesApi.getAllPackages();
                setPackages(data);
            } catch (err) {
                setError("Failed to load packages.");
            } finally {
                setLoading(false);
            }
        };

        fetchPackages();
    }, []);

    

    const handleCreatePackage = () => {
        navigate('/create');
    };

    return (
        <>
            <h1>Package List</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
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
