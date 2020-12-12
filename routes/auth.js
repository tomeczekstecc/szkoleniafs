const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');

//@route GET api/auth
//@desc get logged in usee
//@access Private
router.get('/', (req, res) => {
  res.send('Get logged in user');
});

//@route POST api/auth
//@desc auth user get token
//@access Public
router.post(
  '/',
  [
    check('email', 'Email jest wymagany.').isEmail(),
    check('password', 'Hasło jes wymagane. Użyj co najmniej 6 znaków.').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({
        email: email
      });

      if (!user) {
        return res.status(400).json({
          msg: 'Wprowadzono niepoprawne dane logowania.'
        });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Wprowadzono niepoprawne dane logowania.' });
      }
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.massage);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;