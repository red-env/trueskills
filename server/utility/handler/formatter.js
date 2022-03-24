module.exports = (callback) => async (req, res) => {
  const message = {
    status: false,
    result: null,
  };
  try {
    const data = await callback(req);
    message.status = true;
    message.result = data;
  } catch (error) {
    message.status = false;
    message.result = error;
  }
  console.log(
    new Date().toLocaleDateString(),
    new Date().toLocaleTimeString(),
    "\t",
    message
  ); // TODO LOG
  res.send(message);
};