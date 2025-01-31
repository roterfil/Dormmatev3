<script>
  import { onMount, createEventDispatcher } from 'svelte';
  import { uploadPaymentProof, getPaymentsByTenantId } from '../../lib/api';
  import { useNavigate } from 'svelte-navigator';

  const navigate = useNavigate();
  const dispatch = createEventDispatcher();

  let proofOfPayment = null;
  let error = null;
  let amount = null;
  let paymentDate = null;
  let dueDate = null;
  let userId = null;
  let payments = [];
  let loading = true;

  onMount(async () => {
    userId = localStorage.getItem('userId');
    await fetchPayments();
  });

  async function fetchPayments() {
    loading = true;
    try {
      const tenantId = parseInt(localStorage.getItem('userId'), 10);
      payments = await getPaymentsByTenantId(tenantId);
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    error = null;

    if (!proofOfPayment) {
      error = 'Please select a payment proof image';
      return;
    }

    const formData = new FormData();
    formData.append('proofOfPayment', proofOfPayment);

    try {
      const tenantId = parseInt(localStorage.getItem('userId'), 10);
      const response = await uploadPaymentProof(formData, tenantId, { 
        amount: amount, 
        paymentDate: paymentDate, 
        dueDate: dueDate 
      });

      console.log("Payment proof sent successfully");
      await fetchPayments(); // Refresh the payments list
      dispatch("paymentSuccess");
      
      // Reset form
      proofOfPayment = null;
      amount = null;
      paymentDate = null;
      dueDate = null;
      
    } catch (err) {
      error = err.message || "Failed to submit payment proof";
      console.error('Error submitting payment proof', err);
    }
  }

  function handleFileChange(event) {
    proofOfPayment = event.target.files[0];
  }
</script>

<div class="container">
  <h2>Send Payment Proof</h2>
  {#if error}
    <p class="error">{error}</p>
  {/if}
  
  <form on:submit|preventDefault={handleSubmit}>
    <div>
      <label for="proofOfPayment">Proof of Payment:</label>
      <input type="file" id="proofOfPayment" on:change={handleFileChange} accept="image/*" required />
    </div>
    <div>
      <label for="amount">Amount Paid:</label>
      <input type="text" id="amount" bind:value={amount} required />
    </div>
    <div>
      <label for="paymentDate">Payment Date:</label>
      <input type="date" id="paymentDate" bind:value={paymentDate} required />
    </div>
    <div>
      <label for="dueDate">Due Date:</label>
      <input type="date" id="dueDate" bind:value={dueDate} required />
    </div>
    <button type="submit">Send Proof of Payment</button>
  </form>

  <div class="payments-history">
    <h3>Payment History</h3>
    {#if loading}
      <p>Loading payments...</p>
    {:else if payments.length === 0}
      <p>No payment history found.</p>
    {:else}
      <table>
        <thead>
          <tr>
            <th>Amount</th>
            <th>Payment Date</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Proof</th>
          </tr>
        </thead>
        <tbody>
          {#each payments as payment}
            <tr>
              <td>${payment.amount}</td>
              <td>{payment.paymentDate ? new Date(payment.paymentDate).toLocaleDateString() : "Pending"}</td>
              <td>{new Date(payment.dueDate).toLocaleDateString()}</td>
              <td>
                <span class="status-badge status-{payment.status.toLowerCase().replace(' ', '-')}">
                  {payment.status}
                </span>
              </td>
              <td>
                {#if payment.proofOfPayment}
                  <img 
                    src={payment.proofOfPayment} 
                    alt="Proof of Payment" 
                    class="payment-proof-thumbnail"
                  />
                {:else}
                  No proof submitted
                {/if}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    {/if}
  </div>
</div>

<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    margin-left: 300px; /* to not overlap with the sidebar */
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px auto;
    width: 50%;
  }

  form div {
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  label {
    text-align: left;
    margin-bottom: 5px;
  }

  input[type="file"],
  input[type="date"],
  input[type="text"] {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 100%;
  }

  button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin: 10px 0;
  }

  button:hover {
    background-color: #0056b3;
  }

  .payments-history {
    margin-top: 40px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }

  th, td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
  }

  th {
    background-color: #f5f5f5;
    font-weight: bold;
  }

  .payment-proof-thumbnail {
    max-width: 100px;
    max-height: 100px;
    cursor: pointer;
  }

  .status-badge {
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.9em;
    font-weight: 500;
  }

  .status-pending {
    background-color: #fff3cd;
    color: #856404;
  }

  .status-paid {
    background-color: #d4edda;
    color: #155724;
  }

  .status-overdue {
    background-color: #f8d7da;
    color: #721c24;
  }

  .status-partially-paid {
    background-color: #cce5ff;
    color: #004085;
  }

  .error {
    color: #dc3545;
    margin: 10px 0;
  }
</style>