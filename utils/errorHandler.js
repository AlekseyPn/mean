module.exports = (error, res) => {
  res.status(500).json({ message: error.message ? error.message : error, success: false });
};
