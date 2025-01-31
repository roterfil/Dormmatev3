<script>
  import { onMount } from 'svelte';
  import { getUnits, createUnit, updateUnit, deleteUnit } from '../../lib/api';

  let units = [];
  let loading = true;
  let error = null;
  let newUnitName = '';
  let newUnitDescription = '';
  let editingUnitId = null;
  let editUnitName = '';
  let editUnitDescription = '';
    let showModal = false;
    let deletingUnitId = null;
     let showDeleteConfirmation = false;

  onMount(async () => {
    fetchUnits();
  });

  async function fetchUnits() {
    loading = true;
    try {
      units = await getUnits();
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  }

    async function handleSubmit() {
        try {
            const response = await createUnit({
                unitName: newUnitName,
                description: newUnitDescription
            });

            // Update the local list
            await fetchUnits();

            newUnitName = "";
            newUnitDescription = "";
            showModal = false;


            console.log('New unit created:', response);

        } catch (err) {
            error = err.message;
        }
    }
    
  function startEdit(unit) {
    editingUnitId = unit.unitId;
    editUnitName = unit.unitName;
    editUnitDescription = unit.description;
  }

  async function updateUnitData() {
    try {
      const response = await updateUnit(editingUnitId, {
        unitName: editUnitName,
        description: editUnitDescription,
      });

      await fetchUnits();

      editingUnitId = null;

      console.log('Unit updated', response);
    } catch (err) {
      error = err.message;
    }
  }

  function cancelEdit() {
    editingUnitId = null;
  }

  function confirmDelete(unitId) {
    deletingUnitId = unitId;
    showDeleteConfirmation = true;
  }

  function cancelDelete() {
    deletingUnitId = null;
    showDeleteConfirmation = false;
  }

  async function handleDelete() {
    try {
      await deleteUnit(deletingUnitId);
      await fetchUnits(); // Refresh the list after delete

      deletingUnitId = null;
      showDeleteConfirmation = false;

      console.log('Unit deleted');
    } catch (error) {
      error = error.message;
    }
  }
</script>


<div class = "main-container">
<h2>Unit Management</h2>

{#if loading}
  <p>Loading units...</p>
{:else if error}
  <p>Error: {error}</p>
{:else}
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Unit Name</th>
        <th>Description</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {#each units as unit}
        <tr>
          <td>{unit.unitId}</td>
          {#if editingUnitId === unit.unitId}
            <td><input type="text" bind:value={editUnitName} /></td>
            <td><input type="text" bind:value={editUnitDescription} /></td>
            <td>
              <button on:click={updateUnitData}>Update</button>
              <button on:click={cancelEdit}>Cancel</button>
            </td>
          {:else}
            <td>{unit.unitName}</td>
            <td>{unit.description}</td>
            <td>
              <button on:click={() => startEdit(unit)} class="editbutton">Edit</button>
              <button on:click={() => confirmDelete(unit.unitId)} class="deletebutton">Delete</button>
            </td>
          {/if}
        </tr>
      {/each}
    </tbody>
  </table>
{/if}

<button on:click={() => (showModal = true)}>Add Unit</button>
{#if showModal}
  <div class="modal">
    <div class="modal-content">
      <form on:submit|preventDefault={handleSubmit}>
        <h2>Add New Unit</h2>
        <div>
          <label for="unitName">Unit Name:</label>
          <input type="text" id="unitName" bind:value={newUnitName} required />
        </div>
        <div>
          <label for="description">Description:</label>
          <input type="text" id="description" bind:value={newUnitDescription} />
        </div>
        <button type="submit">Add Unit</button>
        <button on:click={() => (showModal = false)}>Cancel</button>
      </form>
    </div>
  </div>
{/if}
{#if showDeleteConfirmation}
  <div class="modal">
    <div class="modal-content">
      <h2>Confirm Deletion</h2>
      <p>Are you sure you want to delete this unit?</p>
      <div>
        <button on:click={handleDelete} class="editbutton">Yes</button>
        <button on:click={cancelDelete} class="deletebutton">Cancel</button>
      </div>
    </div>
  </div>
{/if}
</div>

<style>

  .main-container { 
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    margin-left: 300px;
  }
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

    input[type="text"]{
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