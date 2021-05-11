const multer  = require("multer");
const fs = require('fs');
const Router = require('express').Router;

const imageRouter = Router();

imageRouter.route('/:path')
    .get(async function (req, res) {
        const path = "./uploads/" + req.params.path;
        fs.access(path, fs.constants.R_OK, err => {
            if(err){
                res.status(404).json({
                    message: "Изображение не найдено"
                });
            }
            else{
                fs.createReadStream(path).pipe(res);
            }
        });
    });

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