<script>
    import { onMount } from 'svelte';
    import { getAnnouncements, createAnnouncement } from '../../lib/api';
  
    let announcements = [];
    let loading = true;
    let error = null;
      let newAnnouncementTitle = "";
      let newAnnouncementContent = "";
  
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
      async function handleSubmit(){
        try {
          const response = await createAnnouncement({
            title: newAnnouncementTitle,
                content: newAnnouncementContent
          }, 1); //Passing a 1 as a sample ID

            await fetchAnnouncements();

           newAnnouncementTitle = "";
            newAnnouncementContent = "";


            console.log('New Announcement Created', response);

        } catch (err) {
           error = err.message;
        }
    }
  </script>
  
  <h2>Bulletin Board</h2>
  
  {#if loading}
      <p>Loading announcements...</p>
  {:else if error}
      <p>Error: {error}</p>
  {:else}
      <table>
          <thead>
          <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Content</th>
              <th>Post Date</th>
          </tr>
          </thead>
          <tbody>
          {#each announcements as announcement}
              <tr>
                <td>{announcement.announcementId}</td>
                  <td>{announcement.title}</td>
                  <td>{announcement.content}</td>
                   <td>{new Date(announcement.postDate).toLocaleString()}</td>
              </tr>
          {/each}
          </tbody>
      </table>
  {/if}
  
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
  </form>
  
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
  </style>