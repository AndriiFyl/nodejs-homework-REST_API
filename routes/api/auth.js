// тут будуть всі запити, які стосуюится реєстрації, авторизації і т.д.
const express = require('express');

// імпортуємо мідлвари
const { auth, validation, ctrlWrapper } = require("../../middleWares");
// імпортуємо контролери
const { auth: ctrl } = require("../../controllers");
const { joiRegisterSchema, joiLoginSchema } = require("../../models/user");

// створюємо роутер
const router = express.Router();

// роут реєстрації (передається post запитом)
router.post("/register", validation(joiRegisterSchema), ctrlWrapper(ctrl.register));

// роут для залогінювання
router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));

// роут для logOut
router.get("/logout", auth,  ctrlWrapper(ctrl.logout));



// еспортуємо роутер
module.exports = router;