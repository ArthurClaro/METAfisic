import RegisterSec from "../../components/RegisterSec"
import {motion} from 'framer-motion'


function Register() {

    return (

        <>
        <motion.div
        
        initial={{width: 0}}
        animate={{width:'100%'}}
        exit={{x: window.innerWidth, transition:{duration:0.1}}}
        >
            <RegisterSec />
        </motion.div>
        </>
    )
}
export default Register
