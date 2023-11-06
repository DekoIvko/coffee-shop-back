const fs = require("fs");

const add_coffees = function (req, res) {
  return new Promise(async function (resolve, reject) {
    try {
      const json = await fs.readFileSync(require.resolve("../data/CoffeesOrdered.json"));

      const jsonObj = JSON.parse(json);
      jsonObj.push(req.body);

      const addCoffee = JSON.stringify(jsonObj, null, 2);

      await fs.writeFile(require.resolve("../data/CoffeesOrdered.json"), addCoffee, (err) => {
        if (err) {
          throw err;
        } else {
          resolve({ message: "Successfully add your coffee" });
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
      const addedCoffee = await add_coffees(req, res);
      res.type("application/json").status(200).send(addedCoffee);
    } catch (err) {
      res.type("application/json").status(500).send(err);
    }
  },
};
