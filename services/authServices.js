const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db/connection');
require('dotenv').config();

const user = {
  id: 1,
  email: 'usuario@example.com',
  password: '123456', // En la práctica esto estaría hasheado
};

const loginUser = async (email, password) => {
//         const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]); 
//  aqui deberia reemplazar por la funcion de ORM
// EJEMPLO userModel.findOne({ where: { email } });

  if (email !== user.email || password !== user.password) {
    throw new Error('Credenciales incorrectas');
  }

  // if (rows.length === 0) {
  //   throw new Error('Usuario no encontrado');
  // }

  // const user = rows[0];
  // const validPassword = await bcrypt.compare(password, user.password);

  // if (!validPassword) {
  //   throw new Error('Contraseña incorrecta');
  // }

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });

  return {
    message: 'Login exitoso',
    token,
    user: {
      id: user.id,
      email: user.email
    }
  };
};

module.exports = { loginUser };
