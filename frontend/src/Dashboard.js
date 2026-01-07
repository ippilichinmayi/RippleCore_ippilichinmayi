import { useEffect} from "react";
import { useState } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";


function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();



  useEffect(() => {
  loadTransactions(); 

  const interval = setInterval(() => {
    loadTransactions(); 
  }, 3000);

  return () => clearInterval(interval); 
}, []);


  async function loadTransactions() {
    const res = await fetch("http://localhost:4000/api/transactions");
    const data = await res.json();
    setTransactions(data);
  }

  

  return (
    <div className="dashboard">
     <div className="dashcard">
      <h2>Transaction Dashboard</h2>

      <table>
        <thead>
  <tr>
    <th>ID</th>
    <th>Transaction ID</th>
    <th>Amount</th>
    <th>Status</th>
    <th>Created At</th>
  </tr>
</thead>


        <tbody>
  {transactions.map((tx) => (
    <tr key={tx.id}>
      <td>{tx.id}</td>
      <td>{tx.payment_link_id}</td>
      <td>{tx.amount}</td>
      <td className={`status-${tx.status.toLowerCase()}`}>{tx.status}</td>
      <td>{tx.created_at}</td>
    </tr>
  ))}
</tbody>

      </table>
      </div>
      <button onClick={() => navigate("/")}>

  Back to QR Generator
</button>
    </div>
  );
  

}


export default Dashboard;
