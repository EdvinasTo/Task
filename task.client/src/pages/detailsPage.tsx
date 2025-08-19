import CustomButton from '../components/button';
import Navbar from '../components/navbar';
import PackageListTable from '../components/packagesTable';
import '../App.css';

function DetailsPage() {
    return (
        <>
            <Navbar />
            <h1>details</h1>
            <PackageListTable rows={[]} />
            <div className="button-container">
                <CustomButton label={'Create Package'} />
            </div>
        </>
    );
}

export default DetailsPage;