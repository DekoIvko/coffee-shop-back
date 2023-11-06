const get_delivers = function (req, res) {
  return new Promise(async function (resolve, reject) {
    try {
      const delivers = require("../data/Delivers.json");
      resolve(delivers);
    } catch (err) {
      reject(err.toString());
    }
  });
};

module.exports = {
  ServiceCall: async function (req, res) {
    try {
      const delivers = await get_delivers(req, res);
      res.type("application/json").status(200).send(delivers);
    } catch (err) {
      res.type("application/json").status(500).send(err);
    }
  },
};
