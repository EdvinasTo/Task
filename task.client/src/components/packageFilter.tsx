import React, { useState } from 'react';
import CustomButton from './button';
import statusTransitions from '../constants/statusTransitions';
import type { PackageFilter } from '../types/packageFilter';

interface PackageFilterProps {
    onFilterChange: (filter: PackageFilter) => void;
    onClearFilter: () => void;
    isLoading?: boolean;
}

const PACKAGE_STATUSES = Object.keys(statusTransitions);

export default function PackageFilterComponent({ onFilterChange, onClearFilter, isLoading }: PackageFilterProps) {
    const [packageId, setPackageId] = useState<string>('');
    const [status, setStatus] = useState<string>('');

    const handleFilterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const filter: PackageFilter = {};
        
        if (packageId.trim()) {
            const parsedId = parseInt(packageId.trim());
            if (!isNaN(parsedId) && parsedId > 0) {
                filter.packageId = parsedId;
            }
        }
        
        if (status) {
            filter.status = status;
        }
        
        onFilterChange(filter);
    };

    const handleClear = () => {
        setPackageId('');
        setStatus('');
        onClearFilter();
    };

    return (
        <div className="filter-container" style={{ display: 'flex', marginBottom: '20px', padding: '20px', justifyContent: 'center' }}>
            <form onSubmit={handleFilterSubmit} style={{ display: 'flex', gap: '15px', alignItems: 'end', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <input
                        id="packageId"
                        type="number"
                        min="1"
                        value={packageId}
                        onChange={(e) => setPackageId(e.target.value)}
                        placeholder="Find packages containing ID"
                        style={{
                            padding: '8px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            width: '205px'
                        }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        style={{
                            padding: '8px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            minWidth: '150px'
                        }}
                    >
                        <option value="">Select Status</option>
                        {PACKAGE_STATUSES.map((statusOption) => (
                            <option key={statusOption} value={statusOption}>
                                {statusOption}
                            </option>
                        ))}
                    </select>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <CustomButton
                        type="submit"
                        label="Apply Filter"
                        disabled={isLoading}
                    />
                    <CustomButton
                        type="button"
                        label="Clear Filter"
                        onClick={handleClear}
                        disabled={isLoading}
                        color="secondary"
                    />
                </div>
            </form>
        </div>
    );
}