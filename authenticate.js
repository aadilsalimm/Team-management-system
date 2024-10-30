// middleware/authenticate.js
function isAuthenticated(req, res, next) {
    // Check if the session contains admin details (assuming `req.session.admin` is set upon login)
    if (req.session && req.session.admin) {
        return next(); // Allow access if authenticated
    } else {
        res.redirect('/admin'); // Redirect to the login page if not authenticated
    }
}

module.exports = isAuthenticated;
