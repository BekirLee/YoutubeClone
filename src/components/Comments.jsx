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

function Comments() {
    const apikey = import.meta.env.VITE_API_KEY;
    const [searchParams] = useSearchParams();
    const videoId = searchParams.get("id");

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
            console.error("Yorumları çekerken hata oluştu:", error);
        } finally {
            setLoading(false);
        }
    };

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
                <div key={comment.id} ref={index === comments.length - 1 ? lastCommentRef : null} className="flex mb-4">
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
            ))}
            {loading && <p className="text-white text-center">Loading...</p>}
        </div>
    );
}

export default Comments;
