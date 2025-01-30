<script>
    import { Link, useNavigate, useLocation } from 'svelte-navigator';
    import { onMount } from 'svelte';

    let userRole = null;
    let isLoggedIn = false;
    const navigate = useNavigate();
    const location = useLocation();

    onMount(() => {
        // Check if user is logged in and their role
        const storedToken = localStorage.getItem('token');
        const storedRole = localStorage.getItem('role');
        if (storedToken) {
        isLoggedIn = true;
        userRole = storedRole;
        }
    });

    function handleLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        isLoggedIn = false;
        userRole = null;
        navigate('/login');
    }

    function gotoAdminLogin(){
        navigate('login');
    }

    // $: showSidebar = !location.pathname.startsWith('/admin');
</script>

<div class="app">
    <aside class="sidebar">
        <div class="sidebar-header">
            <Link to="/" class="logo-link">
                <img src="/dorm-logo.png" alt="DormMate Logo" class="logo" />
            </Link>
            <h1>DormMate</h1>
        </div>

        {#if isLoggedIn}
        <ul>
            {#if userRole === 'admin'}
            <li><Link to="/admin">Dashboard</Link></li>
            <li><Link to="/admin/units">Unit Management</Link></li>
            <li><Link to="/admin/tenants">Payment Tracking</Link></li>
            <li><Link to="/admin/announcements">Bulletin Board</Link></li>
            <li><Link to="/admin/maintenance">Maintenance Requests</Link></li>
            {:else if userRole === 'tenant'}
            <li><Link to="/tenant">Dashboard</Link></li>
            <li><Link to="/tenant/announcements">Announcements</Link></li>
            <li><Link to="/tenant/payments">Send Payments</Link></li>
            <li><Link to="/tenant/maintenance">Maintenance</Link></li>
            {/if}
        </ul>
        <div class="button-contaier">
        <button on:click={handleLogout} class="logout-button">Logout</button>
        </div>
        {:else}
        <div class="button-container">
        <button on:click={gotoAdminLogin} class="login-button">Login</button>
        </div>
        {/if}
    </aside>


  <div class="main-content">
      <slot />
  </div>
</div>

<style>
    /* Updated CSS styles */
    .app {
        display: flex;
        min-height: 100vh;
    }

    .sidebar {
        background-color: #051650; /* Updated sidebar color */
        color: white;
        width: 225px;
        padding-top: 20px;
        padding-bottom: 20px;
        position: fixed; /* Fix the sidebar */
        height: 96%;
        top: 0;
        left: 0;
         display: flex;
         flex-direction: column;
         justify-content: space-between; /* Added for logout button */
         text-align: center;
         border-radius: 0 20px 20px 0;
    }

    .sidebar-header {
        margin-bottom: 20px;
    }

    .logo-link {
      display: block; /* Make the logo a block element for proper centering */
      text-align: center; /* Center the logo within the container */
      margin-bottom: 10px; /* Give spacing under the logo */
    }

    .logo {
      margin-bottom: 10px;
      height: 40px; /* Adjust as necessary */
        display: block;
         margin-left: auto;
          margin-right: auto;
  }

    .sidebar h1 {
        margin-bottom: 20px; /* Add space below the title */
    }
    .sidebar ul {
        list-style: none;
        padding: 0;
    }

    .sidebar li {
        margin-bottom: 10px;
    }

    .main-content {
        flex-grow: 1;
        padding: 20px;
        margin-left: 200px; /* Added margin to prevent content from going under the sidebar */
    }

    .logout-button {
        background-color: #d9534f;
        border: none;
        color: white;
        padding: 10px 20px;
        text-align: center;
        text-decoration: none;
        display: block;
        font-size: 16px;
        margin: 10px 0;
        cursor: pointer;
        border-radius: 4px;
        width: 100%;
    }
    .logout-button:hover {
        background-color: #c9302c;
    }

    .button-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: auto;
    padding-bottom: 20px;
  }

  .login-button {
    background-color: transparent;
    color: white;
    padding: 10px 30px;
    text-align: center;
    text-decoration: none;
    display: block;
    font-size: 16px;
    margin: 10px 0;
    cursor: pointer;
    border: none;
    width: auto; /* Set the width to auto */
    min-width: 150px; /* Set a minimum width */
  }

  .login-button:hover {
    background-color: #03103c;
  }
</style>