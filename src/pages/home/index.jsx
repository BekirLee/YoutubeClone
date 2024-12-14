import Chips from "../../components/Chips";
import Guide from "../../components/Guide";
import Header from "../../components/Header";
import YouTubeVideos from "../../components/YoutubeVideos";

export default function Home() {
    return (
        <div className="bg-[#0f0f0f] w-full h-full">
            {/* Home */}
            <div className="fixed z-50 w-full bg-transparent">
                <Header />
                <Guide />
                <Chips />
            </div>
            <div className="pl-8">
                <YouTubeVideos />
            </div>
        </div>
    )
}