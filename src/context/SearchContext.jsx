import React, { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState("");  // Arama sorgusu
    const [videosSearch, setVideos] = useState([]);  // Video verisi

    return (
        <SearchContext.Provider value={{ searchQuery, setSearchQuery, videosSearch, setVideos }}>
            {children}
        </SearchContext.Provider>
    );
};
