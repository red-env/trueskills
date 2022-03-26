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
    message.status = false;
    message.result = e.message || e;
    if(e.code) message.code = e.code;
  }
  console.log(
    new Date().toLocaleDateString(),
    new Date().toLocaleTimeString(),
    "\t",
    message
  ); // TODO LOG
  res.json(message);
};