import { useState } from 'react';
import CustomButton from '../components/button';
import PackageListTable from '../components/packagesTable';
import PackageFilterComponent from '../components/packageFilter';
import { packagesApi } from '../api/packagesApi';
import type { PackageFilter } from '../types/packageFilter';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

function PackageListPage() {
    const navigate = useNavigate();
    const [filter, setFilter] = useState<PackageFilter>({});

    const { data: packages = [], isLoading, error } = useQuery({
        queryKey: ['packages', filter],
        queryFn: () => packagesApi.getAllPackages(filter),
    });

    const handleCreatePackage = () => {
        navigate('/create');
    };

    const handleFilterChange = (newFilter: PackageFilter) => {
        setFilter(newFilter);
    };

    const handleClearFilter = () => {
        setFilter({});
    };

    return (
        <>
            <h1>Package List</h1>

            <PackageFilterComponent
                onFilterChange={handleFilterChange}
                onClearFilter={handleClearFilter}
                isLoading={isLoading}
            />

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