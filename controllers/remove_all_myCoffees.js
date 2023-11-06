const fs = require("fs");

const remove_all_myCoffees = function (req, res) {
  return new Promise(async function (resolve, reject) {
    try {
      const json = await fs.readFileSync(require.resolve("../data/CoffeesOrdered.json"));
      const jsonObj = JSON.parse(json);
      const filterCoffees = jsonObj.filter((el) => !req.body.includes(el.id));
      const updatedCoffees = JSON.stringify(filterCoffees, null, 2);

      fs.writeFile(require.resolve("../data/CoffeesOrdered.json"), updatedCoffees, (err) => {
        if (err) {
          throw err;
        } else {
          resolve({ message: "Successfully remove all your coffee" });
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
      const removedAllMyCoffee = await remove_all_myCoffees(req, res);
      res.type("application/json").status(200).send(removedAllMyCoffee);
    } catch (err) {
      res.type("application/json").status(500).send(err);
    }
  },
};
