import { useState } from 'react';
import PackageHistoryTable from '../components/packageHistoryTable';
import '../App.css';
import SearchBar from '../components/searchBar/searchBar';
import PersonalInformation from '../components/personalInfo/personalInfo';
import '../components/personalInfo/personalInfo.css';
import CurrentStatusCard from '../components/currentStatusCard';
import { packagesApi } from '../api/packagesApi';
import type { PackageDetails } from '../types/packageDetails';

function DetailsPage() {
    const [packageDetails, setPackageDetails] = useState<PackageDetails | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async (trackingId: string) => {
        setLoading(true);
        setError(null);
        try {
            const result = await packagesApi.getPackageById(Number(trackingId));
            setPackageDetails(result);
        } catch (err: any) {
            setError('Package not found.');
            setPackageDetails(null);
        } finally {
            setLoading(false);
        }
    };



    return (
        <>
            <SearchBar onSearch={handleSearch} />

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {packageDetails && (
                <>
                    <PersonalInformation
                        label="Sender"
                        name={packageDetails.senderInfo.name}
                        address={packageDetails.senderInfo.address}
                        phone={packageDetails.senderInfo.phone}
                    />

                    <PersonalInformation
                        label="Recipient"
                        name={packageDetails.recipientInfo.name}
                        address={packageDetails.recipientInfo.address}
                        phone={packageDetails.recipientInfo.phone}
                    />

                    {packageDetails.packageHistory.length > 0 && (
                        <CurrentStatusCard
                            status={packageDetails.packageHistory.at(-1)!.status}
                            date={new Date(packageDetails.packageHistory.at(-1)!.date).toLocaleString()}
                        />
                    )}

                    <h2 className="header">Package History</h2>
                    <PackageHistoryTable rows={packageDetails.packageHistory} />
                </>
            )}
        </>
    );
}

export default DetailsPage;
