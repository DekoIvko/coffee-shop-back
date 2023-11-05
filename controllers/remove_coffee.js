const fs = require('fs');

const remove_coffee = function (req, res) {
  return new Promise(async function (resolve, reject) {
    try {
      console.log(req.body);
      const json = await fs.readFileSync(
        require.resolve('../data/CoffeesOrdered.json')
      );
      const jsonObj = JSON.parse(json);
      const filterCoffees = jsonObj.filter(
        (coffee) => coffee.id !== req.body.id
      );

      const updatedCoffees = JSON.stringify(filterCoffees, null, 2);

      fs.writeFile(
        require.resolve('../data/CoffeesOrdered.json'),
        updatedCoffees,
        (err) => {
          if (err) {
            throw err;
          } else {
            resolve({ message: 'Successfully remove your coffee' });
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
      const removedCoffee = await remove_coffee(req, res);
      res.type('application/json').status(200).send(removedCoffee);
    } catch (err) {
      res.type('application/json').status(500).send(err);
    }
  },
};
