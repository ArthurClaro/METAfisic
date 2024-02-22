import HomeLogSec from "../../components/HomeLogSec"
import {motion} from 'framer-motion'

function HomeLogin() {

    return (
        <>
        <motion.div
        
        initial={{width: 0}}
        animate={{width:'100%'}}
        exit={{x: window.innerWidth, transition:{duration:0.1}}}
        >
            <HomeLogSec />
        </motion.div>
        </>
    )
}
export default HomeLogin
