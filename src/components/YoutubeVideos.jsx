// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";

// function YouTubeVideos() {
//     const [videos, setVideos] = useState([]); // Videolar ve kanal bilgilerini birlikte tutar
//     const [nextPageToken, setNextPageToken] = useState(null); // Sonraki sayfanın tokeni
//     const [loading, setLoading] = useState(false); // Yükleme durumu
//     const observerRef = useRef(null);

//     const API_KEY = "AIzaSyDcTsHci748ZR0kRdX7qK1jGZh9Vnno7g4";

//     const fetchVideosAndChannels = async (pageToken = null) => {
//         setLoading(true);
//         try {
//             const videoResponse = await axios.get("https://www.googleapis.com/youtube/v3/videos", {
//                 params: {
//                     part: "snippet,statistics",
//                     chart: "mostPopular",
//                     regionCode: "TR",
//                     maxResults: 10,
//                     pageToken: pageToken,
//                     key: API_KEY,
//                 },
//             });

//             const videos = videoResponse.data.items;
//             setNextPageToken(videoResponse.data.nextPageToken); // Sonraki tokeni güncelle

//             // Kanal ID'lerini al
//             const channelIds = videos.map((video) => video.snippet.channelId);

//             // Kanal bilgilerini çek
//             const channelResponse = await axios.get("https://www.googleapis.com/youtube/v3/channels", {
//                 params: {
//                     part: "snippet",
//                     id: channelIds.join(","),
//                     key: API_KEY,
//                 },
//             });

//             const channels = channelResponse.data.items.reduce((acc, channel) => {
//                 acc[channel.id] = channel.snippet.thumbnails.default.url; // Avatar URL'lerini map yapısında sakla
//                 return acc;
//             }, {});

//             // Videolara kanal avatarlarını ekle
//             const combinedData = videos.map((video) => ({
//                 ...video,
//                 channelAvatar: channels[video.snippet.channelId],
//             }));

//             setVideos((prev) => [...prev, ...combinedData]); // Yeni videoları ekle
//         } catch (error) {
//             console.error("Error fetching videos or channels:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchVideosAndChannels();
//     }, []);

//     useEffect(() => {
//         const observer = new IntersectionObserver((entries) => {
//             if (entries[0].isIntersecting && nextPageToken && !loading) {
//                 fetchVideosAndChannels(nextPageToken);
//             }
//         });

//         if (observerRef.current) {
//             observer.observe(observerRef.current);
//         }

//         return () => observer.disconnect();
//     }, [nextPageToken, loading]);

//     return (
//         <div className="relative top-[175px] left-[240px] bg-[#0f0f0f] z-[9] grid grid-cols-3 w-[1130px]">
//             {videos.map((video) => (
//                 <div key={video.id} className="mb-4">
//                     <img
//                         src={video.snippet.thumbnails.medium.url}
//                         alt={video.snippet.title}
//                         className="rounded-lg"
//                     />
//                     <div className="content flex items-center mt-2">
//                         <div className="avatar w-[40px] h-[40px] mr-2">
//                             {video.channelAvatar ? (
//                                 <img
//                                     src={video.channelAvatar}
//                                     alt={video.snippet.channelTitle}
//                                     className="rounded-full"
//                                 />
//                             ) : (
//                                 <p className="text-white">Loading...</p>
//                             )}
//                         </div>
//                         <h3 className="text-xl font-bold text-white">{video.snippet.title}</h3>
//                     </div>
//                 </div>
//             ))}

//             {/* Observer için boş bir div */}
//             <div ref={observerRef} style={{ height: "50px" }}></div>

//             {loading && <p className="text-white text-center">Yükleniyor...</p>}
//         </div>
//     );
// }

// export default YouTubeVideos;

import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'

function YoutubeVideos() {

    const [videos, setVideos] = useState([]);
    const [nextPageToken, setNextPageToken] = useState(null);
    const [loading, setLoading] = useState(false);
    const API_KEY = "AIzaSyDcTsHci748ZR0kRdX7qK1jGZh9Vnno7g4";
    const observerRef = useRef(null);




    const fetchVideosAndChannels = async (pageToken = '') => {

        try {
            setLoading(true);
            const videosResponse = await axios.get("https://www.googleapis.com/youtube/v3/videos", {
                params: {
                    part: "snippet,statistics",
                    chart: "mostPopular",
                    regionCode: "AZ",
                    maxResults: 10,
                    key: API_KEY,
                    pageToken: pageToken
                },
            });

            const videos = videosResponse.data.items;
            const channelIds = videos.map((video) => video.snippet.channelId);

            setNextPageToken(videosResponse.data.nextPageToken)
            // setVideos((prev) => [...prev, ...videos])

            const channelResponse = await axios.get("https://www.googleapis.com/youtube/v3/channels", {
                params: {
                    part: "snippet",
                    id: channelIds.join(","),
                    key: API_KEY,
                },
            });

            const channels = channelResponse.data.items.reduce((acc, channel) => {
                acc[channel.id] = channel.snippet.thumbnails.default.url;
                return acc;
            }, {});

            const combinedData = videos.map((video) => ({
                ...video,
                channelAvatar: channels[video.snippet.channelId],
            }));

            setVideos((prev) => [...prev, ...combinedData]); // Yeni videoları ekle

        }

        catch (error) {
            console.error("Error fetching videos or channels:", error);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchVideosAndChannels();
    }, [])

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && nextPageToken && !loading) {
                fetchVideosAndChannels(nextPageToken)


            }
        })
        if (observerRef.current) {
            observer.observe(observerRef.current)
        }

        return () => observer.disconnect()
    }, [nextPageToken, loading])



    return (
        <div className="relative top-[175px] left-[240px] bg-[#0f0f0f] z-[9] grid grid-cols-3 w-[1130px]">
            {videos.map((video) => (
                <div key={video.id} className="mb-4">
                    <img
                        src={video.snippet.thumbnails.medium.url}
                        alt={video.snippet.title}
                        className="rounded-lg"
                    />
                    <div className="content flex items-center mt-2">
                        <div className="avatar w-[40px] h-[40px] mr-2">
                            {video.channelAvatar ? (
                                <img
                                    src={video.channelAvatar}
                                    alt={video.snippet.channelTitle}
                                    className="rounded-full"
                                />
                            ) : (
                                <p className="text-white">Loading...</p>
                            )}
                        </div>
                        <h3 className="text-xl font-bold text-white">{video.snippet.title}</h3>
                    </div>
                </div>
            ))}

            {/* Observer için boş bir div */}
            <div ref={observerRef} style={{ height: "50px" }}></div>

            {loading && <p className="text-white text-center">Yükleniyor...</p>}
        </div>

    )
}

export default YoutubeVideos

