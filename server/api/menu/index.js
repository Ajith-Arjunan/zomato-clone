import express from "express";
import { ImageModel } from "../../database/images";
import { MenuModel } from "../../database/menu";
import { ValidateId } from "../../validation/common.validation";

const Router = express.Router();


/**
 * Route : /list/:_id
 * Desc  : get all list of menu based on rest. id
 * Params: id
 * access: private
 * Method: GET
 */

Router.post("/list/:_id", async (req, res) => {
    try {
        const { _id } = req.params;
        await ValidateId(req.params);
        const menus = await MenuModel.findById(_id);
        if (!menus) {
            return res.status(404).json({ error: "No menu found for this id" });
        }
        return res.json({ menus });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
});

/**
 * Route : /image
 * Desc  : Get all menu images with rest. id
 * Params: id
 * access: private
 * Method: GET
 */

Router.get("/image/:_id", async (req, res) => {
    try {
        const { _id } = req.params;
        const menuImages = await ImageModel.findOne(_id);

        if (!menuImages) {
            return res.status(404).json({ message: "No menu images found" });
        }

        return res.json({ menuImages });


    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

export default Router;
