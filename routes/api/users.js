// тут будуть всі запити, які стосуюится реєстрації, авторизації і т.д.
const express = require('express');

// імпортуємо мідлвари
const { auth, ctrlWrapper } = require("../../middleWares");
// імпортуємо контролери
const { users: ctrl } = require("../../controllers");
// створюємо роутер
const router = express.Router();

router.get("/current", auth,  ctrlWrapper(ctrl.getCurrent))

// еспортуємо роутер
module.exports = router;