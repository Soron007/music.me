import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Slider from "./Slider";

const MainSection = () => {
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
            <Slider data={trendingAlbums} />
        </div>
    );
}

export default MainSection;
