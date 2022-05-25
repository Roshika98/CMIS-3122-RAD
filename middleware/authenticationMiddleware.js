
const isAuth = (req, res, next) => {
    if (req.session.user_id) {
        next();
    } else {
        res.redirect('/courses/admin/login');
    }
}

module.exports = { isAuth };