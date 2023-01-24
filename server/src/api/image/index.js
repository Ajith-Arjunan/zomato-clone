import express from "express";
import AWs from "aws-sdk";
import multer from "multer";

import { ImageModel } from "../../database/allModels";

import { s3Upload } from "../../utils/s3";

const Router = express.Router();

// configure Multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

/**
 * Route : /:_id
 * Desc  : Get images based on ID
 * Params: _id
 * access: Public
 * Method: GET
 */
Router.get("/:_id", async (req, res) => {
    try {
        const image = await ImageModel.findById(req.params._id);
        return res.json({ image });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/**
 * Route : /
 * Desc  : Upload given image to s3 and DB
 * Params: 
 * access: Public
 * Method: POST
 */
Router.post("/", upload.single("file"), async (req, res) => {
    try {
        const file = req.file
        const bucketOptions = {
            Bucket: "zomato-clone",
            Key: file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: "public-read",
        }
        const uploadImage = await s3Upload(bucketOptions);

        // Uploading images to DB
        const dbUpload = await ImageModel.create({
            images: [
                {
                    location: uploadImage.location
                },
            ],
        });
        return res.status(200).json({ dbUpload });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default Router;