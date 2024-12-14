// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function YouTubeVideos() {
//     const [videos, setVideos] = useState([]);
//     const API_KEY = "AIzaSyDcTsHci748ZR0kRdX7qK1jGZh9Vnno7g4";

//     useEffect(() => {
//         const fetchVideos = async () => {
//             const response = await axios.get("https://www.googleapis.com/youtube/v3/videos", {
//                 params: {
//                     part: "snippet,statistics",
//                     chart: "mostPopular",
//                     regionCode: "US",
//                     maxResults: 10,
//                     key: API_KEY,
//                 },
//             });
//             setVideos(response.data.items);
//         };

//         fetchVideos();
//     }, []);

//     return (
//         <div className="relative top-[175px] left-[240px] w-full bg-[#0f0f0f] z-[9]">
//             {videos.map((video) => (
//                 <div key={video.id}>
//                     <h3 className="text-xl font-bold text-white">{video.snippet.title}</h3>
//                     <img className="rounded-lg" src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default YouTubeVideos;


import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

function YouTubeVideos() {
    const [videos, setVideos] = useState([]);
    const [nextPageToken, setNextPageToken] = useState(null);
    const [loading, setLoading] = useState(false);
    const observerRef = useRef(null);

    const API_KEY = "AIzaSyDcTsHci748ZR0kRdX7qK1jGZh9Vnno7g4";

    const fetchVideos = async (token = null) => {
        setLoading(true);
        try {
            const response = await axios.get("https://www.googleapis.com/youtube/v3/videos", {
                params: {
                    part: "snippet,statistics",
                    chart: "mostPopular",
                    regionCode: "US",
                    maxResults: 10,
                    pageToken: token,
                    key: API_KEY,
                },
            });
            setVideos((prev) => [...prev, ...response.data.items]);
            setNextPageToken(response.data.nextPageToken);
        } catch (error) {
            console.error("Error fetching videos:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVideos(); // İlk videoları yükle
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && nextPageToken && !loading) {
                fetchVideos(nextPageToken); // Scroll yapıldığında yeni videoları yükle
            }
        });

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => observer.disconnect(); // Cleanup observer
    }, [nextPageToken, loading]);

    return (
        <div className="relative top-[175px] left-[240px] w-full bg-[#0f0f0f] z-[9]">
            {videos.map((video, index) => (
                <div key={index} className="mb-4">
                    <h3 className="text-xl font-bold text-white">{video.snippet.title}</h3>
                    <img
                        src={video.snippet.thumbnails.medium.url} alt={video.snippet.title}
                        className="lazy-load rounded-lg"
                    />
                </div>
            ))}

            {/* Observer için boş bir div */}
            <div ref={observerRef} style={{ height: "50px" }}></div>

            {loading && <p className="text-white text-center">Yükleniyor...</p>}
        </div>
    );
}

export default YouTubeVideos;
