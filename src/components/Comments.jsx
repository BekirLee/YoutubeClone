// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { useSearchParams } from 'react-router-dom';



// function Comments() {
//     const apikey = import.meta.env.VITE_API_KEY;

//     const [searchParams] = useSearchParams();
//     const videoId = searchParams.get('id'); // Query parametresinden videoId'yi al
//     const [comments, setComments] = useState(null)

//     const fetchComments = async () => {

//         const res = await axios.get(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${apikey}&maxResults=10`);
//         const resCommentsAll = await axios.get(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${apikey}`);

//         console.log('comments', res)
//         console.log('comments all', resCommentsAll)
//         setComments(res?.data?.items);
//         console.log(comments)
//         // setVideoData(res.data.items[0])
//         // setChannelId(res.data.items[0].snippet.channelId)
//     }

//     const channelAndUserFetch = () => {

//     }

//     useEffect(
//         () => {
//             fetchComments();
//         }, [])

//     const publishedAt = (videoPublishedAt) => {
//         const publishedDate = new Date(videoPublishedAt);
//         const now = new Date();
//         const elapsed = Math.floor((now - publishedDate) / 1000);

//         if (elapsed < 60) {
//             return `${elapsed} seconds ago`;
//         } else if (elapsed < 3600) {
//             return `${Math.floor(elapsed / 60)} minutes ago`;
//         } else if (elapsed < 86400) {
//             return `${Math.floor(elapsed / 3600)} hours ago`;
//         } else if (elapsed < 2592000) {
//             return `${Math.floor(elapsed / 86400)} days ago`;
//         } else if (elapsed < 31536000) {
//             return `${Math.floor(elapsed / 2592000)} months ago`;
//         } else {
//             return `${Math.floor(elapsed / 31536000)} years ago`;
//         }
//     };
//     return (

//         <div className="comments">
//             {
//                 comments && comments.map((comment, index) => (
//                     // {console.log(object)}
//                     <div className='flex mb-4'>
//                         <img
//                             src={comment.snippet?.topLevelComment?.snippet?.authorProfileImageUrl}
//                             width={40} height={40}
//                             alt="profile"
//                             className="rounded-full h-max mr-4"
//                         />
//                         <div className=" bg-transparent">
//                             {/* {console.log()} */}

//                             <div className="text-white mb-3 flex">
//                                 {comment?.snippet?.topLevelComment?.snippet?.authorDisplayName}
//                                 <span className='text-[#d1d5db8c] text-[13px] mb-auto mt-auto ml-2'>
//                                     {publishedAt(comment?.snippet?.topLevelComment?.snippet?.publishedAt)}
//                                 </span>
//                             </div>

//                             <p className='text-white mb-3'>{comment?.snippet?.topLevelComment?.snippet?.textOriginal}</p>
//                         </div>
//                     </div>
//                 ))
//             }
//         </div>
//     )
// }

// export default Comments


import axios from "axios";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { BiSolidLike } from "react-icons/bi";
import { AiOutlineLike, AiFillDislike, AiOutlineDislike } from "react-icons/ai";



function Comments() {
    const apikey = import.meta.env.VITE_API_KEY;
    const [searchParams] = useSearchParams();
    const videoId = searchParams.get("id");

    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);

    const [comments, setComments] = useState([]);
    const [nextPageToken, setNextPageToken] = useState(null);
    const [loading, setLoading] = useState(false);
    const observer = useRef();

    const fetchComments = async (pageToken = "") => {
        if (loading) return;
        setLoading(true);

        try {
            const res = await axios.get(
                `https://www.googleapis.com/youtube/v3/commentThreads`, {
                params: {
                    part: "snippet",
                    videoId: videoId,
                    key: apikey,
                    maxResults: 10,
                    pageToken: pageToken
                }
            }
            );

            setComments(prev => [...prev, ...res.data.items]);
            setNextPageToken(res.data.nextPageToken);
        } catch (error) {
            console.error("Comments error fetch", error);
        } finally {
            setLoading(false);
        }
    };

    const likeClick = () => {
        if (liked == 0) {
            setLiked(true)
        }
        else if (liked == 1) {
            setLiked(false)
        }
    }

    const dislikeClick = () => {
        if (disliked == 0) {
            setDisliked(true)
        }
        else if (disliked == 1) {
            setDisliked(false)
        }
    }

    useEffect(() => {
        if (videoId) fetchComments();
    }, [videoId]);

    const lastCommentRef = useCallback((node) => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && nextPageToken) {
                fetchComments(nextPageToken);
            }
        });

        if (node) observer.current.observe(node);
    }, [loading, nextPageToken]);

    const publishedAt = (videoPublishedAt) => {
        const publishedDate = new Date(videoPublishedAt);
        const now = new Date();
        const elapsed = Math.floor((now - publishedDate) / 1000);

        if (elapsed < 60) return `${elapsed} seconds ago`;
        if (elapsed < 3600) return `${Math.floor(elapsed / 60)} minutes ago`;
        if (elapsed < 86400) return `${Math.floor(elapsed / 3600)} hours ago`;
        if (elapsed < 2592000) return `${Math.floor(elapsed / 86400)} days ago`;
        if (elapsed < 31536000) return `${Math.floor(elapsed / 2592000)} months ago`;
        return `${Math.floor(elapsed / 31536000)} years ago`;
    };

    return (
        <div className="comments">
            {comments.map((comment, index) => (
                <>
                    <div key={comment.id} ref={index === comments.length - 1 ? lastCommentRef : null} className="flex">
                        <img
                            src={comment.snippet?.topLevelComment?.snippet?.authorProfileImageUrl}
                            width={40} height={40}
                            alt="profile"
                            className="rounded-full h-max mr-4"
                        />
                        <div className="bg-transparent">
                            <div className="text-white mb-3 flex">
                                {comment?.snippet?.topLevelComment?.snippet?.authorDisplayName}
                                <span className="text-[#d1d5db8c] text-[13px] mb-auto mt-auto ml-2">
                                    {publishedAt(comment?.snippet?.topLevelComment?.snippet?.publishedAt)}
                                </span>
                            </div>
                            <p className="text-white mb-3">{comment?.snippet?.topLevelComment?.snippet?.textOriginal}</p>
                        </div>
                    </div>

                    <div className="flex mb-4">
                        <div className="empty w-14 h-10"></div>
                        <div className="commentsEmotions flex gap-3">
                            <div className="likeComment">
                                <button className='like hover:bg-[#fff3] w-full pl-5 pr-2 rounded-l-full flex items-center'
                                    onClick={likeClick}>
                                    {
                                        liked
                                            ?
                                            <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" fill="#fff"><path d="M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6 C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3 c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z"></path></svg>

                                            // <AiOutlineLike style={{ width: "25px", height: "25px" }} />
                                            :
                                            <BiSolidLike key={index} style={{ width: "25px", height: "25px" }} />
                                    }

                                    {/* {formatViewCount(likes)} */}
                                </button>
                                {/* <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" fill="#fff"><path d="M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6 C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3 c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z"></path></svg> */}
                            </div>
                            <div className="disLikeComment">
                                <button className='dislike hover:bg-[#fff3] w-full pl-5 rounded-r-full'
                                    onClick={dislikeClick}>
                                    {
                                        disliked
                                            ?
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" fill="#fff"><path d="M17,4h-1H6.57C5.5,4,4.59,4.67,4.38,5.61l-1.34,6C2.77,12.85,3.82,14,5.23,14h4.23l-1.52,4.94C7.62,19.97,8.46,21,9.62,21 c0.58,0,1.14-0.24,1.52-0.65L17,14h4V4H17z M10.4,19.67C10.21,19.88,9.92,20,9.62,20c-0.26,0-0.5-0.11-0.63-0.3 c-0.07-0.1-0.15-0.26-0.09-0.47l1.52-4.94l0.4-1.29H9.46H5.23c-0.41,0-0.8-0.17-1.03-0.46c-0.12-0.15-0.25-0.4-0.18-0.72l1.34-6 C5.46,5.35,5.97,5,6.57,5H16v8.61L10.4,19.67z M20,13h-3V5h3V13z"></path></svg>

                                            // <AiOutlineDislike style={{ width: "25px", height: "25px" }} />
                                            :
                                            <AiFillDislike style={{ width: "25px", height: "25px" }} />
                                    }
                                </button>
                                {/* <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" fill="#fff"><path d="M17,4h-1H6.57C5.5,4,4.59,4.67,4.38,5.61l-1.34,6C2.77,12.85,3.82,14,5.23,14h4.23l-1.52,4.94C7.62,19.97,8.46,21,9.62,21 c0.58,0,1.14-0.24,1.52-0.65L17,14h4V4H17z M10.4,19.67C10.21,19.88,9.92,20,9.62,20c-0.26,0-0.5-0.11-0.63-0.3 c-0.07-0.1-0.15-0.26-0.09-0.47l1.52-4.94l0.4-1.29H9.46H5.23c-0.41,0-0.8-0.17-1.03-0.46c-0.12-0.15-0.25-0.4-0.18-0.72l1.34-6 C5.46,5.35,5.97,5,6.57,5H16v8.61L10.4,19.67z M20,13h-3V5h3V13z"></path></svg> */}
                            </div>
                        </div>
                    </div>
                </>
            ))}
            {loading && <p className="text-white text-center">Loading...</p>}
        </div>
    );
}

export default Comments;
