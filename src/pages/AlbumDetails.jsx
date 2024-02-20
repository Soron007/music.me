import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import MusicContext from "../context/MainContext";
import Navbar from "../components/Navbar";
import Player from "../components/Player";
import SongList from "../components/SongList";
import { IoMdArrowRoundBack } from "react-icons/io";

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
            <Link to={"/"}><button className="top-52 lg:top-28 left-5 lg:left-10 p-2 shadow-md border rounded-md mt-8 lg:sticky absolute"><IoMdArrowRoundBack /></button></Link>
            <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-24 h-screen my-48 lg:my-0 mx-2 lg:mx-auto">

                <div>
                    <img src={image} alt={album.title} width={250} className="mx-auto mb-4 rounded-full" />
                    <div className="w-[250px] text-gray-600">
                        <h1 className="font-extrabold">{album.name}</h1>
                        <p className="font-light">By {album.primaryArtists} . {album.songCount} songs</p>
                    </div>
                </div>



                <div>
                    {album.songs?.map((song) => (

                        <SongList key={song.id}  {...song} />


                    ))}

                </div>
            </div>

            <Player />

        </>
    )
}

export default AlbumDetails
