import express from "express";
import passport from "passport";
import { OrderModel } from "../../database/allModels";


const Router = express.Router();

/**
 * Route : /:_id
 * Desc  : Get all orders by user id
 * Params: id
 * access: public
 * Method: GET
 */

Router.get("/", passport.authenticate("jwt", { session: false }), async (req, res) => {

    try {
        const { user } = req.user;
        const getOrders = await OrderModel.findOne({ user: user })

        if (!getOrders) {
            return res.status(404).json({ error: "No previous order for this user" });
        }
        return res.status(200).json({ orders: getOrders })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
});

/**
 * Route : /new
 * Desc  : Add new order
 * Params: 
 * access: Private
 * Method: put
 */
Router.put("/new", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const { user } = req;
        const { orderDetails } = req.body;
        const addNewOrder = await OrderModel.findByIdAndUpdate({
            user: user._id,
        }, {
            $push: { orderDetails: orderDetails, },
        }, {
            new: true,
        });
        return res.json({ order: addNewOrder })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
});

export default Router;