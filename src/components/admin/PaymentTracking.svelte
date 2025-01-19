<script>
    import { onMount } from 'svelte';
    import { getPayments, updatePayment, getPaymentsByTenantId } from '../../lib/api';
  
    let payments = [];
    let tenants = [];
    let loading = true;
    let error = null;
    let editingPaymentId = null;
    let editPaymentStatus = '';
    let selectedTenantId = null;
  
    onMount(async () => {
      fetchPayments();
    });
  
    async function fetchPayments() {
      loading = true;
      try {
        if (selectedTenantId) {
          payments = await getPaymentsByTenantId(selectedTenantId);
        } else {
          payments = await getPayments();
        }
      } catch (err) {
        error = err.message;
      } finally {
        loading = false;
      }
    }
  
    async function updateSelectedTenant() {
      await fetchPayments();
    }
  
    function startEdit(payment) {
      editingPaymentId = payment.paymentId;
      editPaymentStatus = payment.status;
    }
  
    async function updatePaymentStatus(paymentId) {
      try {
        const response = await updatePayment(paymentId, { status: editPaymentStatus });
        await fetchPayments();
        editingPaymentId = null;
        console.log('Maintenance request updated:', response);
      } catch (err) {
        error = err.message;
      }
    }
  
    function cancelEdit() {
      editingPaymentId = null;
    }
  
    function viewProof(proof) {
      console.log('Proof:', proof);
    }
  </script>
  
  <h2>Payment Tracking</h2>
  
  {#if loading}
    <p>Loading payments...</p>
  {:else if error}
    <p>Error: {error}</p>
  {:else}
    <div>
      <label for="tenant">Select Tenant </label>
      <select bind:value={selectedTenantId} on:change={updateSelectedTenant}>
        <option value={null}>All</option>
        {#each tenants as tenant}
          <option value={tenant.tenantId}>{tenant.name}</option>
        {/each}
      </select>
  
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tenant</th>
            <th>Amount</th>
            <th>Payment Date</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Proof of Payment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {#each payments as payment}
            <tr>
              <td>{payment.paymentId}</td>
              <td>{payment.tenant.name}</td>
              <td>${payment.amount}</td>
              <td>
                {#if payment.paymentDate}
                  {new Date(payment.paymentDate).toLocaleDateString()}
                {:else}
                  Pending
                {/if}
              </td>
              <td>{new Date(payment.dueDate).toLocaleDateString()}</td>
              {#if editingPaymentId === payment.paymentId}
                <td>
                  <select bind:value={editPaymentStatus}>
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="overdue">Overdue</option>
                       <option value="partially paid">Partially Paid</option>
                  </select>
                </td>
                <td>
                  <button on:click={() => updatePaymentStatus(payment.paymentId)}>Update</button>
                  <button on:click={cancelEdit}>Cancel</button>
                </td>
              {:else}
                <td>{payment.status}</td>
                <td>
                  {#if payment.proofOfPayment}
                    <button on:click={() => viewProof(payment.proofOfPayment)}>View Proof</button>
                  {:else}
                    No proof of payment submitted
                  {/if}
                </td>
                <td>
                  <button on:click={() => startEdit(payment)}>Edit Status</button>
                </td>
              {/if}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
  
  <style>
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th,
    td {
      border: 1px solid #ddd;
      padding: 8px;
    }
    th {
      background-color: #f0f0f0;
    }
    select {
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
        background-color: white;
    }
      button {
      padding: 10px 20px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin: 0 10px 10px 0;
    }
    button:hover {
       background-color: #0056b3;
      }
  </style>