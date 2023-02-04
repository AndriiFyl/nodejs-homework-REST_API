const express = require('express')
const router = express.Router()

const {auth, validation, ctrlWrapper } = require("../../middleWares")
const { joiSchema, favoriteJoiSchema } = require("../../models/contact");
const { contacts: ctrl } = require("../../controllers");

// кожен юзер отримує тільки свої списки контактів - мідлвара auth======================================================
router.get("/", auth, ctrlWrapper(ctrl.getAll));

// знайти контакт по id===============================================================================================================

router.get('/:contactId', ctrlWrapper(ctrl.getById))

// // Додавання контакта=========================================================================
// додавати контакт має право тільки залогінений користувач - тому спочатку додаємо мідлвару auth
router.post('/', auth, validation(joiSchema), ctrlWrapper(ctrl.addContact))

// // оновлення контакта по id================================================================
router.put('/:contactId', validation(joiSchema), ctrlWrapper(ctrl.updateContactById))

// // видалення контакту============================================================================
router.delete('/:contactId', ctrlWrapper(ctrl.removeContactById)); 

// оновлення поля favorite в контакті=================================================================
router.patch('/:contactId/favorite', validation(favoriteJoiSchema), ctrlWrapper(ctrl.updateStatusContact))

module.exports = router;


