import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'

import { Link } from 'react-router-dom';

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

    const formatViewCount = (number) => {
        if (number >= 1_000_000_000) {
            return (number / 1_000_000_000).toFixed(1) + "B";
        }
        if (number >= 1_000_000) {
            return (number / 1_000_000).toFixed(1) + "M";
        }
        if (number >= 1_000) {
            return (number / 1_000).toFixed(1) + "K";
        }
        return number.toString();
    };

    const parseDuration = (duration) => {
        const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
        const hours = (match[1] || "").replace("H", "") || "0";
        const minutes = (match[2] || "").replace("M", "") || "0";
        const seconds = (match[3] || "").replace("S", "") || "0";

        return `${hours !== "0" ? hours + ":" : ""}${minutes.padStart(2, "0")
            }:${seconds.padStart(2, "0")}`;
    };

    const publishedAt = (videoPublishedAt) => {
        const publishedDate = new Date(videoPublishedAt);
        const now = new Date();
        const elapsed = Math.floor((now - publishedDate) / 1000);

        if (elapsed < 60) {
            return `${elapsed} seconds ago`;
        } else if (elapsed < 3600) {
            return `${Math.floor(elapsed / 60)} minutes ago`;
        } else if (elapsed < 86400) {
            return `${Math.floor(elapsed / 3600)} hours ago`;
        } else if (elapsed < 2592000) {
            return `${Math.floor(elapsed / 86400)} days ago`;
        } else if (elapsed < 31536000) {
            return `${Math.floor(elapsed / 2592000)} months ago`;
        } else {
            return `${Math.floor(elapsed / 31536000)} years ago`;
        }
    };
    return (
        <div className='w-[426px] mt-[6rem] mb-auto'>
            {videos.map((video) => (
                <div className="flex mb-6 relative">
                    {
                        <img
                            src={video.snippet.thumbnails.medium.url}
                            alt={video.snippet.title}
                            className="rounded-lg w-[198px] h-[114px]"
                        />
                    }
                    <div className="absolute text-white bg-[#0000008f] rounded-lg p-0.5 bottom-[5px] right-[235px] text-[14px]">
                        {parseDuration(video.contentDetails.duration)}
                    </div>
                    {
                        <div className="">
                            <Link to={`/videos?id=${video.id}`}>
                                <div className='pl-1 w-[215px]'>
                                    <h3 className="text-white h-11 font-roboto overflow-hidden block text-[15px] font-bold">
                                        {video.snippet.title.length > 50
                                            ? video.snippet.title.slice(0, 50) + "..."
                                            : video.snippet.title}
                                    </h3>
                                    <h5 className="text-sm text-gray-300 pt-1.5 whitespace-nowrap">
                                        <Link to={`/channel?id=${video.snippet.channelId}`}>
                                            {video.snippet.channelTitle}
                                        </Link>
                                    </h5>
                                    <div className="flex gap-2 pt-1.5">
                                        <h5 className="text-sm text-gray-300 ">
                                            {formatViewCount(video.statistics.viewCount.toLocaleString())} Views
                                        </h5>
                                        <h5 className="text-sm text-gray-300 ">
                                            {
                                                publishedAt(video.snippet.publishedAt)
                                            }
                                        </h5>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    }

                </div>
            ))}
        </div>
    )
}

export default ScrolableVideos
