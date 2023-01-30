const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = Schema({
    name: { type: String, required: true },
    email:{type: String ,  required: true},
    phone: { type: String, required: true },
     favorite: {
      type: Boolean,
      default: false,
    },
    
}, { versionKey: false, timestamps: true });

const joiSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.required(),
  email: Joi.string().email().required()
})

const favoriteJoiSchema = Joi.object({
  favorite: Joi.boolean().valid(false, true).required()
  
})

const Contact = model("contact", contactSchema);

module.exports = {
    Contact,
  joiSchema,
  favoriteJoiSchema,
}



// // + Comments==============================
// // моделі - це певні об'єкти, що працюють з БД за певною схемою
// // щоб створити модель - спочатку потрібно створити схему

// // забираємо ці 2 функції з mongoose
// const { Schema, model } = require("mongoose");
// const Joi = require("joi");

// // схема - це опис об'єкта, що буде в базі даних (в даному випадку об'єкт контактів)
// // важливо максимально правильно описати схему
// const contactSchema = Schema({
//     name: { type: String, required: true },
//     email:{type: String ,  required: true},
//     phone: { type: String, required: true },
//      favorite: {
//       type: Boolean,
//       default: false,
//     },
    

// }, { versionKey: false, timestamps: true });
// // { versionKey: false, timestamps: true } - в базі буде виводити: коли був створений об'єкт та оновлений


// // в цьому ж файлі використовуємо валідацію через Joi
// const joiSchema = Joi.object({
//   name: Joi.string().required(),
//   phone: Joi.required(),
//   email: Joi.string().email().required()
// })

// // окрема схема для валідації оновлення favorite=======================
// const favoriteJoiSchema = Joi.object({
//   favorite: Joi.boolean().valid(false, true).required()
  
// })


// // створюємо модель
// // перший аргумент - назва колекції в однині
// // другий аргумент - схема
// const Contact = model("contact", contactSchema);


// module.exports = {
//     Contact,
//   joiSchema,
//   favoriteJoiSchema,
// }