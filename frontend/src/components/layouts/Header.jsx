import { Disclosure, DisclosureButton } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useContext, useState, useEffect } from 'react';
import { MyContext } from '../../App';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import { Link, useNavigate } from "react-router-dom";
import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import Logout from '@mui/icons-material/Logout';
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MdOndemandVideo } from "react-icons/md";


const Header = () => {
    const navigation = [
        { name: 'Home', href: '/', current: false },
        { name: 'About', href: '/about', current: false },
        { name: 'Services', href: '/services', current: false },
        { name: 'Contact', href: '/contact', current: false },
        { name: 'Projects', href: '/project', current: false },
    ];

    const navigate = useNavigate();
    const [setUser] = useState(null);


    // Simulating fetching user data after login
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user")); // Fetch user from localStorage
        if (storedUser) setUser(storedUser);
    }, []);

    const handleSignIn = () => {
        navigate("/signup"); // Redirect to signup page
    };




    const context = useContext(MyContext);
    const [darkMode, setDarkMode] = useState(context.theme === "dark");

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        context.setTheme(darkMode ? "light" : "dark");
    };

    const queryClient = useQueryClient();
    const { mutate: logout } = useMutation({
        mutationFn: async () => {
            try {
                const res = await fetch("/api/auth/logout", {
                    method: "POST",
                });
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error || "Something went wrong");
                }
            } catch (error) {
                throw new Error(error);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["authUser"] });
        },
        onError: () => {
            toast.error("Logout failed");
        },
    });
    const { data: authUser } = useQuery({ queryKey: ["authUser"] });



    return (

        <Disclosure as="nav" className={`bg-gray-800 ${context.theme === "dark" ? 'dark' : ''}`} style={{ backgroundColor: '#112143' }}>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    {/* Mobile Menu Button */}
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                            <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                        </DisclosureButton>
                    </div>

                    {/* Navbar Center - Logo and Navigation */}
                    <div className="flex flex-1 items-center justify-center sm:justify-between">
                        <div className="flex items-center justify-center sm:items-start">
                            <span className="logo-text">Project~Station</span>
                        </div>

                        <div className="hidden sm:flex sm:justify-center sm:items-center sm:flex-1">
                            <div className="flex space-x-4">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Notifications, Dark Mode, Profile */}
                    <div className="flex items-center space-x-4 sm:ml-6">
                        {/* Notifications Button */}
                        <Link to="/notifications">
  <button
    type="button"
    className="relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
    style={{ backgroundColor: "#112143" }}
  >
    <BellIcon aria-hidden="true" className="h-6 w-6" />
  </button>
</Link>

                        {/* Dark Mode Toggle */}
                        <button
                            type="button"
                            onClick={toggleDarkMode}
                            className="hidden sm:block rounded-full p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                            style={{ backgroundColor: '#112143' }}
                        >
                            {darkMode ? <SunIcon className="h-6 w-6" aria-hidden="true" /> : <MoonIcon className="h-6 w-6" aria-hidden="true" />}
                            <span className="sr-only">Toggle Dark Mode</span>
                        </button>

                        <div className="relative ml-3">
                            {authUser ? (
                                <Menu as="div" className="relative inline-block text-left">
                                    <MenuButton className="flex items-center gap-x-2 px-3 py-2 rounded-full no-underline hover:no-underline hover:bg-transparent">
                                        {/* Profile Image */}
                                        <div className="avatar hidden md:block">
                                            <div className="w-8 h-8 rounded-full overflow-hidden">
                                                <img
                                                    src={authUser.profileImg || "/avatar-placeholder.png"}
                                                    alt="Profile"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </div>

                                        {/* User Info */}
                                        <div className="hidden md:flex flex-col">
                                            <p className="text-white font-bold text-sm">{authUser.fullName}</p>
                                            <p className="text-slate-500 text-xs">{authUser.email}</p>
                                        </div>
                                    </MenuButton>
                                    <MenuItems
                                        className="absolute left-4 z-10 mt-0 w-45 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none"
                                    >
                                        <MenuItem>
                                            {({ active }) => (
                                                <Link
                                                    to={`/profile/${authUser.username}`}
                                                    className={`grid grid-cols-[35px_auto] items-center px-4 py-2 text-sm text-gray-700 no-underline hover:no-underline hover:text-blue-500 ${active ? 'bg-gray-100' : ''}`}
                                                >
                                                    <PersonSharpIcon fontSize="small" className="justify-self-start" />
                                                    <span className="no-underline hover:no-underline">Your Profile</span>
                                                </Link>
                                            )}
                                        </MenuItem>

                                        <MenuItem>
                                            {({ active }) => (
                                                <Link
                                                    to="/tutorial"
                                                    className={`grid grid-cols-[35px_auto] items-center px-4 py-2 text-sm text-gray-700 no-underline hover:no-underline hover:text-blue-500 ${active ? 'bg-gray-100' : ''}`}
                                                >
                                                    <MdOndemandVideo size={20} className="justify-self-start" />
                                                    <span className="no-underline hover:no-underline">Tutorial</span>
                                                </Link>
                                            )}
                                        </MenuItem>

                                        <MenuItem>
                                            {({ active }) => (
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        logout();
                                                    }}
                                                    className={`grid grid-cols-[30px_auto] items-center w-full text-left px-4 py-2 text-sm text-gray-700 no-underline hover:no-underline hover:text-blue-500 ${active ? 'bg-gray-100' : ''}`}
                                                >
                                                    <Logout fontSize="small" className="justify-self-start ml-1" /> {/* Adjusted margin-left */}
                                                    <span className="pl-1 no-underline hover:no-underline">Sign out</span>
                                                </button>
                                            )}
                                        </MenuItem>

                                    </MenuItems>




                                </Menu>
                            ) : (
                                /* Sign In Button */
                                <button
                                    className="bg-dark-gray-8 text-black px-2 py-1 sm:px-4 rounded-full text-sm font-medium text-opacity-70
                           hover:bg-brand-orange hover:text-black hover:border-2 hover:border-brand-orange border-2 border-transparent
                           transition duration-300 ease-in-out"
                                    onClick={handleSignIn}
                                >
                                    Sign In
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Disclosure>


    );
};

export default Header;
