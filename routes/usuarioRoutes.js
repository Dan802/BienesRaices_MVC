import express from 'express' 
import { formularioLogin , autenticar, cerrarSesion, formularioRegistro, registrar, confirmar, formularioOlvidePassword, resetPassword, comprobarToken, nuevoPassword} from '../controllers/usuarioController.js';

const router = express.Router();

//Routing 

// ***** AUTH *****
router.get('/login', formularioLogin); 
router.post('/login', autenticar); 

router.post('/logout', cerrarSesion); 

router.get('/registration', formularioRegistro);
router.post('/registration', registrar);

router.get('/confirm/:token', confirmar);

router.get('/forgot-password', formularioOlvidePassword);
router.post('/forgot-password', resetPassword);

router.get('/forgot-password/:token', comprobarToken);
router.post('/forgot-password/:token', nuevoPassword);

export default router