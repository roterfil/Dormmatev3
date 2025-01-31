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
  </script>
  
<div class="welcome-container">
  <aside class="sidebar">
    <div class="sidebar-header">
        <Link to="/" class="logo-link">
            <img src="./assets/dormmate-logo.png" alt="DormMate Logo" class="logo" />
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

  <div class="content-wrapper">
      <h1 class="welcome-title">Welcome to&nbsp;<span class="highlight">Dorm</span>Mate!
      </h1>
    <p class="intro-text">
      <span style="font-weight: bold;">DormMate</span>
      <span>is a modern solution for dormitory and apartment living, designed to simplify life for both tenants and owners.</span>
    </p>

    <section class="about-section">
      <div class="about-content">
        <div class="image-column">
          <img src="https://placehold.co/600x400/e6f7f8/e6f7f8" alt="About DormMate" class="about-image">
        </div>
        <div class="text-column">
          <div class="about-text-wrapper">
            <h2 class="about-heading">About Us</h2>
            <p class="about-description">
              <span style="font-weight: bold;">DormMate</span>provides a streamlined digital platform that fosters efficiency and convenience. Whether you're a tenant seeking updates or an owner managing tasks, DormMate ensures seamless interaction and hassle-free management in today's fast-paced urban environment.
            </p>
          </div>
        </div>
      </div>
    </section>

    <div class="horizontal-divider"></div>

    <hr class="divider">
    <h2 class="features-title">Features</h2>
    <p class="features-description">
      DormMate offers a range of features designed to enhance dormitory and apartment living. Stay informed with real-time announcements, easily track and manage payments, and report maintenance issues seamlessly through our user-friendly platform.
    </p>
    <div class="features-container">
      <div class="feature-card" tabindex="0" role="button">Unit Management</div>
      <div class="feature-card" tabindex="0" role="button">Payment Tracking</div>
      <div class="feature-card" tabindex="0" role="button">Bulletin Board</div>
      <div class="feature-card" tabindex="0" role="button">Maintenance Request</div>
    </div>
  </div> 

  <a href="/login"> Login </a>

</div>


<style>
  .welcome-container {
    display: flex;
    margin-top: 0;
    width: 885px;
    max-width: 100%;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
  }
  .content-wrapper {
    display: flex;
    margin-top: 4px;
    flex-direction: column;
  }
  .welcome-title {
    flex: 1;
    display: flex;
    align-items: start;
    gap: 0px;
    color: #262730;
    font: 700 40px/1.2 Source Sans Pro, -apple-system, Roboto, Helvetica, sans-serif;
  }
  .highlight {
    color: #20a7b5;
  }
  .intro-text {
    color: #000;
    align-self: start;
    margin-top: 0px;
    font: 300 16px Source Sans Pro, sans-serif;
  }
  .about-section {
    margin-top: 0px;
  }
  .about-content {
    gap: 20px;
    display: flex;
  }
  .image-column {
    display: flex;
    flex-direction: column;
    width: 50%;
  }
  .about-image {
    aspect-ratio: 0.96;
    object-fit: contain;
    width: 100%;
    flex-grow: 1;
  }
  .text-column {
    display: flex;
    flex-direction: column;
    width: 50%;
    margin-left: 20px;
  }
  .about-text-wrapper {
    display: flex;
    flex-direction: column;
    align-self: stretch;
    font-family: Source Sans Pro, sans-serif;
    color: #000;
    margin: auto 0;
  }
  .about-heading {
    font-size: 20px;
    font-weight: 700;
    align-self: start;
    margin-left: 23px;
  }
  .about-description {
    border-radius: 20px;
    border: 1px solid #c0c0c0;
    display: flex;
    margin-top: 0px;
    padding: 28px 23px;
    flex-direction: column;
    overflow: hidden;
    font-size: 16px;
    font-weight: 300;
    justify-content: center;
  }

  .horizontal-divider {
    border: 1px solid #313132;
    margin: 15px 0 0;
  }

  .divider {
    border: 1px solid #313132;
    margin-top: 15px 0 0;

  }
  .features-title {
    flex: 1;
    margin-top: 35px;
    gap: 10px;
    color: #262730;
    font: 700 40px/1.2 Source Sans Pro, -apple-system, Roboto, Helvetica, sans-serif;
  }
  .features-description {
    color: #000;
    margin-top: 0px;
    font: 400 14px Source Sans Pro, sans-serif;
  }
  .features-container {
    display: grid;
    margin-top: 27px;
    gap: 20px;
    color: #000;
    grid-template-columns: repeat(2, 1fr); /* Two equal-width columns */
    font: 700 20px 'Source Sans Pro', sans-serif;
  }
  .feature-card {
    border-radius: 20px;
    border: 1px solid #c0c0c0;
    padding: 20px 26px;
    overflow: hidden;
    flex-grow: 1;
    width: 100%;
    box-sizing: border-box;
  }

  .app {
        display: flex;
        min-height: 100vh;
    }

    .sidebar {
        background-color: #051650; /* Updated sidebar color */
        color: white;
        width: 250px;
        padding: 1rem;
        position: fixed; /* Fix the sidebar */
        height: 100vh; /* Full viewport height */
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between; /* Added for logout button */
        text-align: center;
        border-radius: 0 20px 20px 0;
        z-index: 1000; /* Ensure sidebar is above other content */
        overflow-y: auto; /* Add scroll if content overflows */
        gap: 2rem;
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


  @media (max-width: 991px) {
    .welcome-container {
      margin-right: 10px;
    }

    @media (max-width: 991px) {
    .horizontal-divider {
      max-width: 100%;
    }
  }
    .content-wrapper,
    .about-section,
    .welcome-title,
    .intro-text,
    .divider,
    .features-title,
    .features-description,
    .features-container {
      max-width: 100%;
    }
    .about-content {
      flex-direction: column;
      align-items: stretch;
    }
    .image-column,
    .text-column {
      width: 100%;
      margin-left: 0;
    }
    .text-column {
      margin-top: 20px;
    }
    .about-text-wrapper {
      margin-top: 40px;
    }
    .about-heading {
      margin-left: 10px;
    }
    .about-description {
      padding: 20px;
    }
    .features-title {
      margin-right: 2px;
      white-space: initial;
    }
    .features-description {
      margin-right: 2px;
    }
    .feature-card {
      padding: 20px;
      width: 100%;
    }

  }
</style>