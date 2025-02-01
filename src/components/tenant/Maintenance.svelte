<script>
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  import { getMaintenanceRequests, uploadMaintenanceProof } from '../../lib/api';
  import { useNavigate } from 'svelte-navigator';

  const dispatch = createEventDispatcher();
  const navigate = useNavigate();

  let requests = [];
  let loading = true;
  let error = null;
  let description = "";
  let userId;
  let unitId;
  let proofOfDamage = null;

  onMount(async () => {
      userId = localStorage.getItem('userId');
      unitId = localStorage.getItem('unitId');

      if (!userId || !unitId) {
          error = 'User ID or Unit ID is missing';
          return;
      }

      await fetchRequests();
  });

  async function fetchRequests() {
      loading = true;
      try {
          requests = await getMaintenanceRequests();
          requests = requests.filter(request => request.tenant && request.tenant.userId == userId);
      } catch (err) {
          error = err.message;
      } finally {
          loading = false;
      }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    error = null;

    if (!description.trim()) {
        error = 'Please provide a description';
        return;
    }

    const formData = new FormData();
    if (proofOfDamage) {
        formData.append('proofOfDamage', proofOfDamage);
    }

    try {
        const userId = parseInt(localStorage.getItem('userId'), 10);
        const unitId = parseInt(localStorage.getItem('unitId'), 10);
        
        if (isNaN(userId) || isNaN(unitId)) {
            throw new Error('Invalid user ID or unit ID');
        }

        // Format the date in the correct format
        const now = new Date();
        const formattedDate = now.toISOString().substring(0, 19); // Format: YYYY-MM-DDTHH:mm:ss

        const response = await uploadMaintenanceProof(formData, userId, {
            description: description,
            unitId: unitId,
            requestDate: formattedDate
        });

        console.log('Maintenance request submitted:', response);
        await fetchRequests();
        dispatch("requestSuccess");

        // Reset form
        description = "";
        proofOfDamage = null;
        if (document.querySelector('#proofOfDamage')) {
            document.querySelector('#proofOfDamage').value = '';
        }
    } catch (err) {
        error = err.message || 'Failed to submit maintenance request';
        console.error('Error submitting maintenance request:', err);
    }
}

  function handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
          proofOfDamage = file;
      } else {
          proofOfDamage = null;
      }
  }
</script>


<div class="container">
  <h2>Maintenance Request</h2>
  {#if error}
    <p class="error-message">{error}</p>
  {/if}

  <div class="form-section">
    <h3>Submit Maintenance Request</h3>
    <div class="form-card">
      <form on:submit|preventDefault={handleSubmit}>
        <div class="form-group">
          <label for="description">Description:</label>
          <textarea id="description" bind:value={description} required />
        </div>
        <div class="form-group">
          <label for="proofOfDamage">Proof of Damage (optional):</label>
          <input type="file" id="proofOfDamage" accept="image/*" on:change={handleFileChange} />
        </div>
        <button type="submit" class="button primary">Submit Request</button>
      </form>
    </div>
  </div>

    <hr class="section-separator" />

  <div class="request-history">
    <h3>Your Maintenance Requests</h3>
    {#if loading}
      <p class="loading-message">Loading Maintenance Requests...</p>
    {:else}
      <div class="request-cards">
        {#each requests as request}
          <div class="request-card">
            <div class="card-header">
              <h3 class="request-title">Request #{request.requestId}</h3>
            </div>
            <p class="request-description">
              <strong>Description:</strong> {request.description}
            </p>
            <p class="request-status">
              <strong>Status: </strong><span class="status-badge status-{request.status.toLowerCase().replace(' ', '-')}">{request.status}</span>
            </p>
            <small class="post-date">Posted on: {new Date(request.requestDate).toLocaleString()}</small>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
  .container {
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  }
  h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #343a40;
  }
  .loading-message {
    text-align: center;
    color: #555;
  }
  .error-message {
    color: #dc3545;
    text-align: center;
    margin-bottom: 10px;
  }
  .form-section {
    margin-bottom: 30px;
  }
  .form-section h3 {
    text-align: center;
    margin-bottom: 20px;
    color: #495057;
  }
  .form-card {
    background-color: #fff;
    border-radius: 12px;
    padding: 25px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
    width: 80%;
    max-width: 600px;
    margin: 0 auto;
    transition: box-shadow 0.3s ease;
  }
  .form-card:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    margin: 0 auto;
    width: 100%;
  }
  .form-group {
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
  }
  .form-group label {
    text-align: left;
    margin-bottom: 5px;
    color: #495057;
  }
  textarea {
    padding: 12px;
    border: 1px solid #ced4da;
    border-radius: 6px;
    width: 100%;
    box-sizing: border-box;
    transition: border-color 0.2s ease;
    height: 200px;
  }
  textarea:focus {
    border-color: #007bff;
    outline: none;
  }
  input[type="file"] {
    padding: 12px;
    border: 1px solid #ced4da;
    border-radius: 6px;
    width: 100%;
    box-sizing: border-box;
    transition: border-color 0.2s ease;
  }
  input[type="file"]:focus {
    border-color: #007bff;
    outline: none;
  }
  button {
    padding: 12px 25px;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    margin: 10px 0;
    transition: background-color 0.3s ease;
  }
  button.primary {
    background-color: #007bff;
  }
  button.primary:hover {
    background-color: #0056b3;
  }
  .request-history {
    margin-top: 30px;
  }
  .request-history h3 {
    text-align: center;
    margin-bottom: 20px;
    color: #343a40;
  }
  .request-cards {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
  }
  .request-card {
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
    padding: 20px;
    width: 300px;
    transition: box-shadow 0.3s ease;
  }
  .request-card:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
  }
  .card-header {
    margin-bottom: 10px;
    border-bottom: 1px solid #e9ecef;
    padding-bottom: 10px;
  }
  .request-title {
    margin-top: 0;
    color: #343a40;
  }
  .request-description {
    margin-bottom: 5px;
    color: #495057;
  }
  .request-status {
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .status-badge {
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 0.9em;
    font-weight: 500;
    text-align: center;
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
  .post-date {
    font-size: 0.8em;
    color: #555;
    display: block;
    text-align: right;
  }
 .section-separator {
    border: 0;
    height: 1px;
    background: #e9ecef;
    margin: 20px 0;
 }
</style>