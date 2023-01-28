// імпортуємо модель
const { Contact } = require("../../models");


const addContact = async (req, res) => {
  // метод додавання в базу
    const result = await Contact.create(req.body);
    res.status(201).json({
    status: "success",
      code: 201,
      data: {result},
    })
}

module.exports = addContact;