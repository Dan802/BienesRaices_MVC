import express from 'express'
import { inicio, categoria, noEncontrado, buscador } from '../controllers/appController.js'

const router = express.Router()

// Pagina de Inicio
router.get('/', inicio)

// Categorias
router.get('/categories/:id', categoria)

// Página 404
router.get('/404', noEncontrado)

// Buscador
router.post('/search', buscador)


export default router