import { BiRepeat } from "react-icons/bi";
import { IoMdSkipBackward, IoMdSkipForward } from "react-icons/io";
import { PiShuffleBold } from "react-icons/pi";
import { FaPlay, FaPause } from "react-icons/fa";
import { HiSpeakerWave } from "react-icons/hi2";
import { LuHardDriveDownload } from "react-icons/lu";
import { useState, useContext, useEffect, useRef } from "react";
import VolumeController from "./VolumeController";
import MusicContext from "../context/MainContext";

const Player = () => {
    const [isVolumeVisible, setIsVolumeVisible] = useState(false);
    const { currentSong, playMusic, isPlaying, nextSong, prevSong } =
        useContext(MusicContext);

    const inputRef = useRef();
    const spanRef = useRef()

    const convertTime = (duration) => {
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };


    //     if (currentSong) {
    //         const audioElement = currentSong.audio;

    //         const handleTimeUpdate = () => {
    //             const duration = Number(currentSong.duration);
    //             const currentTime = audioElement.currentTime;
    //             const newTiming = (currentTime / duration) * 100;
    //             inputRef.current.value = newTiming;
    //         };

    //         const handleSongEnd = () => nextSong();

    //         audioElement.addEventListener("timeupdate", handleTimeUpdate);
    //         audioElement.addEventListener("ended", handleSongEnd);

    //         return () => {
    //             audioElement.removeEventListener("timeupdate", handleTimeUpdate);
    //             audioElement.addEventListener("ended", handleSongEnd);
    //         };
    //     }
    // }, [currentSong]);

    // const handleProgressChange = (event) => {
    //     const newPercentage = parseFloat(event.target.value);
    //     const newTime = (newPercentage / 100) * Number(currentSong.duration);
    //     if (newTime >= 0) {
    //         currentSong.audio.currentTime = newTime;
    //     }
    // };

    useEffect(() => {
        if (currentSong) {
            const audioElement = currentSong.audio;

            const handleTimeUpdate = () => {
                const duration = Number(currentSong.duration);
                const currentTime = Math.floor(audioElement.currentTime);

                const newTime = (currentTime / duration) * 100;
                const remainingTime = duration - currentTime;
                inputRef.current.value = newTime;
                spanRef.current.innerText = convertTime(remainingTime)
            };


            const handleSongEnd = () => {
                nextSong();
            }

            audioElement.addEventListener("timeupdate", handleTimeUpdate)

            audioElement.addEventListener("ended", handleSongEnd)
            return () => {
                audioElement.removeEventListener("timeupdate", handleTimeUpdate)
                audioElement.removeEventListener("ended", handleSongEnd)

            }
        }
    }, [currentSong])

    const handleProgressChange = (event) => {
        const newPercentage = parseFloat(event.target.value);
        const newTime = (newPercentage / 100) * Number(currentSong.duration);
        if (newTime >= 0) {
            currentSong.audio.currentTime = newTime;
        }


    }


    //     try {
    //         const res = await fetch(url);
    //         const blob = await res.blob();

    //         const link = document.createElement("a");
    //         link.href = URL.createObjectURL(blob);
    //         link.download = `${currentSong.name}.mp3`;

    //         document.body.appendChild(link);
    //         link.click();

    //         document.body.removeChild(link);
    //     } catch (error) {
    //         console.log("Error fetching or downloading files", error);
    //     }
    // };

    return (
        <div className="fixed bottom-0 right-0 left-0 bg-green-400 flex flex-col">
            <input
                type="range"
                name="progress"
                id="progress"
                min={0}
                max={100}
                step="0.1"
                value={0}
                ref={inputRef}
                onChange={handleProgressChange}
                className="w-full h-[5px] text-green-400 range"
            />
            <div className="flex justify-between items-center mb-3 px-3">
                {/* 1st div */}
                <div className="flex justify-start items-center gap-3 lg:w-[30vw]">
                    <img
                        src={currentSong?.image}
                        alt=""
                        width={55}
                        className="rounded-lg"
                    />
                    <div className="hidden lg:block">
                        <span>{currentSong?.name}</span>
                        <p className="text-xs text-gray-500">
                            {currentSong?.primaryArtists}
                        </p>
                    </div>
                </div>

                {/* 2nd div */}
                <div className="flex text-2xl lg:text-3xl gap-4 lg:gap-6 lg:w-[40vw] justify-center">
                    <BiRepeat className="text-gray-400 cursor-pointer" />
                    <IoMdSkipBackward
                        onClick={prevSong}
                        className="text-gray-700 hover:text-gray-500 cursor-pointer"
                    />
                    {isPlaying ? (
                        <FaPause
                            className="text-gray-700 hover:text-gray-500 cursor-pointer"
                            onClick={() =>
                                playMusic(
                                    currentSong?.audio,
                                    currentSong.name,
                                    currentSong.duration,
                                    currentSong.image,
                                    currentSong.id
                                )
                            }
                        />
                    ) : (
                        <FaPlay
                            className="text-gray-700 hover:text-gray-500 cursor-pointer"
                            onClick={() =>
                                playMusic(
                                    currentSong.audio,
                                    currentSong.name,
                                    currentSong.duration,
                                    currentSong.image,
                                    currentSong.id
                                )
                            }
                        />
                    )}

                    <IoMdSkipForward
                        onClick={nextSong}
                        className="text-gray-700 hover:text-gray-500 cursor-pointer"
                    />
                    <PiShuffleBold className="text-gray-400 cursor-pointer" />
                </div>

                {/* 3rd div */}


                <div
                    className="flex lg:w-[30vw] justify-end items-center gap-3"
                    onMouseEnter={() => setIsVolumeVisible(true)}
                    onMouseLeave={() => setIsVolumeVisible(false)}
                >
                    <span ref={spanRef} className="text-xl text-orange-800">{currentSong ? convertTime(currentSong?.duration) : null}</span>

                    <LuHardDriveDownload
                        // onClick={() => handleDownloadSong(currentSong.audio.src)}
                        className="text-gray-700 hover:text-gray-500 text-2xl lg:text-3xl cursor-pointer lg:mr-2"
                    />
                    <HiSpeakerWave className="text-gray-700 hover:text-gray-500 text-2xl lg:text-3xl cursor-pointer lg:block" />


                    <VolumeController isVolumeVisible={isVolumeVisible} className="block" />

                </div>
            </div>
        </div>
    );
};

export default Player;