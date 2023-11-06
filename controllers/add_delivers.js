const fs = require("fs");

const add_delivers = function (req, res) {
  return new Promise(async function (resolve, reject) {
    try {
      const json = await fs.readFileSync(require.resolve("../data/Delivers.json"));

      const jsonObj = JSON.parse(json);
      jsonObj.push(req.body);

      const addDeliver = JSON.stringify(jsonObj, null, 2);

      await fs.writeFile(require.resolve("../data/Delivers.json"), addDeliver, (err) => {
        if (err) {
          throw err;
        } else {
          resolve({ message: "Successfully add deliver" });
        }
      });
    } catch (err) {
      reject(err.toString());
    }
  });
};

module.exports = {
  ServiceCall: async function (req, res) {
    try {
      const addedDeliver = await add_delivers(req, res);
      res.type("application/json").status(200).send(addedDeliver);
    } catch (err) {
      res.type("application/json").status(500).send(err);
    }
  },
};
