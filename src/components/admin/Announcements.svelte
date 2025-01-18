<script>
  import { onMount } from 'svelte';
  import { getAnnouncements, createAnnouncement, deleteAnnouncement } from '../../lib/api';

  let announcements = [];
  let loading = true;
  let error = null;
  let newAnnouncementTitle = '';
  let newAnnouncementContent = '';
  let deletingAnnouncementId = null;
  let showDeleteConfirmation = false;
  let showModal = false; 

  onMount(async () => {
      fetchAnnouncements();
  });

  async function fetchAnnouncements() {
      loading = true;
      try {
          announcements = await getAnnouncements();
      } catch (err) {
          error = err.message;
      } finally {
          loading = false;
      }
  }

  async function handleSubmit() {
      try {
          const response = await createAnnouncement(
              {
                  title: newAnnouncementTitle,
                  content: newAnnouncementContent,
              },
              1 // Hardcoded userId for now
          );

          await fetchAnnouncements();

          newAnnouncementTitle = '';
          newAnnouncementContent = '';
          showModal = false;

          console.log('New announcement created', response);
      } catch (err) {
          error = err.message;
      }
  }
  function confirmDelete(announcementId) {
    deletingAnnouncementId = announcementId;
    showDeleteConfirmation = true;
  }
  function cancelDelete(){
      deletingAnnouncementId = null;
       showDeleteConfirmation = false;
 }
    async function handleDelete(){
      try {
        await deleteAnnouncement(deletingAnnouncementId);
        await fetchAnnouncements(); //refresh the list
         deletingAnnouncementId = null;
          showDeleteConfirmation = false;
           console.log("Announcement Deleted");
      } catch (error) {
         error = error.message;
      }
    }
</script>

<div class="maincontainer">
<h2>Bulletin Board</h2>

{#if loading}
  <p>Loading announcements...</p>
{:else if error}
  <p>Error: {error}</p>
{:else}
  <div class="announcement-list">
      {#each announcements as announcement}
      <div class="announcement-card">
      <div class="card-header">
          <h3>{announcement.title}</h3>
          <button on:click={() => confirmDelete(announcement.announcementId)} class="deletebutton"> Delete</button>
      </div>
          <p>{announcement.content}</p>
          <small class="post-date">Posted on: {new Date(announcement.postDate).toLocaleString()}</small>
      </div>
      {/each}
  </div>
{/if}

<button on:click={() => (showModal = true)}>Add Announcement</button>
{#if showModal}
<div class="modal">
  <div class="modal-content">
    <form on:submit|preventDefault={handleSubmit}>
    <div>
      <label for="title">Announcement Title:</label>
      <input type="text" id="title" bind:value={newAnnouncementTitle} required />
    </div>
    <div>
      <label for="content">Announcement Content:</label>
      <input type="text" id="content" bind:value={newAnnouncementContent} required />
    </div>
    <button type="submit">Add Announcement</button>
    <button on:click={() => (showModal = false)}>Cancel</button>
    </form>
  </div>
</div>
{/if}

{#if showDeleteConfirmation}
  <div class="modal">
    <div class="modal-content">
      <h2>Confirm Deletion</h2>
      <p>Are you sure you want to delete this announcement?</p>
       <div>
          <button on:click={handleDelete} class="editbutton">Yes</button>
         <button on:click={cancelDelete} class="deletebutton">Cancel</button>
       </div>
      </div>
  </div>
{/if}
</div>
<style>

  .maincontainer { 
    display: flex; 
    flex-direction:column; 
    margin: 5em 5em 0 5em;
  }
   .announcement-list {
    display: flex;
    flex-direction: column; /* Arranges cards from top to bottom */
    gap: 20px; /* Spacing between cards */
  }

.announcement-card {
      background-color: white;
      border-radius: 8px;
      border-color: black;
       padding: 20px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.card-header {
      display: flex;
    justify-content: space-between;
    align-items: center;
}

.announcement-card h3 {
    margin-top: 0;
}
.announcement-card p {
      margin-bottom: 10px;
      line-height: 1.5;
  }
.post-date {
      display: block; /* Make it a block element */
    text-align: right; /* Align to the right */
    font-size: 0.8em;
      color: gray;
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
  input[type="text"] {
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