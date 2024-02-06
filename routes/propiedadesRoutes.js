import express from "express"
import {admin, crear} from "../controllers/propiedadController.js"

const router = express.Router()

// Zona Privada
router.get('/my-properties', admin)
router.get('/my-properties/create', crear)


export default router