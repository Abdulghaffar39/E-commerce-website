import multer from "multer";

const storage = multer.memoryStorage()

// single Upload
export const singleUpload = multer({storage}).single("file")

// muliple upload upto 5 images
export const mulipleupload = multer({storage}).array("files",5)