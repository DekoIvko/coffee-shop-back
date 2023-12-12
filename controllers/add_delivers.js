const fs = require("fs");
const EventEmitter = require("events");

const remove_all_myCoffees = function (myCoffees) {
  return new Promise(async function (resolve, reject) {
    try {
      fs.readFile(require.resolve("../data/CoffeesOrdered.json"), (error, data) => {
        if (error) throw error;
        const jsonObj = JSON.parse(data);
        const filterCoffees = jsonObj.filter((el) => !myCoffees.includes(el.id));
        const updatedCoffees = JSON.stringify(filterCoffees, null, 2);

        fs.writeFile(require.resolve("../data/CoffeesOrdered.json"), updatedCoffees, (err) => {
          if (err) {
            throw err;
          } else {
            resolve(true);
          }
        });
      });
    } catch (err) {
      reject(err.toString());
    }
  });
};

const add_delivers = function (req, res) {
  return new Promise(async function (resolve, reject) {
    try {
      const emitter = new EventEmitter();
      fs.readFile(require.resolve("../data/Delivers.json"), (error, data) => {
        if (error) throw error;
        const jsonObj = JSON.parse(data);
        jsonObj.push(req.body.deliver);

        const addDeliver = JSON.stringify(jsonObj, null, 2);

        fs.writeFile(require.resolve("../data/Delivers.json"), addDeliver, (err) => {
          if (err) {
            throw err;
          } else {
            console.log("deko add delivers");
            emitter.emit("add-deliver", addDeliver);
            resolve({ message: "Successfully add deliver" });
          }
        });
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
