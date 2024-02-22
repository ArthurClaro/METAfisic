import { Route, Routes, useLocation } from "react-router-dom"
import HomeLogin from "../pages/HomeLogin"
import Register from "../pages/Register"
import Dash from "../pages/Dashboard"
import FruitPage from "../pages/FruitPage"
import Room from "../pages/Room"

import { AnimatePresence } from 'framer-motion'

function Rotas() {
    const location = useLocation()
    return (
        <>
            <AnimatePresence>
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<HomeLogin />} />
                    <Route path="/fruit/:id" element={<FruitPage />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dash" element={<Dash />} />

                    <Route path="/room" element={<Room />} />
                </Routes>
            </AnimatePresence>
        </>
    )
}
export default Rotas
