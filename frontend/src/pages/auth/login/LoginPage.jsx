import { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineMail, MdPassword } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const LoginPage = () => {
	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});

	const [showPassword, setShowPassword] = useState(false);
	const togglePasswordVisibility = () => setShowPassword(!showPassword);

	const queryClient = useQueryClient();

	const { mutate: loginMutation, isPending, isError, error } = useMutation({
		mutationFn: async ({ username, password }) => {
			const res = await fetch("/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, password }),
			});

			const data = await res.json();
			if (!res.ok) throw new Error(data.error || "Something went wrong");
			return data;
		},
		onSuccess: () => {
			toast.success("Login successful");
			queryClient.invalidateQueries({ queryKey: ["authUser"] });
		},
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		loginMutation(formData);
	};

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	return (
		<div className="flex items-center justify-center min-h-screen w-full h-screen">
			<div className="flex flex-col md:flex-row w-full h-screen">
				{/* SVG Section */}
				<div className="hidden md:flex justify-center items-center w-1/2 h-full bg-blue-500">
	<img src="/svg/login.svg" alt="Learning" className="w-3/4 h-auto max-w-lg" />
</div>


				{/* Login Form Section */}
				<div className="w-full md:w-1/2 h-full flex justify-center items-center bg-white">
					<div className="w-full max-w-md p-8">
						<h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
						<form onSubmit={handleSubmit}>
							<div className="mb-4">
								<label className="block text-sm font-medium mb-1">Username</label>
								<div className="relative flex items-center border rounded-lg px-3 py-2">
									<MdOutlineMail className="mr-2" />
									<input
										type="text"
										name="username"
										value={formData.username}
										onChange={handleInputChange}
										required
										className="w-full focus:outline-none"
										placeholder="Enter your username"
									/>
								</div>
							</div>

							<div className="mb-4">
								<label className="block text-sm font-medium mb-1">Password</label>
								<div className="relative flex items-center border rounded-lg px-3 py-2">
									<MdPassword className="mr-2" />
									<input
										type={showPassword ? "text" : "password"}
										name="password"
										value={formData.password}
										onChange={handleInputChange}
										required
										className="w-full focus:outline-none"
										placeholder="Enter your password"
									/>
									<span
										className="absolute right-3 cursor-pointer"
										onClick={togglePasswordVisibility}
									>
										{showPassword ? <FaEyeSlash /> : <FaEye />}
									</span>
								</div>
							</div>

							<button
								type="submit"
								className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
							>
								{isPending ? "Loading..." : "Login"}
							</button>
							{isError && <p className="text-red-500 mt-2">{error.message}</p>}
						</form>
						<p className="text-center text-sm mt-4">
							{"Don't"} have an account?
							<Link to="/signup" className="text-blue-600 hover:underline ml-1">
								Sign Up
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
