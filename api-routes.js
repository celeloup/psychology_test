let router = require('express').Router();

router.get('/test', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!'
    });
});


var userController = require('./controllers/userController.js');
// User routes
router.route('/users')
    .get(userController.index)
    .post(userController.new);

router.route('/user/:email')
    .get(userController.getUser),

router.route('/user/dilemme')
    .put(userController.update_dilemme);

router.route('/user/annexe')
    .put(userController.update_annexe);

router.route('/user/mbti')
    .put(userController.update_mbti);

// Export API routes
module.exports = router;