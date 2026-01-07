RIPPLECORE
RippleCore is a QrCode generating platform for payment requests and can also track payments and its status in real time.

PROBLEM:
Reduces the burden of the customer to open payment app, enter amount and then pay instead he/she can pay directly by scanning a qrcode.

Payment is Successful if the payment_link.paid event is fired.
It fails when the payment link expires(Time:15min) or is caccelled and the payment_link.expired or payment_link.cancelled is fired.

BACKEND SETUP
cd server 
npm install
npm install express cors qrcode razorpay 
node server.js

usage of ngrok since Razorpay does not send webhooks to localhost
In Terminal:
ngrok http 4000

FRONTEND SETUP
cd frontend
npm install
npm start

Usage Guide:
Enter the amount and a note(reason for the payment) and click "generate QR" button. A QRCode would be displayed. Scan the QRCode to get a payment request for the entered amount. Pay(In Test Mode for now). The payment history is stored and displayed in the Transaction Dashboard(click on "GO to Dashboard"). Automatically the payment status is changed.

TECH STACK
Frontend: React
BAckend: Node, Express
Database: SQLite

Credits:
qrcode package: https://www.npmjs.com/package/qrcode
razorpay payment gateway: https://razorpay.com/x/current-accounts/?utm_adgroup=&utm_gclid=Cj0KCQiApfjKBhC0ARIsAMiR_Ivv-ZzVQx0gTozriaFiuRhrx_RUEkAZuTd_olFdlH3Ci9RDOTIbdh4aAmD_EALw_wcB&utm_source=google&utm_medium=cpc&utm_campaign=GoogleSearch_RZPx_Brand_CA_22052024&utm_term=razorpayx&utm_content=&gad_source=1&gad_campaignid=21314917883&gbraid=0AAAAADdXWPoAlXnps2kBPQnfscphNgvB4&gclid=Cj0KCQiApfjKBhC0ARIsAMiR_Ivv-ZzVQx0gTozriaFiuRhrx_RUEkAZuTd_olFdlH3Ci9RDOTIbdh4aAmD_EALw_wcB
Use of Artificial Inteligence: ChatGPT

