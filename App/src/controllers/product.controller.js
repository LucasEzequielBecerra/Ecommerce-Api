import factory from '../persistence/factory.js'
const { userManager } = factory
import * as services from '../services/product.service.js'
import { HttpResponse } from '../utils/http.response.util.js'
import { logger } from '../utils/logger.util.js'
const httpResponse = new HttpResponse()



export const getAllProductsController = async (req, res, next) => {
    try {
        const { page, limit } = req.query;
        const response = await services.getAllProductsService(page, limit)
        if (!response) return httpResponse.NotFound(res, "products not found")
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
        return httpResponse.Ok(res, productsFile, 'All products found')
    } catch (error) {
        next(error.message)
    }
}

export const getByIdController = async (req, res, next) => {
    try {
        const { pid } = req.params
        const doc = await services.getByIdService(pid)
        if (!doc) httpResponse.NotFound(res, `The product whit id ${pid} not found`)
        else return httpResponse.Ok(res, doc, 'Product found')
    } catch (error) {
        next(error.message)
    }
}

export const addProductController = async (req, res, next) => {
    try {
        const { email, role } = await userManager.getUserById(req.session.passport.user)
        const prod = { ...req.body, owner: role === 'admin' ? role : email }
        const newProd = await services.addProductService(prod)
        if (newProd) httpResponse.Ok(res, newProd, 'Product added successfully')
        else httpResponse.NotFound(res, 'Product has not been added successfully')
    } catch (error) {
        next(error.message)
    }
}

export const deleteByIdController = async (req, res, next) => {
    try {
        const user = await userManager.getUserById(req.session.passport.user)
        const { pid } = req.params;
        const response = await services.deleteByIdService(pid, user)
        if (response) httpResponse.Ok(res, response, 'Product deleted successfully!')
        else httpResponse.Forbidden(res, 'The product has not been deleted')
    } catch (error) {
        next(error.message);
    }
};

export const deleteAllController = async (req, res, next) => {
    try {
        const response = await services.deleteAllService()
        if (response) return httpResponse.Ok(res, 'Products deleted successfully')
        else return httpResponse.NotFound(res, 'Products has not deleted')
    } catch (error) {
        next(error.message)
    }
}


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
// logger.error('controller error: ')
//         next(error.message);
//     }
// };
