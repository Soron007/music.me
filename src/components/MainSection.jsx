import { useEffect, useState } from "react";
import axios from "axios";
import AlbumItem from "./AlbumItem";

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

    return (
        <div className="mt-40">
            {albums?.map((album) => <AlbumItem key={album.id} {...album} />)}
        </div>
    );
}

export default MainSection;
