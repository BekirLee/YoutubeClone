import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

function YouTubeVideos() {
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
                    part: "snippet,statistics",
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

    const showBar = () => {
        const btnBar = document.querySelector(".btnBar");
        console.log('object')
        if (btnBar.classList.contains("hidden")) {
            btnBar.classList.remove("hidden");
            btnBar.classList.add("block");
        } else {
            btnBar.classList.remove("block");
            btnBar.classList.add("hidden");
        }
    }

    return (
        <div className="relative top-[175px] left-[240px] bg-[#0f0f0f] z-[9] grid grid-cols-3 w-[1130px]">
            {videos.map((video) => (
                <div key={video.id} className="mb-14 mr-[35px]">
                    <Link to={`/videos?id=${video.id}`}>
                        <img
                            src={video.snippet.thumbnails.medium.url}
                            alt={video.snippet.title}
                            className="rounded-lg w-full"
                        />
                    </Link>

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
                                <div className="">

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
                                        <h5 className="text-sm text-gray-300 ">
                                            {(() => {
                                                const publishedDate = new Date(video.snippet.publishedAt);
                                                const today = new Date();
                                                const diffTime = Math.abs(today - publishedDate);
                                                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                                                return `${diffDays} days earlier`;
                                            })()}
                                        </h5>

                                    </div>
                                </div>
                            </Link>
                            <button
                                onClick={showBar}
                                className="absolute w-10 h-10 right-0 top-0 m-auto">
                                <svg
                                    className="w-full"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="#fff"
                                    enableBackground="new 0 0 24 24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    focusable="false"
                                    aria-hidden="true"
                                >
                                    <path d="M12 16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm-1.5-4.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zm0-6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5z"></path>
                                </svg>
                                <div className="btnBar hidden bg-[#212121] top-0 left-0 rounded-lg">
                                    <div className="btnBarItem flex items-center w-[250px] bg-[#212121] ">
                                        {/* <div className="w-[40px] bg-white h-full"></div> */}
                                        <div className="text-white text-center">helli world</div>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>

                </div>
            ))
            }

            {/* Observer için boş bir div */}
            <div ref={observerRef} style={{ height: "50px" }}></div>

            {loading && <p className="text-white text-center">Yükleniyor...</p>}
        </div >
    );
}

export default YouTubeVideos;
