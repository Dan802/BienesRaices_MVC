import {DataTypes} from 'sequelize'
import db from '../config/db.js'

const Mensaje = db.define('mensajes', {
    mensaje: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    email: DataTypes.BOOLEAN,
    phone: DataTypes.BOOLEAN
})

export default Mensaje