import express from "express"
import { body } from "express-validator"
import {admin, crear, guardar, agregarImagen, almacenarImagen, editar, guardarCambios, eliminar, mostrarPropiedad} from "../controllers/propiedadController.js"
import protegerRuta from "../middleware/protegerRuta.js"
import upload from '../middleware/subirImagen.js'

const router = express.Router()

// Zona Privada
router.get('/my-properties', protegerRuta, admin)
router.get('/properties/create', protegerRuta, crear)
router.post('/properties/create', protegerRuta, 
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
    guardar)
router.get('/properties/add-image/:id', protegerRuta, agregarImagen)
router.post('/properties/add-image/:id', protegerRuta, upload.single('imagen'), almacenarImagen) // upload.array pa subir multiples archivos
router.get('/properties/edit/:id', protegerRuta, editar)
router.post('/properties/edit/:id', protegerRuta, 
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
    guardarCambios)
router.post('/properties/delete/:id', protegerRuta, eliminar)

// Zona Pública
router.get('/property/:id', mostrarPropiedad )


export default router