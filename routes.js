let router = require('express').Router();
var userController = require('./controller/userController.js');
const path = require('path');

router.route('/api/users')
    .get(userController.index)
    .post(userController.new);

router.route('/api/user/:email')
    .get(userController.getUser),

router.route('/api/user/dilemme')
    .put(userController.update_dilemme);

router.route('/api/user/annexe')
    .put(userController.update_annexe);

router.route('/api/user/mbti')
    .put(userController.update_mbti);

router.use(function(req, res) {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

// Export API routes
module.exports = router;