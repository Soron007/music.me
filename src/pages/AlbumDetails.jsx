import { useParams } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import MusicContext from "../context/MainContext";
import Navbar from "../components/Navbar";
import Player from "../components/Player";

const AlbumDetails = () => {

    const { id } = useParams();
    const { setSongs } = useContext(MusicContext);

    const [album, setAlbum] = useState([]);
    const [image, setImage] = useState([]);

    const getAlbumDetails = async () => {
        const response = await axios.get(`https://saavn.dev/albums?id=${id}`)
        const { data } = await response.data;
        console.log(data)
        setAlbum(data)
        setSongs(data.songs);
        setImage(getImg(data.image));
    }

    const getImg = (img) => (img = img[2].link)


    useEffect(() => {
        getAlbumDetails();
    }, [id])

    return (
        <>

            <Navbar />

            <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-24 h-screen my-48 lg:my-0 mx-2 lg:mx-auto">
                <div className="">
                    <img src={image} alt={album.title} width={250} className="mx-auto mb-4" />
                    <div className="w-[250px] text-gray-600">
                        <h1>{album.name}</h1>
                        <p>By {album.primaryArtist} . {album.songCount}</p>
                    </div>
                </div>



                <div className="">

                </div>
            </div>

            <Player />

        </>
    )
}

export default AlbumDetails
