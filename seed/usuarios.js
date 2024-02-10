import bcrypt from 'bcrypt'

const usuarios = [
    {
        name: 'Juan',
        email: 'juanfgonzalez@correo.com',
        confirmado: 1,
        password: bcrypt.hashSync('123456', 10)
    }
]

export default usuarios