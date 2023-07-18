export const validateLogIn = (req, res, next) => {
    if (req.session.passport?.user) next();
    else res.status(401).json({ msg: 'tu sesion ha expirado, vuelve a loggearte' });
};