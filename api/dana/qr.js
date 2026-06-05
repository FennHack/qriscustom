export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { orderId, amount } = req.body;

  try {
    const body = {
      partnerReferenceNo: orderId,
      amount: {
        value: amount,
        currency: "IDR"
      }
    };

    // call DANA API
    const response = await fetch(`${process.env.DANA_BASE_URL}/v1.0/qr/qr-mpm-generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    // save order PENDING
    await db.orders.create({
      order_id: orderId,
      amount,
      status: "PENDING"
    });

    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
