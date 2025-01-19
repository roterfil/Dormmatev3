<script>
    import { onMount } from 'svelte';
    import { getAnnouncements } from '../../lib/api';
  
    let announcements = [];
    let loading = true;
    let error = null;
  
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
  </script>
  
  <h2>Announcements</h2>
  
  {#if loading}
    <p>Loading announcements...</p>
  {:else if error}
    <p>Error: {error}</p>
  {:else}
    <div class="announcement-list">
      {#each announcements as announcement}
        <div class="announcement-card">
          <h3>{announcement.title}</h3>
          <p>{announcement.content}</p>
            <small class="post-date">Posted on: {new Date(announcement.postDate).toLocaleString()}</small>
        </div>
      {/each}
    </div>
  {/if}
  
  <style>
   .announcement-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
      .announcement-card {
        background-color: white;
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  
      .announcement-card h3 {
         margin-top: 0;
      }
  
   .announcement-card p {
     margin-bottom: 10px;
        line-height: 1.5;
    }
    .post-date {
        display: block;
      text-align: right;
      font-size: 0.8em;
        color: gray;
    }
  </style>