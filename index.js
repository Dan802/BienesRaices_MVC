// const express = require('express') //Common JS
import express from 'express' //En el package.json agregar: "type" : "module"

// import csrf from 'csurf' //! deprecated
import cookieParser from 'cookie-parser'
import helmet from "helmet";

// Los archivos que uno crea requieren el .js, las dependencias no
import db from './config/db.js'
import usuarioRoutes from './routes/usuarioRoutes.js'
import propiedadesRoutes from './routes/propiedadesRoutes.js'
import appRoutes from './routes/appRoutes.js'
import apiRoutes from './routes/apiRoutes.js'

// Crear la app
const app = express()

// Habilitar lectura de datos de formularios tipo text
app.use( express.urlencoded( {extended: true}) )

// Habilitar coockie parser 
app.use( cookieParser() )

// Protejer: cross side request forgey

    // Comprueba que los formularios enviados si sean del mismo dominio de nuestra página
    // app.use(csrf({cookie: true}))

    // ya que csurf esta deprecated usaremos helmet
    app.use(helmet({
        contentSecurityPolicy: {
          directives: {
            defaultSrc: ["'self'", "geocode.arcgis.com"],
            scriptSrc: ["'self'", "'unsafe-eval'", "unpkg.com", "*.unpkg.com", "cdnjs.cloudflare.com", "*.cdnjs.cloudflare.com"],
            imgSrc: ["'self'",  "data:", "*.openstreetmap.org", "unpkg.com", "*.unpkg.com"],
            // connectSrc: ["'self'", "*.hotjar.com", ] //! Si se descomenta daña el mapa de leaflet 
          }
        },
    }),);
// FIN Protejer: cross side request forgey


// Conexión a la base de datos
(
    async () => {
        try {
            await db.authenticate();
            await db.sync() // Create tables if no existe 
            console.log('*****Conexión Correcta a la base de datos')
        } catch(error) {
            console.log(error)
        }
    }
)()

// Habilitar Pug (Template engine)
app.set('view engine', 'pug')
app.set('views', './views')

//Carpeta Pública con archivos estáticos
app.use(express.static('public'))

//Routing 
app.use('/', appRoutes)
// app.use('/auth', usuarioRoutes) //Busca todas las rutas que inician con /auth
// app.use('/', propiedadesRoutes) 
// app.use('/api', apiRoutes)

// Definir puerto
const port = process.env.PORT

// Iniciar Server
app.listen(port, (err) => {
    if(err) { 
        console.log(err); 
    }else {
        console.log(`*****El servidor esta funcionando en el puerto ${port}`)
    }
});