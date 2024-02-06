import {exit} from 'node:process'

import categorias from "./categorias.js";
import precios from "./precios.js";

import Categoria from "../models/Categoria.js";
import Precio from "../models/Precio.js";

import db from "../config/db.js";

const importarDatos = async () => {
    try {
        // Autenticar
        await db.authenticate()

        // Generar las columnas
        await db.sync()

        // Insertamos los datos de forma paralela ya que no dependen el uno del otro
        await Promise.all([
            Categoria.bulkCreate(categorias),
            Precio.bulkCreate(precios)
        ])

        console.log('*****Datos Importados Correctamente')
        exit() // exit(0) Finaliza y fue correcto

    } catch (error) {
        console.log(error)
        exit(1) // exit(1) Finaliza pero hubo un error
    }
}

const eliminarDatos = async () => {
    try {

        // Just truncate
        // await Promise.all([
        //     Categoria.destroy({where: {}, truncate: true}),
        //     Precio.destroy({where: {}, truncate: true})
        // ])

        // Drop and create the tables que han sido importadas en este archivo
        await db.sync({force: true})

        console.log('*****Datos Eliminados Correctamente')
        exit(0)

    } catch (error) {
        console.log(error)
        exit(1) 
    }
}

// "db:importar" : "node ./seed/seeder.js -i"
if(process.argv[2] === "-i"){
    importarDatos();
}

if(process.argv[2] === "-e"){
    eliminarDatos();
}