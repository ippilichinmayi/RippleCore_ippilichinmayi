# RippleCore

RippleCore is a full-stack QR-based payment request platform that allows merchants to generate UPI payment QR codes and track payment status in real time. It simplifies digital payments by allowing customers to pay directly by scanning a QR code instead of manually entering payment details.

---

## Problem

Traditional UPI payments require customers to:

- Open a payment application
- Enter the merchant's UPI ID
- Enter the payment amount
- Verify the details before paying

This process is time-consuming and prone to typing errors.

RippleCore solves this problem by generating a QR code containing all the required payment information. Customers simply scan the QR code and complete the payment instantly.

---

##  Features

-  Generate QR codes for payment requests 
-  Real-time payment status tracking
-  Automatic payment verification through Razorpay Webhooks
-  Payment history storage
-  Transaction dashboard
-  Automatic handling of expired and cancelled payment links
-  Clean and responsive interface

---

## Payment Flow

1. Merchant enters the payment amount and payment note.
2. RippleCore generates a QR code.
3. Customer scans the QR code using any UPI application.
4. Razorpay processes the payment.
5. Payment status is automatically updated.

### Payment Status

**Successful**

Triggered when the following Razorpay webhook is received:

```
payment_link.paid
```

**Failed**

Payment fails when:

- Payment link expires (15 minutes)
- Payment is cancelled

Corresponding webhook events:

```
payment_link.expired
payment_link.cancelled
```

---

## Tech Stack

### Frontend

- React
- CSS

### Backend

- Node.js
- Express.js

### Database

- SQLite

### APIs & Packages

- Razorpay
- QRCode
- Express
- CORS

---

##  Backend Setup

Navigate to the server folder:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

or

```bash
npm install express cors qrcode razorpay
```

Start the backend server:

```bash
node server.js
```

---

##  Exposing Localhost using ngrok

Since Razorpay does not send webhooks to localhost, use **ngrok** to expose your local server.

Run:

```bash
ngrok http 4000
```

Copy the generated HTTPS URL and configure it as the webhook URL in the Razorpay Dashboard.

---

## Frontend Setup

Navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm start
```

---

##  Usage guide

1. Start the backend server.
2. Start the frontend application.
3. Enter the payment amount.
4. Enter a payment note.
5. Click **Generate QR**.
6. Scan the QR code using any UPI application.
7. Complete the payment (currently in Razorpay Test Mode).
8. View the updated payment status in the **Transaction Dashboard**.

---

## Transaction Dashboard

The dashboard stores and displays:

- Payment Amount
- Payment Status
- Payment Notes
- Transaction History

Payment status is automatically updated whenever Razorpay sends a webhook event.

---

## Screenshots

### Home Page

![Home](screenshots/home.png)

### QR Code

![QR](screenshots/qr.png)

### Dashboard

![Dashboard](screenshots/dashboard.png)

---


## Credits

- QRCode Package: https://www.npmjs.com/package/qrcode
- Razorpay Payment Gateway: https://razorpay.com/
- AI Assistance: ChatGPT

---


