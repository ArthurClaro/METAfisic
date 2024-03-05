import { Route, Routes, useLocation } from "react-router-dom"
import HomeLogin from "../pages/HomeLogin"
import Register from "../pages/Register"
import Dash from "../pages/Dashboard"
import Training from "../pages/Training"
import Room from "../pages/Room"

import { AnimatePresence } from 'framer-motion'

function Rotas() {
    const location = useLocation()
    return (
        <>
            <AnimatePresence>
                <Routes location={location} key={location.pathname}>
                    <Route path="/dash" element={<Dash />} />
                    
                    <Route path="/" element={<HomeLogin />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/room" element={<Room />} />
                    <Route path="/room/:id" element={<Training />} />
                </Routes>
            </AnimatePresence>
        </>
    )
}
export default Rotas
