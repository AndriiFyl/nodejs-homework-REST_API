const { User } = require("../../models");
// імпортуємо пакет gravatar, який автоматично генеруэ аватари для кожного юзера
const gravatar = require('gravatar');
const { Conflict } = require("http-errors");

const bcrypt = require("bcryptjs");

const { sendEmail } = require("../../helpers");
const { nanoid } = require("nanoid");

 
const register = async (req, res) => {
    
    const { name, email, password, subscription } = req.body;
   
    const user = await User.findOne({ email });
   
    if (user) {
       
        throw new Conflict(`User with ${email} already exist`);
    }

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    // створюємо токен для верифікації
    const verificationToken = nanoid();
    
    // в змінну avatarURL через gravatar записуємо емейл юзера (якому потрібно сгенерувати аватар)
    const avatarURL = gravatar.url(email);
    await User.create({ name, email, password: hashPassword, subscription, avatarURL, verificationToken });
    
//    лист, який будемо відправляти
    const mail = {
        to: email,
        subject: "Approve email",
        html: `<a target="_blank" hreaf="http://localhost:3000/api/users/verify/${verificationToken}">Approve email</a>`
    };
     
    // відправляємо лист
    await sendEmail(mail);


    res.status(201).json({
        status: "success",
        code: 201,
        data: {
            user: {
                email,
                name,
                subscription,
                avatarURL,
                verificationToken
            }
        }
    })
}

module.exports = register;

// Comments===============================================================
// // імпортуємо модель користувача
// const { User } = require("../../models");
// // імпортуємо пакет помилок
// const { Conflict } = require("http-errors");
// // імпортуємо пакет для хешування паролів (хешування необхідно, щоб в БД пароль відображався як набір рандомних символів
// // на випадок, якщо хтось отримає доступ до БД, то не міг прочитати паролі користувачів)
// const bcrypt = require("bcryptjs");

// // контролер для додавання юзера в базу даних(реєстрація)
// const register = async (req, res) => {
//     // 1 - витягуємо з req.body - name, email, password
//     const { name, email, password, subscription } = req.body;
//     // 2- перевіряємо, чи є вже такий користувач (з таким email) в базі - метод finOne
//     const user = await User.findOne({ email });
//     // якщо користувач з таким емейлом вже є - викидаємо 409 помилку (даний параметр може існувати лише в одному екземплярі)
//     if (user) {
//         // Conflict - це разеревоване слово із пакету "http-errors", якому відповідає помилка 409
//         throw new Conflict(`User with ${email} already exist`);
//     }

//     // САМЕ перед зберіганням інфи до БД, ми і хешуємо пароль:
//     // bcrypt.hashSync - метод, що хешує оригінальний пароль
//     // bcrypt.genSaltSync(10) - метод для засолювання паролю (його ускладнення), де 10 - кількість додаткових символів
//     const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

//     // якщо такого емейла ще не має - то маємо зареєструвати користувача і додати в БД
//     const result = await User.create({ name, email, password: hashPassword, subscription });
//     // json - використовуємо зімсть send, щоб у базу даних відразу передати файл у json-форматі
//     // і повертаємо відповідь з сервера
//     res.status(201).json({
//         status: "success",
//         code: 201,
//         data: {
//             user: {
//                 email,
//                 name,
//                 subscription
//             }
//         }
//     })
// }

// module.exports = register;