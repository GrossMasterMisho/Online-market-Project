const orderService = require("../services/orderService");

module.exports = {
  getOrders: async (req, res) => {
    if (!req.user) return;
    const orders = await orderService.getOrders(req.user._id);
    if (orders) {
      res.json(orders);
    } else {
      res.json([]);
    }
  },

  addOrders: async (req, res) => {
    const status = orderService.addOrders(req.body, req.user._id);
    status
      .then(function () {
        res.status(200).send("Inserted Data"); // Success
      })
      .catch(function (error) {
        res.status(200).send(error); // Failure
      });
  },
};
