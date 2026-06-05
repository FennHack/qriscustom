app.post('/api/dana/finish-payment', (req, res) => {
    console.log("PAYMENT:", req.body);

    // TODO: update database transaksi = PAID

    res.status(200).json({
        responseCode: "2005400",
        responseMessage: "SUCCESS"
    });
});
