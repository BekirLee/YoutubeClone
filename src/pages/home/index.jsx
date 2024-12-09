import Chips from "../../components/Chips";
import Guide from "../../components/Guide";
import Header from "../../components/Header";

export default function Home() {
    return (
        <div className="bg-[#0f0f0f]  ">
            {/* Home */}
            <div className="fixed bg-[#0f0f0f] w-full h-full  z-10">
                <Header />
                <Guide />
                <Chips />
            </div>
        </div>
    )
}