import { CiImageOn } from "react-icons/ci";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import { MdOndemandVideo } from "react-icons/md";
import { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB limit for images/videos

const CreatePost = () => {
	const [text, setText] = useState("");
	const [img, setImg] = useState(null);
	const [video, setVideo] = useState(null);
	const imgRef = useRef(null);
	const videoRef = useRef(null);

	const { data: authUser } = useQuery({ queryKey: ["authUser"] });
	const queryClient = useQueryClient();

	const {
		mutate: createPost,
		isPending,
		isError,
		error,
	} = useMutation({
		mutationFn: async ({ text, img, video }) => {
			if (!text && !img && !video) {
				throw new Error("Post must have text, an image, or a video.");
			}

			const res = await fetch("/api/posts/create", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ text, img, video }),
			});
			const data = await res.json();

			if (!res.ok) throw new Error(data.error || "Something went wrong");
			return data;
		},

		onSuccess: () => {
			setText("");
			setImg(null);
			setVideo(null);
			toast.success("Post created successfully");
			queryClient.invalidateQueries({ queryKey: ["posts"] });
		},
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!text && !img && !video) {
			toast.error("Post must have text, an image, or a video.");
			return;
		}
		createPost({ text, img, video });
	};

	const handleFileChange = (e, type) => {
		const file = e.target.files[0];
		if (!file) return;

		if (file.size > MAX_FILE_SIZE) {
			toast.error("File size must be less than 10MB");
			return;
		}

		const reader = new FileReader();
		reader.onload = () => {
			if (type === "image") {
				setImg(reader.result);
			} else if (type === "video") {
				setVideo(reader.result);
			}
		};
		reader.readAsDataURL(file);
	};

	return (
		<div className='flex p-4 items-start gap-4 border-b border-gray-700'>
			<div className='avatar'>
				<div className='w-8 rounded-full'>
					<img src={authUser?.profileImg || "/avatar-placeholder.png"} alt="User Avatar" />
				</div>
			</div>

			<form className='flex flex-col gap-2 w-full' onSubmit={handleSubmit}>
				<textarea
					className='textarea w-full p-0 text-lg resize-none border-none focus:outline-none border-gray-800'
					placeholder='What is happening?!'
					value={text}
					onChange={(e) => setText(e.target.value)}
				/>

				{/* Image Preview */}
				{img && (
					<div className='relative w-72 mx-auto'>
						<IoCloseSharp
							className='absolute top-0 right-0 text-white bg-gray-800 rounded-full w-5 h-5 cursor-pointer'
							onClick={() => {
								setImg(null);
								imgRef.current.value = null;
							}}
						/>
						<img src={img} alt="Uploaded Preview" className='w-full mx-auto h-72 object-contain rounded' />
					</div>
				)}

				{/* Video Preview */}
				{video && (
					<div className='relative w-72 mx-auto'>
						<IoCloseSharp
							className='absolute top-0 right-0 text-white bg-gray-800 rounded-full w-5 h-5 cursor-pointer'
							onClick={() => {
								setVideo(null);
								videoRef.current.value = null;
							}}
						/>
						<video controls className='w-full mx-auto h-72 object-contain rounded'>
							<source src={video} type='video/mp4' />
							Your browser does not support the video tag.
						</video>
					</div>
				)}

				<div className='flex justify-between border-t py-2 border-t-gray-700'>
					<div className='flex gap-4 items-center'>
						{/* Upload Buttons */}
						<CiImageOn className='fill-primary w-6 h-6 cursor-pointer' onClick={() => imgRef.current.click()} />
						<MdOndemandVideo className='fill-primary w-6 h-6 cursor-pointer' onClick={() => videoRef.current.click()} />
						<BsEmojiSmileFill className='fill-primary w-5 h-5 cursor-pointer' />
					</div>

					{/* Hidden File Inputs */}
					<input type='file' accept='image/*' hidden ref={imgRef} onChange={(e) => handleFileChange(e, "image")} />
					<input type='file' accept='video/*' hidden ref={videoRef} onChange={(e) => handleFileChange(e, "video")} />

					<button className='btn btn-primary rounded-full btn-sm text-white px-4'>
						{isPending ? "Posting..." : "Post"}
					</button>
				</div>

				{isError && <div className='text-red-500'>{error.message}</div>}
			</form>
		</div>
	);
};

export default CreatePost;
