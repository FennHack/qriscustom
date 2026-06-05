export default async function handler(req, res) {

  const { orderId } = req.query;

  const order = await db.orders.find(orderId);

  if (!order) {
    return res.status(404).json({ message: "Not found" });
  }

  res.status(200).json(order);
}
