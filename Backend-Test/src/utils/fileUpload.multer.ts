import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../', "uploads"))
    },
    filename: (req, file, cb) => {
        const fileExtension = path.extname(file.originalname);
        cb(null, file.fieldname + "-" + Date.now() + fileExtension)
    },
});

const upload = multer({
    storage: storage,
    fileFilter(req, file, cb) {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpeg") {
            cb(null, true);
        }
        else {
            cb(null, false);
            cb(new Error("Only png and jpg format allowed"))
        }
    },
})

export const singleImageUpload = upload.single("image");