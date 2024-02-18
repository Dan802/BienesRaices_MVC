import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";

/**
 * Identifica si hay un token en las cookies, identifica que usaurio es, y lo alamacena en request
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const identificarUsuario = async (req, res, next) => {
    // Identificar si hay un token
    const {_token} = req.cookies

    // Si no hay token usuario = null
    if(!_token) {
        req.usuario = null
        return next()
    }

    // Comprobar el token
    try {

        const decoded = jwt.verify(_token, process.env.JWT_SECRET)
        
        const usuario = await Usuario.scope('eliminarPassword').findByPk(decoded.id)
        // .scope: operacion intermedia, en este caso elimina datos sensibles
        // así quedaría: usuario = { id: 1, name: '', email: '' }

        if(usuario) {
            req.usuario = usuario
        }
        
        return next() // Ir al siguiente middleware
        
    } catch (error) {
        console.log(error)
        return res.clearCookie('_token').redirect('/auth/login')
    }
}

export default identificarUsuario