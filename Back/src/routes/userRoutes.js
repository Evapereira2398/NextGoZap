const express = require('express');
const User = require('../../models/User');
const router = express.Router();

// Rota de Cadastro
router.post('/register', async (req, res) => {
  const { name, username, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).send('O nome de usuário já está em uso.');
    }

    const user = await User.create({ name, username, password });
    const axios = require('axios');
    const SECRET_KEY = 'NextGoZapServer';

    const response = await axios.post(`localhost/api/${username}/${SECRET_KEY}/generate-token`);
    const wppToken = response.data.token;
    await user.update({ token: wppToken });
    
    return res.status(201).send(user);
  } catch (error) {
    return res.status(500).send('Erro ao registrar o usuário.');
  }
});

// Rota de Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user || user.password !== password) {
      return res.status(400).send('Nome de usuário ou senha incorretos.');
    }
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send('Erro ao efetuar login.');
  }
});

module.exports = router;
