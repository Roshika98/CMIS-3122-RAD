

const isAuth = (req, res, next) => {
    if (req.session.user_id) {
        var beginTime = req.session.timer;
        var currTime = Date.now();
        var diff = currTime - beginTime;
        if (diff > parseInt(process.env.ADMIN_TIMEOUT)) {
            req.flash('warning', 'Signed out due to inactivity');
            if (req.header['axios-request']) {

            } else {
                req.session.redirectURL = req.originalUrl;
                console.log(req.session.redirectURL);
                res.redirect('/courses/admin/login');
            }
        } else {
            req.session.timer = Date.now();
            next();
        }
    } else {
        res.redirect('/courses/admin/login');
    }
};



module.exports = { isAuth };