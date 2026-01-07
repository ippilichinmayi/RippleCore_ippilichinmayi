import { useState } from "react";
import "./QRGenerator.css";
import { useNavigate } from "react-router-dom";

function QRGenerator() {
  const [amount, setAmount] = useState("");
  const[note, setNote]=useState("");
  const [qrImage, setQrImage] = useState("");
  const navigate = useNavigate();

  async function generateQR() {
    if (!amount) {
      alert("Amount is required");
      return;
    }

    const res = await fetch("http://localhost:4000/api/create-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount,note })
    });

    const data = await res.json();

    if (data.error) {
      alert(data.error);
      return;
    }

    setQrImage(data.qrImage);
  }

  return (
    <div className="page">
    <div className="card">
    <h1>RippleCore</h1>
    <p>Payments powered by Razorpay</p>

      
        <input
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

       <input
          placeholder="Enter a Note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <button onClick={generateQR}>Generate QR</button>

        <button onClick={() => navigate("/dashboard")}>
          Go to Dashboard
        </button>

        {qrImage && (
          <div className="qr-section">+
            <h3>Scan to Pay</h3>
            <img  src={qrImage} alt="QR Code" />
          </div>
        )}
      </div>
    </div>
  );
}

export default QRGenerator;
