import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const AlbumDetails = () => {

    const { id } = useParams();


    const getAlbumDetails = async () => {
        const response = await axios.get(`https://saavn.dev/albums?id=${id}`)
        const { data } = await response.data;
        console.log(data);
    }

    useEffect(() => {
        getAlbumDetails();
    }, [id])

    return (
        <div>
            {id}
        </div>
    )
}

export default AlbumDetails
