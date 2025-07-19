import { useState } from "react";
import UserAuthContext from "../../hooks/userAuth";
import axios from "axios";
import Swal from "sweetalert2";

export default function AddJobForm() {
    const { user } = UserAuthContext();

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        title: "",
        location: "",
        jobType: "",
        category: "",
        applicationDeadline: "",
        salaryRange: {
            min: "",
            max: "",
            currency: "bdt",
        },
        description: "",
        company: "",
        company_logo: "",
        requirements: [""],
        responsibilities: [""],
        hr_email: `${user.email}`,
        hr_name: "",
        status: "active",
    });

    const nextStep = (e) => {
        e.preventDefault()
        setStep(prev => prev + 1)
    };

    const prevStep = (e) => {
        e.preventDefault()
        setStep(prev => prev - 1)
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "salaryMin" || name === "salaryMax" || name === "salaryCurrency") {
            setFormData({
                ...formData,
                salaryRange: {
                    ...formData.salaryRange,
                    [name === "salaryMin" ? "min" : name === "salaryMax" ? "max" : "currency"]: value,
                },
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleArrayChange = (name, index, value) => {
        const updated = [...formData[name]];
        updated[index] = value;
        setFormData({ ...formData, [name]: updated });
    };

    const addToArray = (name) => {
        setFormData({ ...formData, [name]: [...formData[name], ""] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();


        // clean & transform salary
        const cleanedData = {
            ...formData,
            salaryRange: {
                min: Number(String(formData.salaryRange.min).trim()) || 0,
                max: Number(String(formData.salaryRange.max).trim()) || 0,
                currency: formData.salaryRange.currency.trim()
            },
            title: formData.title.trim(),
            location: formData.location.trim(),
            description: formData.description.trim(),
            company: formData.company.trim(),
            company_logo: formData.company_logo.trim(),
            hr_name: formData.hr_name.trim(),
            hr_email: formData.hr_email.trim(),
            requirements: formData.requirements.map(req => req.trim()).filter(req => req !== ""),
            responsibilities: formData.responsibilities.map(res => res.trim()).filter(res => res !== "")
        };

        console.log("Cleaned Data to Submit:", cleanedData);

        axios.post('https://job-portal-server-beta-cyan.vercel.app/addjob', cleanedData)
            .then(function (response) {
                console.log(response.data);
                if (response.data.insertedId) {
                    Swal.fire({
                        title: "Job Submit Successful",
                        icon: "success",
                        draggable: true
                    });

                }
            })
            .catch(function (error) {
                console.log(error);
            });

        // fetch('https://job-portal-server-beta-cyan.vercel.app/addjob', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(cleanedData)
        // }).then(res => res.json()).then(data => {
        // if (response.data.insertedId) {
        //     Swal.fire({
        //         title: "Job Submit Successful",
        //         icon: "success",
        //         draggable: true
        //     });
        // }
        // });

    };


    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto my-8 p-4 space-y-4 bg-white shadow rounded"
        >
            <h2 className="text-xl font-bold">Create Job Posting</h2>

            {step === 1 && (
                <div className="space-y-3">
                    <input
                        type="text"
                        name="title"
                        placeholder="Job Title"
                        value={formData.title}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />
                    <input
                        type="text"
                        name="location"
                        placeholder="Location"
                        value={formData.location}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />

                    <select
                        name="jobType"
                        value={formData.jobType}
                        onChange={handleChange}
                        className="select select-bordered w-full"
                    >
                        <option value="" disabled>Select Job Type</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                        <option value="Temporary">Temporary</option>
                        <option value="Hybrid">Hybrid</option>
                    </select>

                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="select select-bordered w-full"
                    >
                        <option value="" disabled>Select Category</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Design">Design</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Sales">Sales</option>
                        <option value="Human Resources">Human Resources</option>
                        <option value="Customer Support">Customer Support</option>
                    </select>

                    <input
                        type="date"
                        name="applicationDeadline"
                        value={formData.applicationDeadline}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />

                    <div className="flex gap-2">
                        <input
                            type="number"
                            name="salaryMin"
                            placeholder="Min Salary"
                            value={formData.salaryRange.min}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                        />
                        <input
                            type="number"
                            name="salaryMax"
                            placeholder="Max Salary"
                            value={formData.salaryRange.max}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                        />
                        <select
                            name="salaryCurrency"
                            value={formData.salaryRange.currency}
                            onChange={handleChange}
                            className="select select-bordered w-32"
                        >
                            <option value="bdt">BDT</option>
                            <option value="usd">USD</option>
                            <option value="eur">EUR</option>
                        </select>
                    </div>

                    <textarea
                        name="description"
                        placeholder="Job Description"
                        value={formData.description}
                        onChange={handleChange}
                        className="textarea textarea-bordered w-full"
                    />
                </div>
            )}

            {step === 2 && (
                <div className="space-y-3">
                    <h3 className="font-semibold">Requirements</h3>
                    {formData.requirements.map((req, i) => (
                        <input
                            key={i}
                            type="text"
                            value={req}
                            onChange={(e) =>
                                handleArrayChange("requirements", i, e.target.value)
                            }
                            className="input input-bordered w-full"
                            placeholder={`Requirement ${i + 1}`}
                        />
                    ))}
                    <button
                        type="button"
                        onClick={() => addToArray("requirements")}
                        className="btn btn-sm btn-accent"
                    >
                        Add Requirement
                    </button>

                    <h3 className="font-semibold mt-4">Responsibilities</h3>
                    {formData.responsibilities.map((res, i) => (
                        <input
                            key={i}
                            type="text"
                            value={res}
                            onChange={(e) =>
                                handleArrayChange("responsibilities", i, e.target.value)
                            }
                            className="input input-bordered w-full"
                            placeholder={`Responsibility ${i + 1}`}
                        />
                    ))}
                    <button
                        type="button"
                        onClick={() => addToArray("responsibilities")}
                        className="btn btn-sm btn-accent"
                    >
                        Add Responsibility
                    </button>
                </div>
            )}

            {step === 3 && (
                <div className="space-y-3">
                    <input
                        type="text"
                        name="hr_name"
                        placeholder="HR Name"
                        value={formData.hr_name}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />
                    <input
                        type="email"
                        name="hr_email"
                        placeholder="HR Email"
                        value={formData.hr_email}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        readOnly
                    />
                    <input
                        type="text"
                        name="company"
                        placeholder="Company Name"
                        value={formData.company}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />
                    <input
                        type="url"
                        name="company_logo"
                        placeholder="Company Logo URL"
                        value={formData.company_logo}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="select select-bordered w-full"
                    >
                        <option value="active">Active</option>
                        <option value="closed">Closed</option>
                    </select>
                </div>
            )}

            <div className="flex justify-between mt-4">
                {step > 1 && (
                    <button
                        type="button"
                        onClick={prevStep}
                        className="btn btn-outline"
                    >
                        Back
                    </button>
                )}
                {step < 3 ? (
                    <button
                        type="button"
                        onClick={nextStep}
                        className="btn btn-primary ml-auto"
                    >
                        Next
                    </button>
                ) : (
                    <button
                        type="submit"
                        className="btn btn-success ml-auto"
                    >
                        Submit
                    </button>
                )}
            </div>
        </form>
    );
}
