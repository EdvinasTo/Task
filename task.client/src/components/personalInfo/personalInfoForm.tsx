import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "./personalInfo.css";
import formSchema from './schema/schema.tsx';
import PersonalInfoInput from "./personalInfoInput.tsx";

type FormData = z.infer<typeof formSchema>;

interface Props {
    onSubmitData: (data: FormData) => void;
}

const SenderRecipientForm: React.FC<Props> = ({ onSubmitData }) => {
    const methods = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = (data: FormData) => {
        onSubmitData(data);
    };

    return (
        <FormProvider {...methods}>
            <form className="container" onSubmit={methods.handleSubmit(onSubmit)}>
                <PersonalInfoInput label="Sender" />
                <PersonalInfoInput label="Recipient" />

                <button
                    type="submit"
                    className="button"
                >
                    Save
                </button>
            </form>
        </FormProvider>
    );
};

export default SenderRecipientForm;
