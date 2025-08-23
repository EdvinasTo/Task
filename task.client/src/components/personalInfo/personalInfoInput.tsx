import React from "react";
import { z } from "zod";
import "./personalInfo.css";
import { useFormContext } from "react-hook-form";
import formSchema from './schema/schema.tsx';

type FormData = z.infer<typeof formSchema>;

const PersonalInfoInput: React.FC<{ label: string }> = ({
    label,
}) => {
    const { register, formState: { errors } } = useFormContext<FormData>();

    const fieldErrors = errors[label.toLowerCase()];

    return (
        <div className="card" style={{ marginBottom: "1rem", marginTop: "3rem" }}>
            <h3 className="header">{label} Information</h3>

            <div className="personal-info">
                <div className="field">
                    <div className="label">Name</div>
                    <input
                        type="text"
                        {...register(`${label.toLowerCase()}Info.name`)}
                        className="value input"
                        placeholder={`Enter ${label.toLowerCase()} name`}
                    />
                    {fieldErrors?.name && (
                        <p className="error">
                            {fieldErrors.name.message}
                        </p>
                    )}
                </div>
            </div>

            <div className="personal-info">
                <div className="field">
                    <div className="label">Address</div>
                    <input
                        type="text"
                        {...register(`${label.toLowerCase()}Info.address`)}
                        className="value input"
                        placeholder={`Enter ${label.toLowerCase()} address`}
                    />
                    {fieldErrors?.address && (
                        <p className="error">
                            {fieldErrors.address.message}
                        </p>
                    )}
                </div>
            </div>

            <div className="personal-info">
                <div className="field">
                    <div className="label">Phone</div>
                    <input
                        type="text"
                        {...register(`${label.toLowerCase()}Info.phone`)}
                        className="value input"
                        placeholder={`Enter ${label.toLowerCase()} phone`}
                    />
                    {fieldErrors?.phone && (
                        <p className="error">
                            {fieldErrors.phone.message}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PersonalInfoInput;