<script>
    import { createEventDispatcher } from 'svelte';
    import { createMaintenanceRequest } from '../../lib/api';
    import { useNavigate } from 'svelte-navigator';
  
    const dispatch = createEventDispatcher();
      const navigate = useNavigate();
  
    let description = '';
    let error = null;
  
    async function handleSubmit(event) {
        event.preventDefault();
          error = null;
      
      try {
          // Get the tenantId (you should store tenantId when a tenant login )
        const tenantId = 1; // You should get this from your application's state;
        const unitId = 1;// you should get the current unit id of the user for this test i am just putting "1"
  
        const response = await createMaintenanceRequest(
          {description: description}, tenantId, unitId);
        console.log('Maintenance request submitted:', response);
          navigate("/tenant");
       } catch (err) {
            error = err.message || 'Failed to submit maintenance request';
           console.error("Error Submitting Maintenance request", err);
        }
    }
  </script>
  
  <h2>Submit Maintenance Request</h2>
  
  {#if error}
    <p class="error">{error}</p>
  {/if}
  
  <form on:submit|preventDefault={handleSubmit}>
    <div>
      <label for="description">Description:</label>
      <textarea id="description" bind:value={description} required />
    </div>
    <button type="submit">Submit Request</button>
  </form>
  
  <style>
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
  </style>