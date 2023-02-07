// тут будуть всі запити, які стосуюится реєстрації, авторизації і т.д.
const express = require('express');

// імпортуємо мідлвари
const { auth, upload,  ctrlWrapper } = require("../../middleWares");
// імпортуємо контролери
const { users: ctrl } = require("../../controllers");
// створюємо роутер
const router = express.Router();

// роутер для поточного користувача
router.get("/current", auth, ctrlWrapper(ctrl.getCurrent))

// роутер для завантаження аватара користувача
// він містить мідлвару upload - у випадках, коли нам потрібно отримати зображення (файл)
// upload.single("avatar") - вказуємо для даної мідлвари, де шукати зображення
router.patch("/avatars", auth, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar));

// еспортуємо роутер
module.exports = router;