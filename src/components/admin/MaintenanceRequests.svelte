<script>
    import { onMount } from 'svelte';
    import { getMaintenanceRequests, updateMaintenanceRequest, deleteMaintenanceRequest } from '../../lib/api';
  
    let requests = [];
    let loading = true;
    let error = null;
    let editingRequestId = null;
    let editRequestStatus = '';
      let deletingRequestId = null;
       let showDeleteConfirmation = false;
  
    onMount(async () => {
      fetchRequests();
    });
  
    async function fetchRequests() {
      loading = true;
      try {
        requests = await getMaintenanceRequests();
      } catch (err) {
        error = err.message;
      } finally {
        loading = false;
      }
    }
    
      function confirmDelete(requestId) {
           deletingRequestId = requestId;
             showDeleteConfirmation = true;
      }
      function cancelDelete(){
        deletingRequestId = null;
          showDeleteConfirmation = false;
      }
  
       async function handleDelete() {
          try {
              await deleteMaintenanceRequest(deletingRequestId);
             await fetchRequests();
            deletingRequestId = null;
              showDeleteConfirmation = false;
  
  
              console.log("Maintenance Request deleted")
          } catch (error) {
             error = error.message;
          }
      }
  
    function startEdit(request) {
      editingRequestId = request.requestId;
      editRequestStatus = request.status;
    }
  
    async function updateRequest(requestId) {
      try {
        const response = await updateMaintenanceRequest(requestId, { status: editRequestStatus });
        await fetchRequests();
        editingRequestId = null;
        console.log('Maintenance request updated:', response);
      } catch (error) {
        error = error.message;
      }
    }
  
    function cancelEdit() {
      editingRequestId = null;
    }
  </script>
  
  <h2>Maintenance Requests</h2>
  
  {#if loading}
    <p>Loading requests...</p>
  {:else if error}
    <p>Error: {error}</p>
  {:else}
    <div class="request-cards">
      {#each requests as request}
        <div class="request-card">
          <div class="card-header">
             <h3>Request #{request.requestId}</h3>
                <small class="request-date">
                  Posted on: {new Date(request.requestDate).toLocaleString()}
                </small>
          </div>
          <p>
            <strong>Description:</strong>
            {request.description}
          </p>
          <p>
            <strong>Tenant:</strong>
            {request.tenant.name}
          </p>
          <p>
            <strong>Unit:</strong>
            {request.unit.unitName}
          </p>
          {#if editingRequestId === request.requestId}
            <div class="status-update">
              <label for="status">Status</label>
                <select bind:value={editRequestStatus} >
                <option value="open">Open</option>
               <option value="in progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
                </select>
              <button on:click={() => updateRequest(request.requestId)}>Update</button>
               <button on:click={cancelEdit}>Cancel</button>
             </div>
               {:else}
              <p class="status">
                 <strong>Status:</strong> {request.status}
                <button on:click={()=>startEdit(request)} class="editbutton">Edit</button>
                   <button on:click={() => confirmDelete(request.requestId)} class="deletebutton">Delete</button>
              </p>
          {/if}
        </div>
      {/each}
    </div>
  {/if}
   {#if showDeleteConfirmation}
      <div class="modal">
        <div class="modal-content">
          <h2>Confirm Deletion</h2>
          <p>Are you sure you want to delete this maintenance request?</p>
          <div>
               <button on:click={handleDelete} class="editbutton">Yes</button>
               <button on:click={cancelDelete} class="deletebutton">Cancel</button>
          </div>
        </div>
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
  .card-header {
        display: flex;
     justify-content: space-between;
      align-items: center;
     margin-bottom: 10px;
  }
      .status-update {
         display: flex;
          gap: 10px;
         margin-top: 10px;
      }
      .status-update button {
          padding: 10px 20px;
         background-color: #007bff;
         color: white;
          border: none;
         border-radius: 4px;
          cursor: pointer;
            margin: 0 10px 10px 0;
      }
          .status-update button:hover {
              background-color: #0056b3;
          }
      .request-card h3 {
      margin-top: 0;
          margin-bottom: 10px;
    }
  .request-card p {
     margin-bottom: 5px;
    }
  .request-date {
       font-size: 0.8em;
          color: gray;
        display: block; /* Make it a block element */
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
      .editbutton {
        background-color: green;
      }
  
      .editbutton:hover {
        background-color: rgb(1, 63, 1);
      }
  
      .deletebutton {
          background-color: red;
      }
  
        .deletebutton:hover {
          background-color: rgb(135, 0, 0);
        }
  
    .modal {
         position: fixed;
            top: 0;
          left: 0;
         width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5); /* semi-transparent black */
          display: flex;
           justify-content: center;
          align-items: center;
          z-index: 1000;
      }
      .modal-content {
         background-color: white;
         padding: 20px;
        border-radius: 5px;
          display: flex;
         flex-direction: column;
          text-align: center;
           width: 400px;
      }
  </style>