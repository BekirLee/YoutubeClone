import React, { useEffect, useState } from "react";
import axios from "axios";

function YouTubeVideos() {
    const [videos, setVideos] = useState([]);
    const [channelAvatars, setChannelAvatars] = useState({}); // Kanal avatarlarını tutar
    const API_KEY = "AIzaSyDcTsHci748ZR0kRdX7qK1jGZh9Vnno7g4";

    const fetchVideos = async () => {
        try {
            const response = await axios.get("https://www.googleapis.com/youtube/v3/videos", {
                params: {
                    part: "snippet,statistics",
                    chart: "mostPopular",
                    regionCode: "TR",
                    maxResults: 10,
                    key: API_KEY,
                },
            });

            setVideos(response.data.items);

            // Kanal avatarlarını toplu çekmek için kanal ID'lerini al
            const channelIds = response.data.items.map((video) => video.snippet.channelId);
            fetchChannelAvatars(channelIds);
        } catch (error) {
            console.error("Error fetching videos:", error);
        }
    };

    const fetchChannelAvatars = async (channelIds) => {
        try {
            const response = await axios.get("https://www.googleapis.com/youtube/v3/channels", {
                params: {
                    part: "snippet",
                    id: channelIds.join(","), // Kanal ID'lerini virgülle ayırarak gönder
                    key: API_KEY,
                },
            });

            // Avatar URL'lerini sakla
            const avatars = {};
            response.data.items.forEach((channel) => {
                avatars[channel.id] = channel.snippet.thumbnails.default.url; // Avatar URL
            });
            setChannelAvatars(avatars);
        } catch (error) {
            console.error("Error fetching channel avatars:", error);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    return (
        <div className="relative top-[175px] left-[240px] bg-[#0f0f0f] z-[9] grid grid-cols-3 w-[1130px]">
            {videos.map((video) => (
                <div key={video.id} className="mb-4">
                    <img
                        src={video.snippet.thumbnails.medium.url}
                        alt={video.snippet.title}
                        className="rounded-lg"
                    />
                    <div className="content flex">

                        <div className="avatar w-[40px] h-[40px]">
                            {channelAvatars[video.snippet.channelId] ? (
                                <img
                                    src={channelAvatars[video.snippet.channelId]}
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
        </div>
    );
}

export default YouTubeVideos;
