import CustomButton from '../components/button';
import Navbar from '../components/navbar';
import PackageHistoryTable from '../components/packageHistoryTable';
import '../App.css';

function DetailsPage() {
    return (
        <>
            <Navbar />
            <h1>Details</h1>
            <PackageHistoryTable rows={[]} />
            <div className="button-container">
                <CustomButton label={'Change Status'} />
            </div>
        </>
    );
}

export default DetailsPage;