import HomeMain from "../../components/HomeMain"
import RoomSec from "../../components/HomeMain"
import {motion} from 'framer-motion'

function Home() {

    return (
        <>
           <motion.div
        initial={{width: 0}}
        animate={{width:'100%'}}
        exit={{x: window.innerWidth, transition:{duration:0.1}}}
        >
            <HomeMain />
            </motion.div>
        </>
    )
}
export default Home
