var express = require('express');

var router = express.Router();

router.get('/', function(req, res, next) {
  res.sendfile('./views/index.html');
});

router.get('/rmb', function(req, res, next) {
  res.sendfile('./views/rmb.html');
});

router.get('/hxw', function(req, res, next) {
  res.sendfile('./views/hxw.html');
});

router.get('/sw', function(req, res, next) {
  res.sendfile('./views/sw.html');
});

router.get('/tz', function(req, res, next) {
  res.sendfile('./views/tz.html');
});

module.exports = router;
