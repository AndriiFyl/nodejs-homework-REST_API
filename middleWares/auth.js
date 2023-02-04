const { User } = require("../models");
const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;


const auth = async (req, res, next) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
   
    try {
    if (bearer !== "Bearer") {
        throw new Unauthorized("Not authorized");
    }
        const { id } = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        if (!user || !user.token) {
            throw new Unauthorized("Not authorized");
        }
        req.user = user;
        next();
    } catch (error) {
        if (error.message === "Invalid signature") {
            error.message = 401;
        }
        next(error);
    }
    
}

module.exports = auth;




// // дана мідлвара отримує token із заголовка та:
// // 1- перевіряє валідність токена (те, що ми його видали та він має ще має термін дії )
// // 2 - отримує із токена id, знаходить користувача в базы по id та додає його до запиту (req.user)


// // 1.  Витягуємо із заголовка запиту те що міститься в заголовці Authrization
// // 2. Розділити заголовок на 2 слова: bearer та token
// // 3. перевірити чи є переше слово "Bearer";
// // 4. перевірити валідність другого слова (токен) через jwt.verify
// // 5. якщо токен валідний - витягти з нього id та знайти користувача в базі з таким id.
// // 6. якщо користувача з таким id знайшли в БД - то його потрібно прикріпити до запиту( об'єкт req).


// const { User } = require("../models");
// const { Unauthorized } = require("http-errors");
// const jwt = require("jsonwebtoken");

// // витягуємо ключ
// const { SECRET_KEY } = process.env;


// const auth = async (req, res, next) => {
//     // 1- із req.body витягуємо заголовки. Якщо їх не передали, то присвоюємо пусту строку
//     const { authorization = "" } = req.headers;
//     // 2- якщо нам передали строку із 2х слів (Bearer eyJhbGciOiJIUzI1NiI...), то ми також маємо розділити її 
//     // в змінну bearer потрапить - Bearer, в token -  eyJhbGciOiJIUzI1NiI...
//     const [bearer, token] = authorization.split(" ");
   
//     try {
//          // 3 - перевіряємо чи є переше слово "Bearer"
//     if (bearer !== "Bearer") {
//         throw new Unauthorized();
//     }
//         // 4-5 витягуємо id через токен (якщо він валідний. Це в свою чергу перевіряє метод jwt.verify - який порівнює токен, що
//         // ми передали з секретним ключем)
//         const { id } = jwt.verify(token, SECRET_KEY);
//         // знаходимо юзера по id, який отрималт через токен
//         const user = User.findById(id);
//         // zякщо користувача з таким id не знайшли - викидаємо помилку unAthorized
//         if (!user) {
//             throw new Unauthorized("Not authorized");
//         }
//         // 6 - в результаті в тіло запиту передаємо нашого юзера (тобто якщо токен валідний і такий користувач є)
//         req.user = user;
//         next();
//     } catch (error) {
//         if (error.message === "Invalid signature") {
//             error.message = 401;
//         }
//         next(error);
//     }
    
// }

// module.exports = auth;