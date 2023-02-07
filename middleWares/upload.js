// імпортуємо сюди пакет multer - робить трансформацію інфи, що передається з фронта на бек в
// правильний формат (з json -> в файл)
const multer = require("multer");
const path = require("path");


// в корені проєкту створюємо папку temp (буферна, проміжна папка, в якій тимчасово будуть зберігатись файли, що передаються з фронта)
//  під часу пушу на гітхаб пусті папки не передаються (ігноруються), але при повторному клоні даного проєкту на ПК,
// ця папка для нас важлива. Тому щоб передати її на ГІт, ми просто додаємо порожній файл .gitkeep. І і в разі повторного клонування
// проєкту - нічого не зламається (дана папка буде у нас в проєкті)


// також в корені проєкту створюємо папку public, всередині якої буде папка avatars - куди і будуть перезаписуватись файли з
// проміжної папки temp

// tempDir - шлях до папки temp
// __dirname - шлях до даного файлу: C:\Users\Windows\Documents\GitHub\nodejs-homework-REST_API\middleWares
// оскільки папка "temp" знаходиться на рівень вище, ділі вказуємо: "../"
// останнім параметром - безпосередньо назву папки, куди будемо тимчасово зберігати файли 
const tempDir = path.join(__dirname, "../", "temp");


// створюємо об'єкт налаштувань для multer (налаштування для middleware)
const multerConfiq = multer.diskStorage({
    // destination - вказуємо, де будемо зберігати інформацію
    destination: (req, file, cb) => {
        // tempDir - шлях до тимчасового сховища файлів (буферної папки)
        cb(null, tempDir)
    },
    // filename - вказуємо, під яким ім'ям збережемо файл
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
    // limits - обмеження по вазі файла
    limits: {
        fileSize: 2048
    }
})


// maddleware upload
const upload = multer({
storage: multerConfiq
})

// експортуємо

module.exports = upload;