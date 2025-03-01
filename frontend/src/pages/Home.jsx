import { FaArrowRightLong } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layouts/Layout';


const Home = () => {

    const navigate = useNavigate(); // Initialize the navigate function

    const handleGetStarted = () => {
        navigate('/project'); // Redirects to the project page
    };

    return (
        <Layout>
            <div className="bg-lightTheme-secondary text-lightTheme-text dark:bg-darkTheme-secondary dark:text-darkTheme-text">
                <section className="grid md:grid-cols-2 pt-5 px-2">
                    <div className="my-auto">
                        <div className="text-xl text-center md:text-5xl font-[sura]">
                            <p>Project Work Station</p>
                        </div>
                        <div className="flex justify-center">
                            <span className="border-b-4 border-black my-5 w-40"></span>
                        </div>
                        <div className="p-5 font-sans text-lg leading-relaxed text-gray-800 dark:text-gray-200">                       
                            <p className="mb-4">
                                The Project Work-Station is an online platform created to showcase and compile student projects from Anjuman College of Engineering and Technology. It promotes collaboration, knowledge sharing, and interaction among students and educators.
                            </p>
                            <p className="mb-4">
                                The platform features user profiles for both students and educators, which highlight their projects, skills, and research interests. A well-organized project repository allows easy access to detailed project information.
                            </p>
                            <p className="mb-4">
                                Additionally, the platform offers feedback and mentorship from peers, educators, and industry experts, along with a calendar for academic events. Continuous updates will ensure that it remains a central hub for academic collaboration and innovation at the college.
                            </p>
                        </div>
                    </div>
                    <div className="flex px-10 py-7 md:px-20 md:py-10 justify-center items-center">
                        <img className="hidden md:flex" src="/svg/learning.svg" alt="solar" />
                        <img className="md:hidden" src="/svg/learning.svg" alt="Learning" />
                    </div>
                </section>
                <section className="p-5">

                    <div className="flex mt-5 justify-center">
                        <button
                            onClick={handleGetStarted} // Call the handleGetStarted function on click
                            className="flex gap-2 items-center font-medium text-base p-1 hover:rounded border-b-2 border-purple-700 hover:bg-purple-700 transition-colors"
                        >
                            Get Started <FaArrowRightLong />
                        </button>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default Home;
