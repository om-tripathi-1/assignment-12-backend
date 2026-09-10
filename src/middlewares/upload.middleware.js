import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const uploadFolder = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../assets",
);
const maxImageSize = 5 * 1024 * 1024;
const acceptedImageTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
]);

if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  if (acceptedImageTypes.has(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, JPEG, PNG, WebP, GIF, and AVIF images are allowed"), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: maxImageSize,
  },
});
