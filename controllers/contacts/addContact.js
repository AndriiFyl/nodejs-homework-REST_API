// імпортуємо модель
const { Contact } = require("../../models");


const addContact = async (req, res) => {
  
  // забираєио id із нашого запиту - req.user (id того, хто робить запит)
  const { _id} = req.user;
  // метод додавання в базу
  // оскільки з фронта не приходять id (вони є тільки в базі), то до тіла запиту додаємо ще id юзера
  const result = await Contact.create({ ...req.body, owner: _id });
    res.status(201).json({
    status: "success",
      code: 201,
      data: {result},
    })
}

module.exports = addContact;