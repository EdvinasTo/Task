import '../App.css';
import PersonalInformationForm from '../components/personalInfo/personalInfoForm';

function CreatePackagePage() {
    return (
        <>
            <PersonalInformationForm onSubmitData={() => { } } />
        </>
    );
}

export default CreatePackagePage;