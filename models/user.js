const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlenght: 6
    },
    subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: {
    type: String,
    default: null
  },
  avatarURL: {
    type: String,
    required: true
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
  }

}, { versionKey: false, timestamps: true });

// { versionKey: false, timestamps: true } :
// versionKey: false - в БД не буде показувати версію
// timestamps: true  - в БД буде показувати час створення та оновлення

// схема для реєстрації
// joi проводить валідацію перед БД (до БД він не має відношення)
const joiRegisterSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string()
})

// схема для логіна
const joiLoginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required()
})


// схема верифікації емейла юзера
const verifyEmailSchema = Joi.object({
  email: Joi.string().required(),
})

// модель (до колекції під назвою user застосується userSchema - для валідації)
const User = model("user", userSchema);

module.exports = {
    User,
  joiRegisterSchema,
  joiLoginSchema,
  verifyEmailSchema
}