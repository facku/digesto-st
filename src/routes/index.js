/**
 * TODO:
 * hacer algo
 */

const express = require('express');

const auth = require('./auth.route');
const upload = require('./upload.route');
const makeSection = require('./makeSection.route');

const router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  // console.log('Time: ', Date.now(), req.headers);
  next();
});

router.get('/', (req, res) => res.json({ msg: 'funciona' }));

router.use('/auth', auth);

router.use('/upload', upload);

router.use('/makeSection', makeSection);

module.exports = router;
