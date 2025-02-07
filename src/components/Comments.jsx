import axios from 'axios';
import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';

const apikey = import.meta.env.VITE_API_KEY;

const fetchComments = async () => {
    const [searchParams] = useSearchParams();
    const videoId = searchParams.get('id'); // Query parametresinden videoId'yi al


    try {
        const commentsFetch = await axios.get(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${apikey}&maxResults=10`)
        const comments = commentsFetch.data.items
        console.log(comments)
    }
    catch {
        // console.error("Error fetching videos or channels:", error);
    }
}

useEffect(
    () => {
        fetchComments()

    }, [])


function Comments() {
    return (
        <div>

        </div>
    )
}

export default Comments
