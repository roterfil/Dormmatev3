<script>
    import { onMount } from 'svelte';
    import { getUsers, createTenant, getUnits } from '../../lib/api';
  
    let tenants = [];
    let units = [];
    let loading = true;
    let error = null;
    let newTenantName = '';
    let newTenantEmail = '';
    let newTenantPassword = '';
    let selectedUnitId = null;
      let newTenantContactNumber = "";
      let newTenantMoveInDate = "";
  
    onMount(async () => {
      fetchTenants();
      fetchUnits();
    });
  
    async function fetchTenants() {
      loading = true;
      try {
        tenants = await getUsers();
      } catch (err) {
        error = err.message;
      } finally {
        loading = false;
      }
    }
      async function fetchUnits(){
         try {
              units = await getUnits();
         }
          catch(error){
             error = error.message;
          }
     }
  
    async function handleAddTenant() {
      try {
        const response = await createTenant({
          name: newTenantName,
          user: {
              email: newTenantEmail,
              password: newTenantPassword,
              role: "tenant",
              username: newTenantName,
          },
           contactNumber: newTenantContactNumber,
          moveInDate: newTenantMoveInDate
        }, null, selectedUnitId);
  
  
      await fetchTenants();
  
      newTenantName = "";
      newTenantEmail = "";
       newTenantPassword = "";
       newTenantContactNumber = "";
       newTenantMoveInDate = "";
  
         console.log('New tenant created:', response);
      } catch (err) {
        error = err.message;
      }
    }
  </script>
  
  <h2>Tenant Management</h2>
  
  {#if loading}
    <p>Loading tenants...</p>
  {:else if error}
    <p>Error: {error}</p>
  {:else}
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Username</th>
          <th>Email</th>
            <th>Unit</th>
            <th>Contact #</th>
          <th>Move-In Date</th>
        </tr>
      </thead>
      <tbody>
        {#each tenants as tenant}
          <tr>
            <td>{tenant.userId}</td>
            <td>{tenant.name}</td>
            <td>{tenant.username}</td>
            <td>{tenant.email}</td>
              <td>{tenant.unit ? tenant.unit.unitName : 'Not Assigned'}</td>
             <td>{tenant.contactNumber}</td>
              <td>
                 {#if tenant.moveInDate}
                  {new Date(tenant.moveInDate).toLocaleDateString()}
                    {:else}
                     Not Set
                 {/if}
                </td>
          </tr>
        {/each}
      </tbody>
    </table>
  
    <div>
          <label for="units"> Select Unit </label>
          <select id="units" bind:value={selectedUnitId}>
              <option value={null}>Select a Unit</option>
             {#each units as unit}
               <option value={unit.unitId}> {unit.unitName}</option>
                {/each}
          </select>
      <form on:submit|preventDefault={handleAddTenant}>
        <div>
          <label for="tenantName">Tenant Name:</label>
          <input type="text" id="tenantName" bind:value={newTenantName} required />
        </div>
        <div>
          <label for="tenantEmail">Tenant Email:</label>
          <input type="email" id="tenantEmail" bind:value={newTenantEmail} required />
        </div>
         <div>
            <label for="tenantContactNumber">Contact Number: </label>
               <input type="text" id="tenantContactNumber" bind:value={newTenantContactNumber} required />
          </div>
            <div>
              <label for="tenantMoveInDate">Move In Date: </label>
              <input type="date" id="tenantMoveInDate" bind:value={newTenantMoveInDate} required />
          </div>
        <div>
           <label for="tenantPassword">Tenant Password:</label>
              <input type="password" id="tenantPassword" bind:value={newTenantPassword} required />
          </div>
          <button type="submit">Add Tenant</button>
      </form>
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
           flex-direction: column; /* Arrange labels and inputs vertically */
      }
  
       label {
         text-align: left; /* Align labels to the left */
        }
  
          input[type="text"],
      input[type="email"],
      input[type="password"],
          input[type="date"]{
              padding: 8px;
              border: 1px solid #ddd;
              border-radius: 4px;
                width: 100%; /* Make input fields fill their container */
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
    select {
        padding: 8px;
        border: 1px solid #ddd;
         border-radius: 4px;
          background-color: white;
      }
  </style>