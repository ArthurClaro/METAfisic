import TrainingMain from "../../components/TrainingMain"
import { motion } from 'framer-motion'

function Training() {

    return (
        <>
            <motion.div

                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
            >
                <TrainingMain />
            </motion.div>

        </>
    )
}
export default Training
