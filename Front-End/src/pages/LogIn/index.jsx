import LogInMain from "../../components/LogInMain"
import {motion} from 'framer-motion'


function LogIn() {

    return (

        <>
        <motion.div
        
        initial={{width: 0}}
        animate={{width:'100%'}}
        exit={{x: window.innerWidth, transition:{duration:0.1}}}
        >
            <LogInMain />
        </motion.div>
        </>
    )
}
export default LogIn
