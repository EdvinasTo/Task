import { useState } from 'react';
import PackageHistoryTable from '../components/packageHistoryTable';
import '../App.css';
import SearchBar from '../components/searchBar/searchBar';
import PersonalInformation from '../components/personalInfo/personalInfo';
import '../components/personalInfo/personalInfo.css';
import CurrentStatusCard from '../components/currentStatusCard';
import { packagesApi } from '../api/packagesApi';
import { useQuery } from '@tanstack/react-query';

function DetailsPage() {
    const [trackingId, setTrackingId] = useState<number | null>(null);

    const {
        data: packageDetails,
        isLoading,
        error
    } = useQuery({
        queryKey: [trackingId],
        queryFn: () => packagesApi.getPackageById(trackingId!),
        enabled: trackingId !== null,
    });

    const handleSearch = async (searchId: string) => {
        setTrackingId(Number(searchId)); 
    };

    return (
        <>
            <SearchBar onSearch={handleSearch} />

            {isLoading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>Package not found</p>}

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
                            packageId={Number(trackingId)}
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