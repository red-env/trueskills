const dict_eccezioni = require("../dictionary/eccezioni.json");

module.exports = (callback) => async (req, res, next) => {
  const message = {
    status: false,
    result: null,
  };
  try {
    const data = await callback(req);
    if (data === undefined) {
      next();
      return;
    }
    message.status = true;
    message.result = data;
  } catch (e) {
    throw e; // TODO DEV
    message.status = false;
    message.result = dict_eccezioni[e.message] || e.message || e;
    message.code = e.code;
  }
  console.log(
    new Date().toLocaleDateString(),
    new Date().toLocaleTimeString(),
    "\t",
    message
  ); // TODO LOG
  res.json(message);
};