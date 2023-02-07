const express = require('express')
const logger = require('morgan')
const cors = require('cors')
// викликаємо dotenv, щоб те що у файлі .env (ліві частини: DB_HOST=, DB_USER= та ін) потрапили в змінні оточення
require("dotenv").config();

// імпортуємо роутери
const authRouter = require('./routes/api/auth');
const usersRouter = require('./routes/api/users');
const contactsRouter = require('./routes/api/contacts');

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'
app.use(logger(formatsLogger))
app.use(cors())

app.use(express.json())
// створюємо мідлвару express.static, щоб запит, який прийде за статичними файлами - розумів, що шукати їх
// потрібно в папці "public"
app.use(express.static("public"))

// всі запити, що починаються з /api/contacts (ендпойнт) будуть опрацьовуватись роутом contactsRouter
app.use('/api/contacts', contactsRouter)

// всі запити, що починаються з /api/auth (ендпойнт) будуть опрацьовуватись роутом authRouter
app.use("/api/auth", authRouter)

// всі запити, що починаються з /api/users (ендпойнт) будуть опрацьовуватись роутом usersRouter
app.use("/api/users", usersRouter)


app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
    // задаємо дефолтні значення для об'єкту помилку і якщо буде помилка з іншим статусом чи повідомленням - перезапишемо
    const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message: message })
})




module.exports = app;












