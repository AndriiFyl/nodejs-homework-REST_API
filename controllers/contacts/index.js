const getAll = require("./getAll");
const getById = require("./getById");
const addContact = require("./addContact");
const updateContactById = require("./updateContactById");
const removeContactById = require("./removeContactById");
const updateStatusContact = require("./updateStatusContact");

module.exports = {
    getAll,
    getById,
    addContact,
    updateContactById,
    removeContactById,
    updateStatusContact,
}