export const isLoggedIn = (req, res, next) => {
    console.log(req.session)
    if (req.session.passport?.user) next();
    else res.status(401).json({ msg: 'your session is expired' });
};