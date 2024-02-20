import { GoPlay } from 'react-icons/go'

const SongList = ({ name, primaryArtists, duration, downloadUrl, image, id }) => {

    const formatDuration = (durationSeconds) => {
        const seconds = parseInt(durationSeconds, 10);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');

        return `${formattedMinutes}: ${formattedSeconds}`
    }

    return (
        <div className='flex justify-between items-center w-[80vw] lg:w-[40vw] mb-2 lg:mb-1 p-1 px-3 hover:bg-white hover:shadow-md cursor-pointer'>
            <GoPlay className='text-3xl text-gray-500 hover:text-gray-700 transition-all ease-in-out duration-300 cursor pointer' />

            <div className='flex flex-col'>
                <span className='text-center font-bold'>{name.length > 20 ? name.slice(0, 20) + "..." : name}</span>
                <span className='text-sm text-center font-extralight'>{primaryArtists.length > 20 ? primaryArtists.slice(0, 20) + "..." : primaryArtists}</span>
            </div>

            <div>
                <span>{formatDuration(duration)}</span>
            </div>
        </div>
    )
}

export default SongList
