// імпортуємо модель
const { Contact } = require("../../models");

const getAll = async (req, res) => {
  // Contact.find({}) - метод в Mongo DB для отримання списку контактів
    const contacts = await Contact.find({});
    res.json({
      status: "success",
      code: 200,
      data: {
        result: contacts,
      }
    });
}

module.exports = getAll;