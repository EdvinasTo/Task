import CustomButton from '../components/button';
import Navbar from '../components/navbar';
import PackageHistoryTable from '../components/packageHistoryTable';
import '../App.css';

function DetailsPage() {
    return (
        <>
            <Navbar />
            <h1>details</h1>
            <PackageHistoryTable rows={[]} />
            <div className="button-container">
                <CustomButton label={'Create Package'} />
            </div>
        </>
    );
}

export default DetailsPage;