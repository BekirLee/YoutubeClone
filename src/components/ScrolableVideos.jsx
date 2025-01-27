import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'

function ScrolableVideos() {
    const [videos, setVideos] = useState([]);
    const [nextPageToken, setNextPageToken] = useState(null);
    const [loading, setLoading] = useState(false);
    const observerRef = useRef(null);


    const API_KEY = "AIzaSyDcTsHci748ZR0kRdX7qK1jGZh9Vnno7g4";

    const fetchVideosAndChannels = async (pageToken = null) => {
        setLoading(true);
        try {
            const videoResponse = await axios.get("https://www.googleapis.com/youtube/v3/videos", {
                params: {
                    part: "snippet,statistics,contentDetails",
                    chart: "mostPopular",
                    regionCode: "TR",
                    maxResults: 10,
                    pageToken: pageToken,
                    key: API_KEY,
                },
            });

            const videos = videoResponse.data.items;
            setNextPageToken(videoResponse.data.nextPageToken);

            const channelIds = videos.map((video) => video.snippet.channelId);

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

            setVideos((prev) => [...prev, ...combinedData]);
        } catch (error) {
            console.error("Error fetching videos or channels:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        // console.log(searchQuery)
        // if (se) { }
        fetchVideosAndChannels(); // Yeni arama yap
    }, []);
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && nextPageToken && !loading) {
                fetchVideosAndChannels(nextPageToken);
            }
        });

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => observer.disconnect();
    }, [nextPageToken, loading]);
    return (
        <div className='w-full'>
            {videos.map((video) => (
                <div className="w-full">
                    {
                        <img
                            src={video.snippet.thumbnails.medium.url}
                            alt={video.snippet.title}
                            className="rounded-lg w-[168px] h-[94px]"
                        />
                    }
                </div>
            ))}
        </div>
    )
}

export default ScrolableVideos
