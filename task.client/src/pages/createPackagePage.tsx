import '../App.css';
import { packagesApi } from '../api/packagesApi';
import PersonalInformationForm from '../components/personalInfo/personalInfoForm';
import type { CreatePackageRequest } from '../types/createPackageRequest';

function CreatePackagePage() {
    const handleSubmitData = async (data: CreatePackageRequest) => {
        try {
            const response = await packagesApi.createPackage(data);
            alert(`Package created! ID: ${response.id}`);
        } catch (error) {
            alert(`Failed to create package. See console for details.`);
        }
    };

    return (
        <>
            <PersonalInformationForm onSubmitData={handleSubmitData} />
        </>
    );
}

export default CreatePackagePage;
