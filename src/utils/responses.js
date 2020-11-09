const Response = {
  ok: (res, data) => {
    return res.json({
      ok: true,
      ...data,
    });
  },
  fail: (res, data) => {
    return res.json({
      ok: false,
      ...data,
    });
  },
};

module.exports = Response;
