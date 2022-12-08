exports.now = () => {
  return new Date().toISOString().replace(/T/, " ").replace(/\..+/, "");
};
