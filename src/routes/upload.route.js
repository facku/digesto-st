const express = require('express');
const fs = require('fs');
const path = require('path');

const db = require('../database');

const Response = require('../utils/responses');

const router = express.Router();

const folder = path.join(__dirname, '..', '..', 'public', 'uploads');

if (!fs.existsSync(folder)) {
  fs.mkdirSync(folder);
}

if (
  !fs.existsSync(path.join(__dirname, '..', '..', 'public', 'uploads', 'crops'))
) {
  fs.mkdirSync(path.join(__dirname, '..', '..', 'public', 'uploads', 'crops'));
}

router.post('/', async (req, res) => {
  try {
    const fileName = Object.keys(req.files)[0];

    const file = req.files[fileName];

    if (file.mimetype !== 'application/pdf') {
      return Response.fail(res, { message: 'Solo se admiten documentos PDF' });
    }

    await file.mv(path.join(folder, file.md5 + '.pdf'));

    const isStored = await db.upload.find({ hash: file.md5 });

    if (isStored.length === 0) {
      //Guardar en Mongo
      const upload = new db.upload({
        name: file.name,
        size: file.size,
        hash: file.md5,
      });
      await upload.save();
    }

    return Response.ok(res, {
      uid: file.md5,
    });
  } catch (error) {
    return Response.fail(res, { error });
  }
});

router.get('/:uid/crops', async (req, res) => {
  // const crops = await db.expte.find({
  //   source: req.bodyuid,
  //   pages,
  // });
  const { uid } = req.params;

  const crops = await db.expte.find({
    source: uid,
  });

  Response.ok(res, {
    uid,
    crops,
  });
});

module.exports = router;
