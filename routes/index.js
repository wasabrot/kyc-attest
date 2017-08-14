var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/healthcheck', function (req, res) {
  //res.setHeader({ 'Content-type': 'application/json; charset=utf-8' })
  res.json(router.getHealthcheck())
})

router.getHealthcheck= () => {
    return {"OK":true,"app":"index"}
}


module.exports = router;
