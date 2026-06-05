import { verifySignature } from "@/utils/signature";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const rawBody = JSON.stringify(req.body);
  const signature = req.headers["x-signature"];

  // 1. VERIFY SIGNATURE (WAJIB)
  const isValid = verifySignature(
    rawBody,
    signature,
    process.env.DANA_PUBLIC_KEY
  );

  if (!isValid) {
    return res.status(401).json({ message: "Invalid signature" });
  }

  const { partnerReferenceNo, transactionStatus } = req.body;

  try {

    // 2. IDEMPOTENT UPDATE
    const order = await db.orders.find(partnerReferenceNo);

    if (order.status === "PAID") {
      return res.status(200).json({
        responseCode: "2005400",
        responseMessage: "SUCCESS"
      });
    }

    // 3. UPDATE DATABASE
    if (transactionStatus === "SUCCESS") {
      await db.orders.update({
        order_id: partnerReferenceNo,
        status: "PAID",
        paid_at: new Date()
      });
    }

    res.status(200).json({
      responseCode: "2005400",
      responseMessage: "SUCCESS"
    });

  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
}
