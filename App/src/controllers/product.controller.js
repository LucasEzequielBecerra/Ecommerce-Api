import * as service from '../services/product.service.js'

export const addProductController = async (req, res, next) => {
    try {
        const prod = { ...req.body }
        const newProd = await service.addProductService(prod)
        if (!newProd) throw new Error('validation error')
        else res.json(newProd)
    } catch (error) {
        next(error)
    }
}

export const getAllProductsController = async (req, res, next) => {
    try {
        const { page, limit } = req.query;
        const response = await service.getAllProductsService(page, limit)
        // console.log(response.docs)
        const next = response.hasNextPage ? `http://localhost:8080/api/products?page=${response.nextPage}` : null
        const prev = response.hasPrevPage ? `http://localhost:8080/api/products?page=${response.prevPage}` : null
        const productsFile = ({
            status: "success",
            payload: response.docs,
            totalPages: response.totalPages,
            prevPage: response.prevPage,
            nextPage: response.nextPage,
            page: response.page,
            hasPrevPage: response.hasPrevPage,
            hasNextPage: response.hasNextPage,
            prevLink: prev,
            nextLink: next
        })
        res.json({ productsFile })
    } catch (error) {
        next(error)
    }
}

// export const addProductsToCart = async (req, res, next) => {
//     try {
//         const { idCart } = req.params
//         const { idProduct } = req.params
//         const newProduct = await service.addProductsToCart(idCart, idProduct)
//         res.json(newProduct)
//     } catch (error) {
//         next(error)
//     }
// }

// export const getByIdController = async (req, res, next) => {
//     try {
//         const { id } = req.params
//         const doc = await service.getByIdService(id)
//         res.json(doc)
//     } catch (error) {
//         next(error)
//     }
// }

// export const updateController = async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         const { name, description, price, stock } = req.body;
//         await getByIdService(id);
//         const docUpd = await updateService(id, {
//             name, description, price, stock
//         });
//         res.json(docUpd);
//     } catch (error) {
//         next(error);
//     }
// };

// export const deleteByIdController = async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         await deleteByIdService(id);
//         res.json({ message: 'Product deleted successfully!' })
//     } catch (error) {
//         next(error);
//     }
// };

// export const deleteAllController = async (req, res, next) => {
//     try {
//         await deleteAllService()
//         res.json({ message: 'Products deleted successfully' })
//     } catch (error) {
//         next(error)
//     }
// }