// Librerias npm 
import { check, validationResult } from 'express-validator'
import bcrypt from 'bcrypt'
// Archivos normales
import Usuario from '../models/Usuario.js'
import {generarJWT, generarId} from '../helpers/tokens.js'
import {emailRegistro , emailOlvidePassword} from '../helpers/emails.js'

const formularioLogin = (req, res) => {
    res.render('auth/login', {
        page : 'Log In'
    } )
}

const autenticar = async (req, res) => {

    await check('email').isEmail().withMessage("Mail is not valid").run(req)
    await check('password').notEmpty().withMessage("Password is required").run(req)

    let resultado = validationResult(req)

    if(!resultado.isEmpty()) {
        return res.render('auth/login', { 
            page : 'Log in',
            errores: resultado.array()
        } )
    }

    const {email, password} = req.body
    
    // Comprobar si el usuario existe
    const usuario = await Usuario.findOne({where: {email}})
    if(!usuario) {
        return res.render('auth/login', { 
            page : 'Log in',
            errores: [{msg: "The user does not exist"}]
        } )
    }

    // Comprobar que la cuenta esta confirmada
    if(!usuario.confirmado) {
        return res.render('auth/login', { 
            page : 'Log in',
            errores: [{msg: "Your account is not confirmed"}]
        } )
    }

    // Comprobar el password
    if(!usuario.verificarPassword(password)){
        return res.render('auth/login', { 
            page : 'Log in',
            errores: [{msg: "Password is not correct"}]
        } )
    }

    // Autenticar al usuario
    const token = generarJWT({id: usuario.id, nombre: usuario.name})

    // Almacenar token en un cookie
    return res.cookie('_token', token, {
        httpOnly: true,
        // secure: true // Solo con certificado SSL
        // sameSite: true
    }).redirect('/my-properties')
}

const formularioRegistro = (req, res) => {

    res.render('auth/registro', { 
        page : 'Create Account',
    } )
}

const registrar = async (req, res) => {

    // req.body = simil to datos que se enviaban a través de $_POST
    console.log(req.body)

    // Validaciones
    await check('name').notEmpty().withMessage('Name is required').run(req)
    await check('email').isEmail().withMessage("Mail is not valid").run(req)
    await check('password').isLength({min: 6}).withMessage("Password must be at least 6 characters").run(req)
    await check('repeat_password').equals(req.body.password).withMessage("The passwords are not the same").run(req)

    let resultado = validationResult(req)

    // Verificar que el resultado este vacio
    if(!resultado.isEmpty()) {
        // Hay errores

        return res.render('auth/registro', { 
            page : 'Create account',
            errores: resultado.array(),
            usuario: { // Datos para rellenar el form automaticamente 
                name: req.body.name,
                email: req.body.email
            }
        } )
    }

    // Verificar que el usuario no este duplicado
    const existeUsuario = await Usuario.findOne( { where: {email: req.body.email}}) 
    //exsiteUsuario = @return object o null

    if(existeUsuario) {
        return res.render('auth/registro', { 
            page : 'Registration',
            errores: [{msg: 'The User is already registered'}],
            usuario: { // Datos para rellenar el form automaticamente 
                name: req.body.name,
                email: req.body.email
            }
        } )
    }

    const {name, email, password} = req.body;


    // Almacenar en la Base de Datos
    // await Usuario.create(req.body)
    const usuarioCreado = await Usuario.create({
        name,
        email,
        password, 
        token: generarId()
    })

    // Enviar correo de comfirmacion
    emailRegistro({
        name, 
        email, 
        token: usuarioCreado.token
    })

    // Mostrar mensaje de confirmación
    res.render('templates/mensaje', {
        page: 'Successfully created account',
        message: 'We have sent you a confirmation email'
    })

}

/**
 * Función para comprobar una cuenta creada
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const confirmar = async (req, res) => {
    
    // Extraemos los datos de la URL
    const {token} = req.params;

    // Verificar si el token es válido
    const usuario = await Usuario.findOne({where: {token}})

    if(!usuario || !token) {
        return res.render('auth/confirmar-cuenta',{
            page: 'Error confirming your account',
            message: 'There was an error confirming your account, please try again',
            error: true
        })
    }

    // Eliminar el token de la bd
    usuario.token = null;
    usuario.confirmado = true;

    // Actualizar el usuario en la BD
    await usuario.save();

    return res.render('auth/confirmar-cuenta',{
        page: 'Confirmed successful account',
        message: 'Account has been confirmed successfully',
        error: false
    })
}

const formularioOlvidePassword = (req, res) => {
    res.render('auth/olvide-password', { 
        page : 'Reset your password'
    } )
}

const resetPassword = async (req, res) => {

    // req.body = simil to datos que se enviaban a través de $_POST
    console.log(req.body)

    // Validaciones
    await check('email').isEmail().withMessage("Mail is not valid").run(req)

    let resultado = validationResult(req)

    // Verificar que el resultado este vacio
    if(!resultado.isEmpty()) {

        return res.render('auth/olvide-password', { 
            page : 'Reset your password',
            errores: resultado.array(),
        } )
    }

    // Buscar el usuario
    const existeUsuario = await Usuario.findOne( { where: {email: req.body.email}}) 
    //exsiteUsuario = @return object o null

    if(!existeUsuario) {
        return res.render('auth/olvide-password', { 
            page : 'Reset your password',
            errores: [{msg: "The email doesn't belong to any user."}],
        } )
    }

    // Generar un token y enviar el email
    existeUsuario.token = generarId();
    await existeUsuario.save();

    // Enviar correo pa cambiar clave
    emailOlvidePassword({
        name: existeUsuario.name,
        email: existeUsuario.email,
        token: existeUsuario.token
    })

    // Mostrar mensaje de confirmación
    res.render('templates/mensaje', {
        page: 'Reset your password',
        message: 'We have sent you an email with the instructions'
    })

}

const comprobarToken = async (req, res) => {

    const {token} = req.params;

    const usuario = await Usuario.findOne({where : {token}})

    if(!usuario){
        return res.render('auth/confirmar-cuenta',{
            page: 'Reset your password',
            message: 'There was an error validating your information, please try again',
            error: true
        })
    }

    // Mostrar el formulario para modificar el password
    res.render('auth/reset-password',{
        page: 'Reset your password'
    })
}

const nuevoPassword = async (req, res) => {
    
    // Validar el password
    await check('password').isLength({min: 6}).withMessage("Password must be at least 6 characters").run(req)
    await check('repeat_password').equals(req.body.password).withMessage("The passwords are not the same").run(req)

    let resultado = validationResult(req)

    if(!resultado.isEmpty()){
        return res.render('auth/reset-password', { 
            page : 'Reset your password',
            errores: resultado.array(),
        } )
    }

    // Identificar quien hace el cambio
    const {token} = req.params
    const usuario = await Usuario.findOne({where: {token}})

    if(!usuario){
        return res.render('auth/confirmar-cuenta',{
            page: 'Reset your password',
            message: 'There was an error validating your information, please try again',
            error: true
        })
    }

    // Hashear el nuevo password
    const salt = await bcrypt.genSalt(10) // Hasheando password
    usuario.password = await bcrypt.hash( req.body.password, salt);
    usuario.token = null;

    await usuario.save();

    res.render('auth/confirmar-cuenta', {
        page: 'Password reset',
        message: 'Password has been reset successfully'
    })
}

export {
    autenticar,
    formularioLogin,
    formularioRegistro,
    registrar,
    confirmar,
    formularioOlvidePassword,
    resetPassword,
    comprobarToken,
    nuevoPassword
}