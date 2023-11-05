const fs = require('fs');

const update_coffee = function (req, res) {
  return new Promise(async function (resolve, reject) {
    try {
      const json = await fs.readFileSync(
        require.resolve('../data/CoffeesOrdered.json')
      );
      const jsonObj = JSON.parse(json);

      const filterCoffees = jsonObj.filter(
        (coffee) => coffee.id !== req.body.id
      );
      filterCoffees.push(req.body);

      const updatedCoffees = JSON.stringify(filterCoffees, null, 2);

      fs.writeFile(
        require.resolve('../data/CoffeesOrdered.json'),
        updatedCoffees,
        (err) => {
          if (err) {
            throw err;
          } else {
            resolve({ message: 'Successfully update your coffee' });
          }
        }
      );
    } catch (err) {
      reject(err.toString());
    }
  });
};

module.exports = {
  ServiceCall: async function (req, res) {
    try {
      const updatedCoffee = await update_coffee(req, res);
      res.type('application/json').status(200).send(updatedCoffee);
    } catch (err) {
      res.type('application/json').status(500).send(err);
    }
  },
};
