const { Contact } = require("../../models");

const getById = async (req, res) => {
  const { contactId } = req.params;
  // метод запиту з Mongo DB сутності по id
    const result = await Contact.findById(contactId);
    if (!result) {
      const error = new Error(`Contact with id=${contactId} not found`);
      error.status = 404;
      throw error;
    }

    res.json({
      status: "success",
      code: 200,
      data: {result},
    })

}

module.exports = getById;