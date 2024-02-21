import Sequelize from 'sequelize'
import dotenv from 'dotenv'
dotenv.config({path: '.env'})

const db = new Sequelize(process.env.BD_NOMBRE, process.env.BD_USER, process.env.BD_PASSWORD ?? '', {
    host: process.env.BD_HOST,
    port: 3307,
    dialect: 'mysql',
    define: {
        timestamps: true    //Cuando se crea un usuario y cuando es actualizado
    },
    pool: { 
        max: 500, // Conexiones maximas a la base de datos por usuario 5
        min: 0,
        acquire: 30000, // 30s antes de marcar error
        idle: 10000 // 10s pa finalizar la conexion
    }, 
    operatorAliases: false,
    // logging: true
}) 

export default db;