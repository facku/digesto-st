const express = require('express');
const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');

const db = require('../database');

const Response = require('../utils/responses');

const router = express.Router();

const folder = path.join(__dirname, '..', '..', 'public', 'uploads');

router.post('/', async (req, res) => {
  const { pages, uid } = req.body;

  const fullPath = path.join(folder, uid + '.pdf');

  const cover = await PDFDocument.load(fs.readFileSync(fullPath));

  const doc = await PDFDocument.create();

  const contentPages = await doc.copyPages(cover, cover.getPageIndices());

  let cont = 1;

  for (const page of contentPages) {
    if (cont >= pages.min && cont <= pages.max) {
      doc.addPage(page);
    }
    cont++;
  }

  const exist = await db.expte.find({
    source: uid,
    pages,
  });

  if (exist.length === 0) {
    let expte = new db.expte({
      source: uid,
      pages,
    });

    const createdExpte = await expte.save();

    console.log(createdExpte);

    const pdfPath = fs.writeFileSync(
      path.join(folder, 'crops', `${uid}_${pages.min}_${pages.max}.pdf`),
      await doc.save()
    );
  }

  return Response.ok(res, { pdf: `${uid}_${pages.min}_${pages.max}` });
});

module.exports = router;
