import React, { useEffect, useState } from "react";
import axios from "axios";

function YouTubeVideos() {
    const [videos, setVideos] = useState([]);
    const API_KEY = "AIzaSyDcTsHci748ZR0kRdX7qK1jGZh9Vnno7g4";

    useEffect(() => {
        const fetchVideos = async () => {
            const response = await axios.get("https://www.googleapis.com/youtube/v3/videos", {
                params: {
                    part: "snippet,statistics",
                    chart: "mostPopular",
                    regionCode: "US",
                    maxResults: 10,
                    key: API_KEY,
                },
            });
            setVideos(response.data.items);
        };

        fetchVideos();
    }, []);

    return (
        <div className="relative top-[175px] left-[240px] w-full bg-[#0f0f0f] z-[9]">
            {videos.map((video) => (
                <div key={video.id}>
                    <h3 className="text-xl font-bold text-white">{video.snippet.title}</h3>
                    <img className="rounded-lg" src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
                </div>
            ))}
        </div>
    );
}

export default YouTubeVideos;
