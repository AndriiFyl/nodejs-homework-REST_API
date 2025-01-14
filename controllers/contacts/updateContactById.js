const { Contact } = require("../../models");


const updateContactById = async (req, res) => {
  const { contactId } = req.params;
  // метод оновлення контакту по id на Mongo DB
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
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

module.exports = updateContactById;