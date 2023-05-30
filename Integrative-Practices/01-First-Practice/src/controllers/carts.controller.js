import { getAllCartsService, getCartByIdService, addProductsToCartService } from "../services/carts.service.js";

export const getAllCartsController = async (req, res, next) => {
    try {
        const docs = await getAllCartsService()
        res.json(docs);
    } catch (error) {
        next(error);
    }
}

export const getCartByIdController = async (req, res, next) => {
    try {
        const { cartid } = req.params
        const doc = await getCartByIdService(cartid)
        res.json(doc);
    } catch (error) {
        next(error);
    }
}

export const addProductsToCartController = async (req, res, next) => {
    try {
        const { cartid } = req.params;
        const { prodid } = req.body;
        const doc = await addProductsToCartService(cartid, prodid)
        res.json(doc)
    } catch (error) {
        next(error);
    }
}