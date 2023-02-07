const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");

// Саме в даному контролері ми і маємо визначити, куди далі потрібно перемістити файли з папки temp (де ми їх тимчасово зберігали)

// змінна avatarsDir - шлях до аватару в папці з постійним зберіганням файлів
const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
    // в req.file - зберігається інфо, яку ми отримали
    const { path: tempUpload, originalname } = req.file;
    // витягуємо id
    const { _id: id } = req.user;
    const imageName = `${id}_${originalname}`
    try {
        const resultUpload = path.join(avatarsDir, imageName);
        // переміщуємо з тимчасового сховища (temp) до постійного (avatars)
        await fs.rename(tempUpload, resultUpload);
        // якщо зображення вдало перемістили, то створюємо шлях та прикріпляємо id юзера до назви файлу (щоб не перезаписувались однаковы назви)
        const avatarURL = path.join("public", "avatars",  imageName);
        // і відповідно зберігаємо в БД (інфу - шлях до зображення)
        await User.findByIdAndUpdate(req.user._id, { avatarURL });
        // і у відповідь надсилаємо посилання на аватар
        res.json({ avatarURL });
    } catch (error) {
        // якщо не виходить перемістити до папки avatars, то просто видаляэмо файл з тимчасової папки
        await fs.unlink(tempUpload);
        throw error;
        
    }

    
}


module.exports = updateAvatar;