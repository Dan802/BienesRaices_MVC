import {DataTypes} from 'sequelize'
import bcrypt from 'bcrypt'
import db from '../config/db.js'

const Usuario = db.define('usuarios', {
    name: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING, // por default es 255
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: DataTypes.STRING,
    confirmado: DataTypes.BOOLEAN
}, {
    hooks: {
        beforeCreate: async function(usuario) {
            //Siempre se ejecuta antes de crear una instancia 
            const salt = await bcrypt.genSalt(10) // Hasheando password
            usuario.password = await bcrypt.hash( usuario.password, salt);
        }
    }
})

// Métodos personalizados

// le añadimos la funcion de verificarPassword solo al objeto de Usuario
Usuario.prototype.verificarPassword = function(input_password) {
    return bcrypt.compareSync(input_password, this.password)
}

export default Usuario