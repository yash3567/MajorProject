import { useState } from "react";
import Layout from "../../../components/layouts/Layout";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const ProjectRegister = () => {
    const [type] = useState("student");
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        projectname: "",
        password: "",
    
    });

    const queryClient = useQueryClient();

    const { mutate, isError, isPending, error } = useMutation({
        mutationFn: async ({ email, name, projectname, password }) => {
            try {
                const res = await fetch("/api/projectauth/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, name, projectname, password }),
                });

                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Failed to register project");
                console.log(data);
                return data;
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        onSuccess: () => {
            toast.success("Project registered successfully");
            queryClient.invalidateQueries({ queryKey: ["projectUser"] });
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault(); // page won't reload
        mutate(formData);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <Layout>
            <div className="min-h-screen bg-lightTheme-secondary dark:bg-darkTheme-secondary dark:text-darkTheme-text grid lg:grid-cols-2">
                {/* Image Background */}
                <div className="hidden lg:flex items-center px-20">
                    <img src="/svg/register.svg" alt="Register Illustration" />
                </div>

                {/* Form Starting */}
                <form
                    className="w-3/4 h-full mx-auto flex flex-col justify-center lg:justify-start lg:pt-2 mt-2 border border-black"
                    onSubmit={handleSubmit}
                >
                    <h2 className="text-3xl font-semibold mb-4">Add Your Projects</h2>
                    {/* Name Field */}
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            className="w-[320px] text-black border rounded px-3 py-2 outline-none focus:border-blue-500"
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder={
                                type === "student" ? "Enter your name" : "Enter college name"
                            }
                        />
                    </div>

                    {/* Project Name */}
                    {type === "student" && (
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2" htmlFor="projectname">
                                Project Name
                            </label>
                            <input
                                className="w-[320px] text-black border rounded px-3 py-2 outline-none focus:border-blue-500"
                                type="text"
                                id="projectname"
                                name="projectname"
                                value={formData.projectname}
                                onChange={handleInputChange}
                                placeholder="Enter Your Project Name"
                            />
                        </div>
                    )}

                    {/* Email Field */}
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="email">
                            Domain Email
                        </label>
                        <input
                            className="w-[320px] text-black border rounded px-3 py-2 outline-none focus:border-blue-500"
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* Abstract Field */}
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            className="w-[320px] text-black border rounded px-3 py-2 outline-none focus:border-blue-500"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Enter Your Password"
                        />
                    </div>

                    {/* <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <textarea
                            className="w-[320px] text-black border rounded px-3 py-2 outline-none focus:border-blue-500"
                            id="password"
                            name="password"
                            value={formData.abstract}
                            onChange={handleInputChange}
                            placeholder="Enter Your Project Abstract or Summary"
                        />
                    </div> */}

                    {/* Submit Button */}
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-3 rounded">
                        {isPending ? "Loading..." : "Register"}
                    </button>
                    {isError && <p className='text-red-500'>{error.message}</p>}

                    <div className='flex flex-col lg:w-2/3 gap-2 mt-4'>
                        <p className='text-white text-lg'>Already have an account?</p>
                        <Link to='/projectlogin'>
                            <button className='btn rounded-full btn-primary text-white btn-outline w-full'>Login in</button>
                        </Link>
                    </div>
                </form>

            </div>
        </Layout>
    );
};

export default ProjectRegister;
