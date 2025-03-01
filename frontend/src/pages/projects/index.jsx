import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Layout from "../../components/layouts/Layout";

// import useFollow from "../../hooks/useFollow";
// import LoadingSpinner from "../../components/Loading";

const SkeletonCard = () => {
    return (
        <div className='bg-[#16181C] p-4 rounded-md shadow-md flex flex-col items-center text-center animate-pulse'>
            <div className='w-16 h-16 rounded-full bg-gray-700 mb-2'></div>
            <div className='w-32 h-4 bg-gray-700 rounded mb-1'></div>
            <div className='w-24 h-3 bg-gray-600 rounded mb-2'></div>
            <div className='w-20 h-6 bg-gray-700 rounded mt-2'></div>
        </div>
    );
};

const Projects = () => {
    const { data: suggestedUsers, isLoading } = useQuery({
        queryKey: ["suggestedUsers"],
        queryFn: async () => {
            try {
                const res = await fetch("/api/users/suggested");
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.error || "Something went wrong!");
                }
                return data;
            } catch (error) {
                throw new Error(error.message);
            }
        },
        refetchOnWindowFocus: false, // Prevent disappearing issue on inspect
        staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    });

    if (!isLoading && (!suggestedUsers || suggestedUsers.length === 0)) {
        return <div className='md:w-64 w-0 text-center text-gray-400'>No users found.</div>;
    }

    return (
        <Layout>
            <div className='hidden lg:block my-4 mx-2'>
            <p className='text-2xl font-bold text-center mb-4'style={{fontWeight:"600", fontSize:"35px", color:"#12254e"}}>Project Users</p>

            {/* Show skeleton while loading */}
            {isLoading ? (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                </div>
            ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                    {suggestedUsers?.map((user) => (
                        <div
                            key={user._id}
                            className='bg-[#16181C] p-4 rounded-md shadow-md flex items-center text-left gap-4'
                        >
                            <Link 
                                to={`/profile/${user.username}`} 
                                className='flex items-center no-underline hover:no-underline gap-4'
                            >
                                {/* Profile Image */}
                                <div className='avatar'>
                                    <div className='w-16 h-16 rounded-full overflow-hidden'>
                                        <img src={user.profileImg || "/avatar-placeholder.png"} alt={user.fullName} />
                                    </div>
                                </div>
                                
                                {/* Name & Username */}
                                <div className='flex flex-col'>
                                    <span className='font-semibold tracking-tight w-32 truncate'>
                                        {user.fullName}
                                    </span>
                                    <span className='text-sm text-slate-500'>
                                        @{user.username}
                                    </span>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
        </Layout>
    );
};

export default Projects;
