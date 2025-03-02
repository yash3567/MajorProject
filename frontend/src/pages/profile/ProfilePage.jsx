import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CreatePost from "../../components/common/CreatePost";
import { FaGithub, FaLinkedin } from "react-icons/fa"; // Import icons

import Posts from "../../components/common/Posts";
import ProfileHeaderSkeleton from "../../components/skeletons/ProfileHeaderSkeleton";
import EditProfileModal from "./EditProfileModal";

// import { POSTS } from "../../utils/db/dummy";
{/* <span className='text-sm text-slate-500'>{POSTS?.length} posts</span> */ }
import axioe from "axios"
import { FaArrowLeft } from "react-icons/fa6";
import { IoCalendarOutline } from "react-icons/io5";
import { FaLink } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { formatMemberSinceDate } from "../../utils/date";

import useFollow from "../../hooks/useFollow";
import useUpdateUserProfile from "../../hooks/useUpdateUserProfile";

const ProfilePage = () => {
	const [coverImg, setCoverImg] = useState(null);
	const [profileImg, setProfileImg] = useState(null);
	const [feedType, setFeedType] = useState("posts");

	const coverImgRef = useRef(null);
	const profileImgRef = useRef(null);

	const { username } = useParams();

	const { follow, isPending } = useFollow();
	const { data: authUser } = useQuery({ queryKey: ["authUser"] });

	const {
		data: user,
		isLoading,
		refetch,
		isRefetching,
	} = useQuery({
		queryKey: ["userProfile"],
		queryFn: async () => {
			try {
				const res = await fetch(`/api/users/profile/${username}`);
				const data = await res.json();
				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}
				return data;
			} catch (error) {
				throw new Error(error);
			}
		},
	});

	const { isUpdatingProfile, updateProfile } = useUpdateUserProfile();

	const isMyProfile = authUser._id === user?._id;
	const memberSinceDate = formatMemberSinceDate(user?.createdAt);
	const amIFollowing = authUser?.following.includes(user?._id);

	const handleImgChange = (e, state) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				state === "coverImg" && setCoverImg(reader.result);
				state === "profileImg" && setProfileImg(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};



	useEffect(() => {
		refetch();
	}, [username, refetch]);



	const [file, setFile] = useState(null);
	const [progress, setProgress] = useState({started: false, pc:0});
	const [msg, setMsg] = useState(null);
	function handleUpload() {
		if (!file) {
			setMsg("No file seleted")
			return;
		}
		const fd = new FormData();
		fd.append('file', file);
setMsg("Uploading...");
		axios.post('http://httpbin.org/post', fd, {
			onUploadProgress: (progressEvent) => { console.log(progressEvent.progress*100) },
			headers: {
				"Custom-header": "value",
			}
		})
		.then(res =>{
			setMsg("Upload successfully")
			 console.log(res.data)})
		.catch(err => {
			setMsg("Upload successfully")
			console.log(err)})
	}

	return (
		<>
			<div className='flex-[4_4_0]  border-r border-gray-700 min-h-screen '>
				{/* HEADER */}
				{(isLoading || isRefetching) && <ProfileHeaderSkeleton />}
				{!isLoading && !isRefetching && !user && <p className='text-center text-lg mt-4'>User not found</p>}
				<div className=' flex-col'>
					{!isLoading && !isRefetching && user && (
						<>
							<div className='flex gap-10 px-4 py-2 items-center'>
								<Link to='/'>
									<FaArrowLeft className='w-4 h-4' />
								</Link>
								<div className=' flex-col'>
									<p className='font-bold text-lg'>{user?.fullName}</p>

								</div>
							</div>
							{/* COVER IMG */}
							<div className='relative group/cover'>
								<img
									src={coverImg || user?.coverImg || "/cover.png"}
									className='h-52 w-full object-cover'
									alt='cover image' style={{ height: "25rem" }}
								/>
								{isMyProfile && (
									<div
										className='absolute top-2 right-2 rounded-full p-2 bg-gray-800 bg-opacity-75 cursor-pointer opacity-0 group-hover/cover:opacity-100 transition duration-200'
										onClick={() => coverImgRef.current.click()}
									>
										<MdEdit className='w-5 h-5 text-white' />
									</div>
								)}

								<input
									type='file'
									hidden
									accept='image/*'
									ref={coverImgRef}
									onChange={(e) => handleImgChange(e, "coverImg")}
								/>
								<input
									type='file'
									hidden
									accept='image/*'
									ref={profileImgRef}
									onChange={(e) => handleImgChange(e, "profileImg")}
								/>
								{/* USER AVATAR */}
								<div className='avatar absolute -bottom-16 left-4'>
									<div className='w-40 rounded-full relative group/avatar'>
										<img src={profileImg || user?.profileImg || "/avatar-placeholder.png"} />
										<div className='absolute top-3 right-7 p-2 bg-primary rounded-full group-hover/avatar:opacity-100 opacity-0 cursor-pointer'>
											{isMyProfile && (
												<MdEdit
													className='w-4 h-4 text-white'
													onClick={() => profileImgRef.current.click()}
												/>
											)}
										</div>
									</div>
								</div>
							</div>
							<div className='flex justify-end px-4 mt-5'>
								{isMyProfile && <EditProfileModal authUser={authUser} />}
								{!isMyProfile && (
									<button
										className='btn btn-outline rounded-full btn-sm'
										onClick={() => follow(user?._id)}
									>
										{isPending && "Loading..."}
										{!isPending && amIFollowing && "Unfollow"}
										{!isPending && !amIFollowing && "Follow"}
									</button>
								)}
								{(coverImg || profileImg) && (
									<button
										className='btn btn-primary rounded-full btn-sm text-white px-4 ml-2'
										onClick={async () => {
											await updateProfile({ coverImg, profileImg });
											setProfileImg(null);
											setCoverImg(null);
										}}
									>
										{isUpdatingProfile ? "Updating..." : "Update"}
									</button>
								)}
							</div>

							<div className='flex flex-col gap-4 mt-14 px-4'>
								<div className='flex flex-col'>
									<span className='font-bold text-lg'>
										{user?.fullName
											?.split(" ")
											.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
											.join(" ")}
									</span>
									<span className='text-sm text-slate-500'>{user?.username}</span>
									<span className='text-sm my-1'>{user?.bio}</span>
								</div>


								<div className='flex flex-col gap-2'>

									{user?.links && user.links.length > 0 && (
										<div className='flex flex-col gap-2'>
											{/* Render link should display the full URL */}
											{user.links[0] && (
												<div className='flex gap-1 items-center'>
													<FaLink className='w-3 h-3 text-slate-500' />
													<span className='text-sm font-bold text-slate-700'>Render:</span>
													<a href={user.links[0]} target='_blank' rel='noreferrer' className='text-sm text-blue-500 hover:underline break-all'>
														{user.links[0]}
													</a>
												</div>
											)}

											{/* GitHub and LinkedIn should be on the same line with proper icons */}
											{user.links.length > 1 && (
												<div className='flex gap-4 items-center'>
													{user.links[1] && (
														<div className='flex gap-1 items-center'>
															 {/* GitHub icon */}
															<a href={user.links[1]} target='_blank' rel='noreferrer' className='text-sm font-bold text-slate-700 hover:underline'>
																Source Code
															</a>
														</div>
													)}
													{user.links[2] && (
														<div className='flex gap-1 items-center'>
															<FaLinkedin className='w-4 h-4 text-slate-500' /> {/* LinkedIn icon */}
															<a href={user.links[2]} target='_blank' rel='noreferrer' className='text-sm font-bold text-slate-700 hover:underline'>
																LinkedIn
															</a>
														</div>
													)}
												</div>
											)}
										</div>
									)}

									<div className='flex gap-2 items-center'>
										<IoCalendarOutline className='w-4 h-4 text-slate-500' />
										<span className='text-sm text-slate-500'>{memberSinceDate}</span>
									</div>
								</div>

								<div>
									<input onChange={(e) => { setFile(e, target.files[0]) }} type="file" />
									<button onClick={handleUpload}>Upload</button>
								</div>


								<div className='flex gap-2'>
									<div className='flex gap-1 items-center'>
										<span className='font-bold text-xs'>{user?.following.length}</span>
										<span className='text-slate-500 text-xs'>Following</span>
									</div>
									<div className='flex gap-1 items-center'>
										<span className='font-bold text-xs'>{user?.followers.length}</span>
										<span className='text-slate-500 text-xs'>Followers</span>
									</div>
								</div>
							</div>
							<div className='flex w-full border-b border-gray-700 mt-4 justify-center'>
								<div
									className='flex justify-center w-full p-4 text-lg font-extrabold hover:bg-sky-500 transition duration-300 cursor-pointer'
									onClick={() => setFeedType("posts")}
								>
									Posts
								</div>
							</div>

						</>
					)}

					<Posts feedType={feedType} username={username} userId={user?._id} />
				</div>
				<div className='flex flex-col gap-4 mt-14 px-4'>

					{/* Create Post Component */}
					{isMyProfile && <CreatePost />}

					{/* Display User Posts
					<Posts userId={user?._id} /> */}
				</div>

			</div>
		</>
	);
};
export default ProfilePage;
