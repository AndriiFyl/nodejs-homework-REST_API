const register = require("./register");
const login = require("./login");
const logout = require("./logout");

// робимо реекспорт
module.exports = {
    register,
    login,
    logout
}