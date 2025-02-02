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
      // Fetch announcements
      const data = await getAnnouncements();
      
      // Sort announcements by postDate in descending order (most recent first)
      announcements = data.sort((a, b) => new Date(b.postDate) - new Date(a.postDate));
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  }
</script>

<div class="container">
  <h2>Announcements</h2>

  {#if loading}
      <p class="loading-message">Loading announcements...</p>
  {:else if error}
      <p class="error-message">Error: {error}</p>
  {:else}
      <div class="announcement-list">
          {#each announcements as announcement}
              <div class="announcement-card">
                  <div class="announcement-header">
                       <div class="announcement-header-left">
                         <h3 class="announcement-title">{announcement.title}</h3>
                         <small class="post-by">Posted by Admin</small>
                       </div>
                      <div class="announcement-menu">
                        <svg xmlns="http://www.w3.org/2000/svg" class="dots-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                         </svg>
                       </div>
                  </div>
                  <p class="announcement-content">{announcement.content}</p>
                  <small class="post-date">Posted on: {new Date(announcement.postDate).toLocaleString()}</small>
              </div>
          {/each}
      </div>
  {/if}
</div>

<style>
<<<<<<< HEAD
   .container {
        max-width: 800px;
        margin-top: 20px;
        margin-left: 435px;
        margin-right: auto;
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
=======
 .container {
      max-width: 800px;
      margin-top: 20px;
      margin-left: 435px;
      margin-right: auto;
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
>>>>>>> 319d7728516c9f2ea6b47ddf6622a229a9659396

  .error-message {
    color: #dc3545;
      text-align: center;
    margin-bottom: 10px;
  }
  .announcement-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
  }

  .announcement-card {
      background-color: #fff;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
      transition: box-shadow 0.3s ease;
     position: relative;
  }
    .announcement-card:hover {
       box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
   }
.announcement-header{
      display: flex;
     justify-content: space-between;
     align-items: center;
     margin-bottom: 10px;
  }
  .announcement-header-left{
      display: flex;
      flex-direction: column;
  }
 .announcement-title {
     margin: 0;
     color: #343a40;
  }
  .post-by {
      font-size: 0.8em;
     color: #555;
  }
  .announcement-menu{
     cursor: pointer;
      position: absolute;
      right: 15px;
     top: 15px;
    opacity: 0.6;
  }
 .announcement-menu:hover {
      opacity: 1;
  }
  .dots-icon{
        width: 20px;
      height: 20px;
      color: #495057;
  }
  .announcement-content {
      margin-bottom: 10px;
      line-height: 1.5;
  }
  .post-date {
      display: block;
      text-align: right;
      font-size: 0.8em;
      color: #555;
  }
</style>