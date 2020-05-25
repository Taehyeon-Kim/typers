// TODO : user 미들웨어 설정 및 라우터에 반영
var express = require('express');
var router = express.Router();

const signin = require('./middleware/signin');
const signup = require('./middleware/signup');
const token = require('./middleware/token');

router.post('/',
  signup.create_user,
  signup.save_user,
  signup.response_to_user
);
router.post('/login',
  signin.validate_parameter,
  signin.compare_password,
  signin.create_jwt,
  signin.update_user_with_token,
  signin.response_to_user
);
router.get('/token',
  token.validate_parameter,
  token.verify_token,
  token.create_token,
  token.response_to_user
);

module.exports = router;
