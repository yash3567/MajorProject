import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import { MdOutlineMail, MdPassword, MdDriveFileRenameOutline } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    fullName: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const queryClient = useQueryClient();

  const { mutate, isError, isPending, error } = useMutation({
    mutationFn: async ({ email, username, fullName, password }) => {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, fullName, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create account");
      return data;
    },
    onSuccess: () => {
      toast.success("Account created successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex w-full h-screen">
      {/* SVG Section (Left Side) */}
      <div className="hidden md:flex w-1/2 h-full bg-violet-300 justify-center items-center">
  <img src="/svg/register.svg" alt="Learning" className="w-3/4 max-w-lg" />
</div>



      {/* Sign Up Form Section (Right Side) */}
      <div className="w-full md:w-1/2 h-full flex justify-center items-center bg-white">
        <div className="w-full max-w-md p-8">
          <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <div className="relative flex items-center border rounded-lg px-3 py-2">
                <MdDriveFileRenameOutline className="mr-2" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full focus:outline-none"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Username</label>
              <div className="relative flex items-center border rounded-lg px-3 py-2">
                <FaUser className="mr-2" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full focus:outline-none"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email</label>
              <div className="relative flex items-center border rounded-lg px-3 py-2">
                <MdOutlineMail className="mr-2" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full focus:outline-none"
                  placeholder="Enter your email"
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
                  onChange={handleChange}
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
              {isPending ? "Loading..." : "Sign Up"}
            </button>
            {isError && <p className="text-red-500 mt-2">{error.message}</p>}
          </form>
          <p className="text-center text-sm mt-4">
            Already have an account?
            <Link to="/login" className="text-blue-600 hover:underline ml-1">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
