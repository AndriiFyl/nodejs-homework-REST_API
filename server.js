// імпортуємо сюди сервер з app.js
const app = require('./app')
// імпортуємо mongoose
const mongoose = require("mongoose");

// забираємо строку підключення зі змінних оточення (.env) 
// mongodb+srv://Alonso:<PASSWORD>@cluster0.aguuluq.mongodb.net/contacts_list_data?retryWrites=true&w=majority
const {DB_HOST, PORT = 3000 } = process.env;


// через mongoose підключаємось до бази
mongoose.connect(DB_HOST)
// як тільки підключились до бази - запускаємо сервер
  .then(() => app.listen(PORT))
  .catch(error => {
    console.log(error.message);
    // якщо не вдалось підключитись - закриваємо всі процеси
    process.exit(1);
})

