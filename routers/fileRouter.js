const multer  = require("multer");
const Router = require('express').Router;

const imageRouter = Router();

imageRouter.route('/')
    .post(async function (req, res) {
        console.log(req.file)
        if(!req.file)
            res.status(500).json({
                message: "Ошибка при загрузке файла"
            });
        else {
            res.status(200).json({
                message: "Изображение загружено"
            });
        }
    });


const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "uploads");
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === "image/png" ||
        file.mimetype === "image/jpg"||
        file.mimetype === "image/jpeg"){
        cb(null, true);
    }
    else{
        cb(null, false);
    }
}

module.exports = { imageRouter, fileFilter, storageConfig };