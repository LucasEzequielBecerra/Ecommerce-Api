import { getAllService, getByIdService, createService, updateService, deleteByIdService, deleteAllService } from "../services/products.services.js";

export const getAllController = async (req, res, next) => {
    try {
        const docs = await getAllService()
        res.json(docs)
    } catch (error) {
        next(error)
    }
}
export const getByIdController = async (req, res, next) => {
    try {
        const { id } = req.params
        const doc = await getByIdService(id)
        res.json(doc)
    } catch (error) {
        next(error)
    }
}
export const createController = async (req, res, next) => {
    try {
        const { name, description, price, stock } = req.body
        const newdoc = await createService({ name, description, price, stock })
        res.json(newdoc)
    } catch (error) {
        next(error)
    }
}
export const updateController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, description, price, stock } = req.body;
        await getByIdService(id);
        const docUpd = await updateService(id, {
            name, description, price, stock
        });
        res.json(docUpd);
    } catch (error) {
        next(error);
    }
};
export const deleteByIdController = async (req, res, next) => {
    try {
        const { id } = req.params;
        await deleteByIdService(id);
        res.json({ message: 'Product deleted successfully!' })
    } catch (error) {
        next(error);
    }
};
export const deleteAllController = async (req, res, next) => {
    try {
        await deleteAllService()
        res.json({ message: 'Products deleted successfully' })
    } catch (error) {
        next(error)
    }
}