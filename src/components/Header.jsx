import React, { useContext, useState } from 'react';
import { FaBars } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { FaMicrophone } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { MdEmergencyRecording } from "react-icons/md";
// import API_KEY from "../components/YoutubeVideos";
import { SearchContext } from "../context/SearchContext";


function Header() {
    const { setSearchQuery, setVideos } = useContext(SearchContext);
    const [input, setInput] = useState("");
    // const [videos, setVideos] = useState([]);

    const fetchVideos = async (query) => {
        try {
            const response = await fetch(
                `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&type=video&key=AIzaSyDcTsHci748ZR0kRdX7qK1jGZh9Vnno7g4`
            );
            const data = await response.json();
            setVideos(data.items || []);
        } catch (error) {
            console.error("API fetch error:", error);
        }
    };

    const handleSearch = async () => {
        if (!input.trim()) {
            alert("Please enter a valid search term");
            return;
        }
        setSearchQuery(input);  // SearchContext'i güncelliyorsunuz
        await fetchVideos(input);  // Aynı zamanda video verisini buradan çekmelisiniz
    };


    return (
        <div className="flex justify-between items-center h-16 px-4 fixed w-full z-[57] bg-[#0f0f0f]">
            <div className="flex items-center gap-[30px]">
                {/* Logo & Menu */}
                <FaBars color="#fff" size={24} />
                <h1 className="text-white text-lg">MyTube</h1>
            </div>

            {/* Search Bar */}
            <div className="flex items-center w-[640px]">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSearch();
                    }}
                    className="flex w-full h-[40px] bg-[#121212] rounded-full border border-[#303030] overflow-hidden"
                >
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Search"
                        className="w-full bg-transparent text-white px-4 focus:outline-none"
                    />
                    <button
                        type="submit"
                        className="w-[60px] bg-[#303030] flex items-center justify-center text-white"
                    >
                        <CiSearch size={20} />
                    </button>
                </form>
            </div>

            {/* Video List */}
            {/* <div className="mt-4">
                {videos.map(video => (
                    console.log(video)
                    // <div key={video.id.videoId} className="flex items-center mt-4">
                    //     <img
                    //         src={video.snippet.thumbnails.default.url}
                    //         alt={video.snippet.title}
                    //         className="w-[120px] h-[90px] mr-4"
                    //     />
                    //     <div>
                    //         <h3 className="text-white text-sm">{video.snippet.title}</h3>
                    //         <p className="text-gray-400 text-xs">{video.snippet.channelTitle}</p>
                    //     </div>
                    // </div>
                ))}
            </div> */}

            <div className="flex items-center">
                {/* Notifications and User */}
                <MdEmergencyRecording size={24} color="#fff" />
                <IoIosNotifications size={24} color="#fff" className="ml-4" />
                <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center ml-4 text-white">
                    N
                </div>
            </div>
        </div>
    );
}

export default Header;
