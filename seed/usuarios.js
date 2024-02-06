import bcrypt from 'bcrypt'

const usuarios = [
    {
        name: 'Juan',
        email: 'juanfgonzalez@correo.com',
        confirmado: 1,
        password: bcrypt.hashSync('password', 10)
    }
]

export default usuarios