export default async function handler(req, res) {

  const { orderId } = req.body;

  const order = await db.orders.find(orderId);

  if (order.status !== "PAID") {
    return res.status(400).json({ message: "Cannot refund" });
  }

  // call DANA refund API (if enabled)
  res.json({ message: "Refund requested" });
}
