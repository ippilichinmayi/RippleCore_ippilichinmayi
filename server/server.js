const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const QRCode = require("qrcode");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json({verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  }));



const db = new sqlite3.Database("database.db");

db.run(`
  CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    payment_link_id TEXT,
    amount INTEGER,
    status TEXT DEFAULT 'PENDING',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

const razorpay = new Razorpay({
  key_id: "rzp_test_RyX9yL4cAxPOUu",
  key_secret: "yqs3WSAalHsdtU3V3c2LdfQu"
});


app.post("/api/create-payment", async (req, res) => {
  const { amount,note } = req.body;

  try {
    const paymentLink = await razorpay.paymentLink.create({
      amount: amount * 100, 
      currency: "INR",
      description: note || "General Payment",
      notify: { sms: false, email: false },
      callback_method: "get",
      expire_by: Math.floor(Date.now() / 1000) + 60*16
    });

    db.run(
      `INSERT INTO transactions (payment_link_id, amount) VALUES (?, ?)`,
      [paymentLink.id, amount]
    );

    const qrImage = await QRCode.toDataURL(paymentLink.short_url);

    res.json({
      qrImage,
      paymentLink: paymentLink.short_url
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Payment link creation failed" });
  }
});



app.post("/api/webhook/razorpay", (req, res) => {
  const secret = "WEBHOOK_SECRET";

  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(req.rawBody);
  const digest = shasum.digest("hex");

  if (digest !== req.headers["x-razorpay-signature"]) {
    return res.status(400).send("Invalid signature");
  }

  const body = JSON.parse(req.rawBody.toString());
  const event = body.event;
  const paymentLinkId = body.payload.payment_link.entity.id;

  if (event === "payment_link.paid") {
    db.run(
      `UPDATE transactions SET status='SUCCESS' WHERE payment_link_id=?`,
      [paymentLinkId]
    );
  }

  else if (
    event === "payment_link.cancelled" ||event === "payment_link.expired"||event!=="payment_link.paid"
  ) {
    db.run(
      `UPDATE transactions SET status='FAILED' WHERE payment_link_id=?`,
      [paymentLinkId]
    );
  }

  
  res.json({ status: "ok" });
});



app.get("/api/transactions", (req, res) => {
  db.all(
    `SELECT * FROM transactions ORDER BY id DESC`,
    [],
    (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json(rows);}
  );
});

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
