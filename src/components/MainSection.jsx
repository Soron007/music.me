import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Slider from "./Slider";


const MainSection = ({ Navbar }) => {
    const [albums, setAlbums] = useState([]);
    const [trending, setTrending] = useState([]);

    const getHomePageData = async () => {
        try {
            const response = await axios.get("https://saavn.dev/modules?language=hindi,english");
            const { data } = response.data;
            setAlbums(data.albums);
            setTrending(data.trending);

        } catch (error) {
            console.error("Error fetching data:", error);

        }
    }

    useEffect(() => {
        getHomePageData();
    }, []);

    const trendingAlbums = useMemo(() => (Array.isArray(trending.albums) ? trending.albums : []), [trending.albums]);


    return (
        <div>
            <Navbar />
            <section className="lg:my-28 my-[12rem]">
                <h2 className="text-xl px-5 py-3 font-semibold text-gray-700 w-full lg:w-[88vw] mx-auto">Trending Now</h2>
                <Slider data={trendingAlbums} />
                <h2 className="text-xl px-5 py-3 font-semibold text-gray-700 w-full lg:w-[88vw] mx-auto">Top Albums</h2>
                <Slider data={albums} />
            </section>

        </div>
    );
}

export default MainSection;
