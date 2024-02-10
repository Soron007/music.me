import MainSection from "../components/MainSection"
import Navbar from "../components/Navbar"
import Player from "../components/Player"


const Home = () => {
    return (
        <>
            {/* <Navbar /> */}
            <MainSection Navbar={Navbar} />
            <Player />
        </>
    )
}

export default Home
