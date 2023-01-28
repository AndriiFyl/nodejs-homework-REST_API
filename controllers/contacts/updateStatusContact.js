const { Contact } = require("../../models");


const updateStatusContact = async (req, res) => {
    const { contactId } = req.params;
    // витягуємо статус із body
    const { favorite } = req.body;
  // метод оновлення контакту по id на Mongo DB
    const result = await Contact.findByIdAndUpdate(contactId, {favorite}, {new: true});
    if (!result) {
      const error = new Error(`Contact with id=${contactId} not found`);
      error.status = 404;
      throw error;
    }
    
    res.status(201).json({
    status: "success",
      code: 201,
      data: {result},
    })
}

module.exports = updateStatusContact;