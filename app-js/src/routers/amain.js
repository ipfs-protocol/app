const express = require('express');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    // const users = await User.findAll();
    res.send('Hello Main Page');
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;