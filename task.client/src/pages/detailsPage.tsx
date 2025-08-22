import CustomButton from '../components/button';
import Navbar from '../components/navbar';
import PackageHistoryTable from '../components/packageHistoryTable';
import '../App.css';
import SearchBar from '../components/searchBar/searchBar';
import PersonalInformation from '../components/personalInfo/personalInfo';
import '../components/personalInfo/personalInfo.css';
import CurrentStatusCard from '../components/currentStatusCard';

function DetailsPage() {
    return (
        <>
            //for now it doesnt do anything
            <SearchBar onSearch={() => { }} />
            <PersonalInformation
                label='Sender'
                name='John Smith'
                address='123 Main Street, New York, NY 10001'
                phone='(555) 123-4567'
            />
            <PersonalInformation
                label='Recipient'
                name='John Ddoe'
                address='123 Main Street, New York, NY 10001'
                phone='(555) 123-4567'
            />
            <CurrentStatusCard status="Created" date="2025-08-22 18:22:22"/>
            <h2 className='header'>Package History</h2>
            <PackageHistoryTable rows={[]} />
        </>
    );
}

export default DetailsPage;