
const isAuth = (req, res, next) => {
    if (req.session.user_id) {
        var beginTime = req.session.timer;
        var currTime = Date.now();
        var diff = currTime - beginTime;
        if (diff > 1000 * 60) {
            req.flash('warning', 'Signed out due to inactivity');
            res.redirect('/courses/admin/login');
        } else {
            req.session.timer = Date.now();
            next();
        }
    } else {
        res.redirect('/courses/admin/login');
    }
};



module.exports = { isAuth };