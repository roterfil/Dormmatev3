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

<h2>Maintenance Request</h2>

{#if error}
 <p class="error">{error}</p>
{/if}

<h3>Submit Maintenance Request</h3>
<form on:submit|preventDefault={handleSubmit}>
 <div>
   <label for="description">Description:</label>
   <textarea id="description" bind:value={description} required />
 </div>
 <div>
   <label for="proofOfDamage">Proof of Damage (optional):</label>
   <input type="file" id="proofOfDamage" accept="image/*" on:change={handleFileChange} />
 </div>
 <button type="submit">Submit Request</button>
</form>

{#if loading}
 <p>Loading Maintenance Requests...</p>
{:else}
 <h3>Your Maintenance Requests</h3>
   <div class="request-cards">
      {#each requests as request}
         <div class="request-card">
             <h3>Request #{request.requestId}</h3>
               <p>
                  <strong>Description:</strong> {request.description}
             </p>
             <p>
              <strong>Status: </strong>{request.status}
           </p>
             <small class="post-date">Posted on: {new Date(request.requestDate).toLocaleString()}</small>
          </div>
     {/each}
 </div>
{/if}

<style>
  .request-cards {
      display: flex;
     flex-wrap: wrap;
      gap: 20px;
     justify-content: center;
  }
  .request-card {
     background-color: white;
       border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      padding: 20px;
    width: 300px;
   }

  .request-card h3 {
       margin-top: 0;
   }
   .request-card p {
      margin-bottom: 5px;
   }
  .post-date {
     font-size: 0.8em;
       color: gray;
    display: block;
  }

 form {
   display: flex;
    flex-direction: column;
   align-items: center;
    margin-top: 20px;
     width: 50%;
     margin: 20px auto; /* Center the form */
   }
   form div {
       margin-bottom: 10px;
     display: flex;
    flex-direction: column;
  }

  label {
       text-align: left;
  }

   textarea {
       padding: 8px;
       border: 1px solid #ddd;
    border-radius: 4px;
        width: 100%; /* Make input fields fill their container */
      height: 200px;
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
 input[type="file"] {
    padding: 8px;
   border: 1px solid #ddd;
   border-radius: 4px;
    width: 100%;
  }
</style>