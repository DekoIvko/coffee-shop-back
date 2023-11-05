const get_my_coffees = function (req, res) {
  return new Promise(async function (resolve, reject) {
    try {
      const myCoffees = require('../data/CoffeesOrdered.json');
      resolve(myCoffees);
    } catch (err) {
      reject(err.toString());
    }
  });
};

module.exports = {
  ServiceCall: async function (req, res) {
    try {
      const myCoffees = await get_my_coffees(req, res);
      res.type('application/json').status(200).send(myCoffees);
    } catch (err) {
      res.type('application/json').status(500).send(err);
    }
  },
};
