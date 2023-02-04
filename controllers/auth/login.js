const { User } = require("../../models");

const { Unauthorized } = require("http-errors");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;


const login = async (req, res) => {
   
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
   
    if (!user) {
        throw new Unauthorized(`email ${email} not found`);
    }

    const passCompare = bcrypt.compareSync(password, user.password);
   
    if (!passCompare) {
       throw new Unauthorized(`password ${password} wrong`); 
    }
   
    const payload = {
        id: user._id
    };
  
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "3h" });
  
    await User.findByIdAndUpdate(user._id, { token });
    res.json({
        status: "success",
        code: 200,
        data: {token}
    })
}

module.exports = login;


// Comments============================================
// // імпортуємо модель користувача
// const { User } = require("../../models");
// // імпортуємо пакет помилок
// const { Unauthorized } = require("http-errors");
// // імпортуємо пакет для хешування паролів
// const bcrypt = require("bcryptjs");
// // імпортуємо пакет для створення та роботи з token
// const jwt = require("jsonwebtoken");
// // імпортуємо секретний ключ 
// const { SECRET_KEY } = process.env;


// const login = async (req, res) => {
//     // витягуємо з req.body -  email, password
//     const { email, password } = req.body;
//     // шукаємо користувача по email
//     const user = await User.findOne({ email });
//     // якщо не знайшли такого користувача в БД, то викидаємо поитлку: неавторизований користувач - в пакеті http-errors - це
//     // Unauthorized - помилка 401.
//     if (!user) {
//         throw new Unauthorized(`email ${email} not found`);
//     }
//     // якщо ж юзер з таким email є в базі, то далі перевіряємо відповідність пароля до цього email (чи правильний пароль)
//     // метод, що порівнює паролі: 1 - password - той що ввів користувач при залогінюванні; 2 - user.password - той, що 
//     // записаний в БД
//     const passCompare = bcrypt.compareSync(password, user.password);
//     // і якщо passCompare = false, тобто паролі що порівнюються неоднакові - знову ж викидуємо помилку
//     if (!passCompare) {
//        throw new Unauthorized(`password ${password} wrong`); 
//     }
//     // і я кщо всі перевірки пройшли успішно, то ми ми маємо видати token
//     // 1 - створюємо payload - об'єкт з даними, які потрібно зашифрувати (в даному випадку id юзера із БД)
//     const payload = {
//         id: user._id
//     };
//     // 2 - створюємо token
//     // jwt.sign - метод для створення token, де першим аргумент передаэмо payload, другим - SECRET_KEY, третім - 
//     // { expiresIn: "3h" } - час валідності для token
//     const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "3h" });
//     // перед тим як повернути token у тілі відповіді, ми ще й зберігаємо його до БД, що можна було потім розлогінитись
//     await User.findByIdAndUpdate(user._id, { token });
//     res.json({
//         status: "success",
//         code: 200,
//         data: {token}
//     })
// }

// module.exports = login;