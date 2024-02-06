import express from "express"
import { body } from "express-validator"
import {admin, crear, guardar} from "../controllers/propiedadController.js"

const router = express.Router()

// Zona Privada
router.get('/', admin)
router.get('/my-properties', admin)
router.get('/my-properties/create', crear)
router.post('/my-properties/create', 
    body('title').notEmpty().withMessage('The title of the adversite is required'),
    body('description')
        .notEmpty().withMessage('The description is required')
        .isLength({ max: 200 }).withMessage('The description is too long, max 200 characters'),
    body('category').isNumeric().withMessage('Select a category'),
    body('price').isNumeric().withMessage('Select a price range'),
    body('rooms').isNumeric().withMessage('Select the number of rooms'),
    body('parking_lot').isNumeric().withMessage('Select the number of parking spaces'),
    body('wc').isNumeric().withMessage('Select the number of wc'),
    body('lat').notEmpty().withMessage('Set the ubication on the map'),
    guardar
)


export default router