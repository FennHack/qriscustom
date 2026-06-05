export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).end();
  }

  console.log("DISBURSE CALLBACK:", req.body);

  const { status, referenceNo } = req.body;

  if (status === "SUCCESS") {
    await db.withdrawals.update({
      reference_no: referenceNo,
      status: "SUCCESS"
    });
  }

  res.status(200).json({
    responseCode: "2000000",
    responseMessage: "SUCCESS"
  });
}
