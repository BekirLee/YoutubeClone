import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

function YouTubeVideos() {
    const [videos, setVideos] = useState([]);
    const [nextPageToken, setNextPageToken] = useState(null);
    const [loading, setLoading] = useState(false);
    const observerRef = useRef(null);

    const API_KEY = "AIzaSyDcTsHci748ZR0kRdX7qK1jGZh9Vnno7g4"; // API Key'i buraya yazın.

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
        fetchVideosAndChannels();
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

    return (
        <div className="relative top-[175px] left-[240px] bg-[#0f0f0f] z-[9] grid grid-cols-3 w-[1130px]">
            {videos.map((video) => (
                <div key={video.id} className="mb-14 mr-[35px] relative group">
                    <Link to={`/videos?id=${video.id}`}>
                        <img
                            src={video.snippet.thumbnails.medium.url}
                            alt={video.snippet.title}
                            className="rounded-lg w-full"
                        />
                    </Link>
                    {/* Hover Edildiğinde Gözükecek Video Önizlemesi
                    <div className="absolute top-0 left-0 w-full h-full hidden group-hover:flex justify-center items-center">
                        <iframe
                            className="rounded-lg"
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1&controls=0`}
                            title={video.snippet.title}
                            frameBorder="0"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                        ></iframe>
                    </div> */}

                    <iframe
                        src={`https://www.youtube.com/embed/${video.id}`}
                        frameborder="0"
                        allow="autoplay; encrypted-media; fullscreen"
                        allowfullscreen
                    ></iframe>
                    <div className="content flex items-center mt-2 h-24">
                        <div className="avatar w-[40px] h-[40px] mr-2 mb-[50px]">
                            {video.channelAvatar ? (
                                <Link to={`/channel?id=${video.snippet.channelId}`}>
                                    <img
                                        src={video.channelAvatar}
                                        alt={video.snippet.channelTitle}
                                        className="rounded-full w-full"
                                    />
                                </Link>
                            ) : (
                                <p className="text-white">Loading...</p>
                            )}
                        </div>
                        <div className="contentInfo flex w-full justify-between relative">
                            <Link to={`/videos?id=${video.id}`}>
                                <div>
                                    <h3 className="text-white h-11">
                                        <span className="font-roboto overflow-hidden block">
                                            {video.snippet.title.length > 50
                                                ? video.snippet.title.slice(0, 50) + "..."
                                                : video.snippet.title}
                                        </span>
                                    </h3>
                                    <h5 className="text-sm text-gray-300 pt-1.5">
                                        <Link to={`/channel?id=${video.snippet.channelId}`}>
                                            {video.snippet.channelTitle}
                                        </Link>
                                    </h5>
                                    <div className="flex gap-2 pt-1.5">
                                        <h5 className="text-sm text-gray-300 ">
                                            {formatViewCount(video.statistics.viewCount.toLocaleString())} Views
                                        </h5>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
            <div ref={observerRef} style={{ height: "50px" }}></div>
            {loading && <p className="text-white text-center">Yükleniyor...</p>}
        </div>
    );
}

export default YouTubeVideos;
