module.exports = function(app) {
    var userController = require('../controllers/user.controller');
    const passport = require('passport');

    app.route('/user')
        .get(userController.list_all_users)
        .post(userController.create_new_user)
        .put(userController.update_user)
        .delete(userController.invalidate_user);
    app.route('/user/register')
        .post(userController.create_new_user)
        // Authenticate
    app.post('/user/authenticate', userController.authenticateUser);
    //  Profile
    app.get('/user/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
        console.log('profile request');
        res.json({ user: req.user });
    });
    app.route('/user/:userId')
        .get(userController.get_users);
}