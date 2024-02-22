import DashSec from "../../components/DashSec"
import { motion } from 'framer-motion'


function Dash() {

    return (

        <>
            <motion.div

                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
            >
                <DashSec />
            </motion.div>
        </>
    )
}
export default Dash
