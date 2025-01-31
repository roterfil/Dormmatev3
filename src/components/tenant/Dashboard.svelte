<script>
  import { onMount } from 'svelte';
  import { Link } from 'svelte-navigator';
  import { getUserById } from '../../lib/api';

  let userId = null;
  let userRole = null;
  let userName = null; // Added userName variable
  let loading = true;
    let error = null;


  onMount(async () => {
    // Get the role and userId from local storage
    userRole = localStorage.getItem('role');
    userId = localStorage.getItem('userId');
      fetchUserData();
  });
  
 async function fetchUserData() {
    loading = true;
    try{
      const response = await getUserById(userId);
      userName = response.name;
    } catch(err){
          error = err.message;
      } finally {
        loading = false;
      }

  }
</script>

{#if loading}
  <p>Loading user data...</p>
    {:else if error}
        <p>Error: {error}</p>
{:else}
  <div class="tenantdashboard">
  <h2>Tenant Dashboard</h2>

 <p>Welcome, {userName}! </p>
  <p>
   Here you can access:
  </p>
   <ul>
       <li>View the latest announcements.</li>
        <li>Submit your payment proofs for your assigned unit.</li>
        <li>Submit maintenance requests for your assigned unit.</li>
         <li>See your profile, and update your password.</li>
  </ul>
    </div>
 {/if}
  <style>
  .tenantdashboard {
    display: flex;
    flex-direction: column;
    padding: 20px;
    margin-left: 300px; /* to not overlap with the sidebar */
  }
    nav ul {
        list-style: none;
       padding: 0;
        display: flex; /* Use flexbox for horizontal layout */
        gap: 10px;
        justify-content: center;
     }
     nav li {
       margin: 5px; /* Added spacing between items */
    }

   nav a {
        background-color: #007bff;
        color: white;
        padding: 10px 15px;
        text-decoration: none;
       border-radius: 5px;
     cursor: pointer;
       display: inline-block;
   }
      nav a:hover {
         opacity: 0.8;
       }
</style>