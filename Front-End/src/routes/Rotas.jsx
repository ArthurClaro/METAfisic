import { Route, Routes, useLocation } from "react-router-dom"
import Training from "../pages/Training"

import { AnimatePresence } from 'framer-motion'
import LogIn from "../pages/LogIn"
import Home from "../pages/Home"

function Rotas() {
    const location = useLocation()
    return (
        <>
            <AnimatePresence>
                <Routes location={location} key={location.pathname}>
                    
                    <Route path="/login" element={<LogIn />} />

                    <Route path="/" element={<Home />} />

                    <Route path="groups/:id" element={<Training />} />

                </Routes>
            </AnimatePresence>
        </>
    )
}
export default Rotas
