const fs = require("fs");

const remove_all_myCoffees = function (myCoffees) {
  return new Promise(async function (resolve, reject) {
    try {
      const json = await fs.readFileSync(require.resolve("../data/CoffeesOrdered.json"));
      const jsonObj = JSON.parse(json);
      const filterCoffees = jsonObj.filter((el) => !myCoffees.includes(el.id));
      const updatedCoffees = JSON.stringify(filterCoffees, null, 2);

      fs.writeFile(require.resolve("../data/CoffeesOrdered.json"), updatedCoffees, (err) => {
        if (err) {
          throw err;
        } else {
          resolve(true);
        }
      });
    } catch (err) {
      reject(err.toString());
    }
  });
};

const add_delivers = function (req, res) {
  return new Promise(async function (resolve, reject) {
    try {
      const json = await fs.readFileSync(require.resolve("../data/Delivers.json"));

      const jsonObj = JSON.parse(json);
      jsonObj.push(req.body.deliver);

      const addDeliver = JSON.stringify(jsonObj, null, 2);

      await fs.writeFile(require.resolve("../data/Delivers.json"), addDeliver, async (err) => {
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
      const removeMyCoffees = await remove_all_myCoffees(req.body.myCoffees);

      Promise.all([addedDeliver, removeMyCoffees]).then((values) => {
        res.type("application/json").status(200).send(values[0]);
      });
    } catch (err) {
      res.type("application/json").status(500).send(err);
    }
  },
};
