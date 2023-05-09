
export const productValidator = (req, res, next) => {
    const product = req.body
    const { title, description, code, price, status, stock, category } = product

    if (title, description, code, price, status, stock, category !== undefined) {
        next()
    } else {
        res.status(404).json({
            message: 'Please fill all the fields, fields: title, description, code, price, status, stock, category'
        })
    }
}