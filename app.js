const express = require('express')
const logger = require('morgan')
const cors = require('cors')
// викликаємо dotenv, щоб те що у файлі .env (ліві частини: DB_HOST=, DB_USER= та ін) потрапили в змінні оточення
require("dotenv").config();

const contactsRouter = require('./routes/api/contacts');

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'
app.use(logger(formatsLogger))
app.use(cors())

app.use(express.json())

app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
    // задаємо дефолтні значення для об'єкту помилку і якщо буде помилка з іншим статусом чи повідомленням - перезапишемо
    const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message: message })
})

module.exports = app;



// COMMENTS==============================================
// const express = require('express')
// const logger = require('morgan')
// const cors = require('cors')
// // викликаємо dotenv, щоб те що у файлі .env (ліві частини: DB_HOST=, DB_USER= та ін) потрапили в змінні оточення
// require("dotenv").config();
// // ================================================================================================================
// // name Mongo (additional user) - Alonso
// // password Mongo (additional user) - передаємо до файлу .env

// // строка підключення кластеру, з яким працюємо - необхідно для проги Mongo DB Compass
// // mongodb+srv://Alonso:<PASSWORD>@cluster0.aguuluq.mongodb.net/test
// // =====================================================================================================================


// // імпортуємо mongoose (для роботи з БД - Mongo DB)
// // const mongoose = require("mongoose");
// // далі для mongoose передати строку підключення до бази (а семо до contacts_list_data)
// // строка підключення до бази contacts_list_data
// // mongodb+srv://Alonso:<password>@cluster0.aguuluq.mongodb.net/?retryWrites=true&w=majority
// // const DB_HOST = "mongodb+srv://Alonso:<PASSWORD>@cluster0.aguuluq.mongodb.net/contacts_list_data?retryWrites=true&w=majority"
// // mongoose.connect(DB_HOST)
// //   // mongoose повертає проміс
// //   .then(() => console.log("Database connect"))
// //   // опрацьовуємо помилку підключення
// //   .catch(error => {
// //     console.log(error.message)
// //     process.exit(1);
// //   })


// const contactsRouter = require('./routes/api/contacts');

// const app = express()

// const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'
// app.use(logger(formatsLogger))
// app.use(cors())

// app.use(express.json())

// app.use('/api/contacts', contactsRouter)

// app.use((req, res) => {
//   res.status(404).json({ message: 'Not found' })
// })

// app.use((err, req, res, next) => {
//     // задаємо дефолтні значення для об'єкту помилку і якщо буде помилка з іншим статусом чи повідомленням - перезапишемо
//     const { status = 500, message = "Server error" } = err;
//   res.status(status).json({ message: message })
// })

// module.exports = app;









