const multer = require('multer');
const path = require("path");
const ApiError = require('../errors/ApiError');
const httpStatus = require('http-status');
const config = require('../config');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');


cloudinary.config({
    cloud_name: config.cloudinary.cloud_name,
    api_key: config.cloudinary.api_key,
    api_secret: config.cloudinary.api_secret
});

function sanitizeFilename(filename) {
    // Use a regular expression to replace all periods (.) and spaces with an empty string
    return filename.replace(/[.\s]/g, '-');
}

const date = new Date();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/")
    },
    filename: function (req, file, cb) {
        //* file extension
        const fileExt = path.extname(file.originalname);


        /**
         * * Create file name. 
         * * Example: year-month-date_hour-minutes-seconds-milliseconds_filename
         * * Example: 2024-02-11_18-06-20-305_xyz
         */

        // const fileName = `D_${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate()}_T_${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}-${date.getMilliseconds()}_${file.originalname.replace(fileExt, "").split(" ").join("-").toLowerCase()}`;

        // cb(null, fileName + fileExt); //* Example: 2024-02-11_18-06-20-305_xyz.extension

        const fileName = sanitizeFilename(file.originalname).replace(fileExt, "") + "-" + Date.now();
        cb(null, fileName + fileExt); //* Example: filename-time.extension
    },
})

// const fileFilter = (req, file, cb) => {
//     if (/* file.mimetype !== "image/webp" &&  */file.fieldname === "husbandPic" || file.fieldname === "wifePic") {
//         if (file.mimetype !== "image/jpg" && file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
//             cb(new ApiError(httpStatus.NOT_ACCEPTABLE, "Only jpg, and jpeg format are allowed!"))
//         }
//     }
//     else if (/* file.mimetype !== "image/webp" &&  */file.fieldname === "nid" || file.fieldname === "doc") {
//         if (file.mimetype !== "application/pdf") {
//             cb(new ApiError(httpStatus.NOT_ACCEPTABLE, "Only pdf format is allowed!"))
//         }
//     }
//     else if (file.fieldname === "xlsxFile") {
//         if (file.mimetype !== "application/vnd.ms-excel" && file.mimetype !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
//             cb(new ApiError(httpStatus.NOT_ACCEPTABLE, "Only xls, and xlsx format is allowed!"))
//         }
//     }
//     else {
//         if (file.mimetype !== "image/webp" && file.mimetype !== "image/jpg" && file.mimetype !== "image/jpeg" && file.mimetype !== "image/png" && file.mimetype !== "image/svg+xml") {
//             cb(new ApiError(httpStatus.NOT_ACCEPTABLE, "Only jpg, and jpeg format are allowed!"))
//         }
//     }

//     cb(null, true)
// }

const fileFilter = (req, file, cb) => {
    const allowedTypes = {
        husbandPic: ["image/jpg", "image/jpeg", "image/png"],
        wifePic: ["image/jpg", "image/jpeg", "image/png"],
        nid: ["application/pdf"],
        doc: ["application/pdf"],
        xlsxFile: ["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
        default: ["image/webp", "image/jpg", "image/jpeg", "image/png", "image/svg+xml"] // Default allowed types
    };

    const validateFileType = (fieldname, mimetype) => {
        const allowed = allowedTypes[fieldname] || allowedTypes.default;
        return allowed.includes(mimetype);
    };

    const sendError = (message) => {
        cb(new ApiError(httpStatus.NOT_ACCEPTABLE, message));
    };

    switch (file.fieldname) {
        case "husbandPic":
        case "wifePic":
            if (!validateFileType(file.fieldname, file.mimetype)) {
                sendError("Only jpg, jpeg, and png formats are allowed for profile pictures!");
                return;
            }
            break;
        case "nid":
        case "doc":
            if (!validateFileType(file.fieldname, file.mimetype)) {
                sendError("Only PDF format is allowed for documents!");
                return;
            }
            break;
        case "xlsxFile":
            if (!validateFileType(file.fieldname, file.mimetype)) {
                sendError("Only xls and xlsx formats are allowed for spreadsheet files!");
                return;
            }
            break;
        default:
            if (!validateFileType("default", file.mimetype)) {
                sendError("Only jpg, jpeg, png, webp, and svg formats are allowed!");
                return;
            }
            break;
    }

    cb(null, true);
}


const upload = multer({
    storage: storage,
    limits: {
        fileSize: 7000000, // 4MB
    },
    fileFilter
});

//* upload file in cloudinary
const uploadToCloudinary = async (file, folder = "my_folder") => {
    try {
        // Extract the file name without the extension
        const fileNameWithoutExt = path.parse(file.filename).name;

        // console.log(file)
        const result = await cloudinary.uploader.upload(file.path, {
            public_id: fileNameWithoutExt,
            folder: `nec_money_com/${folder}`,
            pages: true
        });

        // console.log(result.url)
        fs.unlinkSync(file.path) //* remove image from upload folder

        return result.url;
    } catch (error) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Cloudinary error");
    }
}

//* delete file from cloudinary
const destroyFromCloudinary = async (url) => {
    const fileExt = path.extname(url); //* file extension

    const newURL = url.replace(fileExt, "").replace("http://res.cloudinary.com/", "").split("/");

    let publicID;

    if (newURL.length > 5) {
        publicID = newURL.slice(4, newURL.length).join("/"); //* get public id from url
    } else {
        publicID = newURL[newURL.length - 1]; //* get public id from url
    }

    // console.log(publicID);
    /* const result = */ await cloudinary.uploader.destroy(publicID);
    // console.log(result)
}

// const uploadPDFToCloudinary = async (file, folder = "my_folder") => {
//     // console.log(file)

//     try {
//         // console.log(file)
//         const result = await cloudinary.uploader.upload(file.path, { folder: "documents", pages: true });
//         fs.unlinkSync(file.path) //* remove image from upload folder(locally)

//         console.log(result.url)

//         return result.url;
//     } catch (error) {
//         throw new ApiError(httpStatus.NOT_IMPLEMENTED, "Cloudinary error")
//     }
// }


exports.fileUploadHelpers = { upload, uploadToCloudinary, destroyFromCloudinary, /* uploadPDFToCloudinary */ }