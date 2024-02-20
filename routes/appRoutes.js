import express from 'express'
import { inicio, categoria, noEncontrado, buscador } from '../controllers/appController.js'
import identificarUsuario from "../middleware/identificarUsuario.js"

const router = express.Router()

// Pagina de Inicio
router.get('/', identificarUsuario, inicio)

// Categorias
router.get('/categories/:id', identificarUsuario, categoria)

// Página 404
router.get('/404', identificarUsuario, noEncontrado)

// Buscador
router.post('/search', identificarUsuario, buscador)

export default router