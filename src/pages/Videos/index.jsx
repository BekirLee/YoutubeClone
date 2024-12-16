import React from 'react'
import Header from '../../components/Header'
import { useSearchParams } from 'react-router-dom';

function Videos() {
    const [searchParams] = useSearchParams();
    const videoId = searchParams.get('id'); // Query parametresinden videoId'yi al
    console.log(videoId)

    return (
        <div className="container">
            { 
                <Header />
            }
            < div className="w-full max-w-4xl aspect-video" >
                {/* YouTube Embed Oynatıcı */}
                < iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videoId}`
                    }
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe >
            </div>
        </div >
    );
}
export default Videos
