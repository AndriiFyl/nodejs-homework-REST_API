// імпортуємо модель
const { Contact } = require("../../models");

const getAll = async (req, res) => {
  // отримуємо id із request.user
  const { _id } = req.user;

  const { page, limit } = req.query;

  const skip = (page - 1) * limit;

    const contacts = await Contact.find({owner: _id}, "", {skip, limit: Number(limit)}).populate("owner", "_id name email subscription");
    res.json({
      status: "success",
      code: 200,
      data: {
        result: contacts,
      }
    });
}

module.exports = getAll;


// Comments==============================================================
// // імпортуємо модель
// const { Contact } = require("../../models");

// // req.params - це те що передається в маршрутах через двокрапку, наприклад /:id
// // req.query - це те що вказано в маршруті пісдя знаку питання ?page=1&limit=5

// const getAll = async (req, res) => {
//   // отримуємо id із request.user
//   const { _id } = req.user;
//   // витягуємо з req.query page та query - та задаємо їм дефолтні значення
//   const { page, limit } = req.query;
//   // в змінну skip записуємо просту формулу: скільки пропустити об'єктів в разі запиту інфи на іншій сторінці
//   const skip = (page - 1) * limit;

//   // Contact.find({}) - метод в Mongo DB для отримання списку контактів
//   // populate("owner") - додатковий метод, який повертає не тільки id потрібного юзера (повертає саме до поля owner contactSchema), а
//   // й увесь об'єкт інформації про нього (щоб бекенд не отримав просто id, який на про що не скаже, а повну інформацію про юзера)
//   // наступними аргументами передаємо, які саме поля необхідно повернути
//     const contacts = await Contact.find({owner: _id}, "", {skip, limit: Number(limit)}).populate("owner", "_id name email subscription");
//     res.json({
//       status: "success",
//       code: 200,
//       data: {
//         result: contacts,
//       }
//     });
// }

// module.exports = getAll;