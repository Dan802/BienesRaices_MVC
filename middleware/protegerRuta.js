import jwt from "jsonwebtoken";
import { Usuario } from "../models/index.js";

/**
 * Evaluamos si el token guardado en las cookies es valido
 * Si es valido, consultamos el usuario y lo agregamos al req
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const protegerRuta = async (req, res, next) => {
    
    const {_token} = req.cookies
    
    // Verificar si hay un token en las cookies
    if(!_token) { return res.redirect('/auth/login') }

    // Comprobar el token
    try {

        const decoded = jwt.verify(_token, process.env.JWT_SECRET)
        
        const usuario = await Usuario.scope('eliminarPassword').findByPk(decoded.id)
        // .scope: operacion intermedia, en este caso elimina datos sensibles
        // así quedaría: usuario = { id: 1, name: '', email: '' }

        // Almacenar el usuario en el req
        if(usuario) {
            req.usuario = usuario
        } else {
            return res.redirect('/auth/login')
        }
        
        return next() // Ir al siguiente middleware

    } catch (error) {
        return res.clearCookie('_token').redirect('/auth/login')
    }
}

export default protegerRuta