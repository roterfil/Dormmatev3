<script>
  import { Link, useNavigate, useLocation } from 'svelte-navigator';
  import { onMount } from 'svelte';

  let userRole = null;
  let isLoggedIn = false;
  const navigate = useNavigate();
  const location = useLocation();

  onMount(() => {
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

  function gotoAdminLogin() {
    navigate('login');
  }
</script>

<div class="app">
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

    <main class="main-content">
       <div class="welcome-container">
         <h1 class="welcome-title">Welcome to <span class="highlight">Dorm</span>Mate!
        </h1>
        <p class="intro-text">
          <span style="font-weight: bold;">DormMate</span>
          <span>is a modern solution for dormitory and apartment living, designed to simplify life for both tenants and owners.</span>
        </p>

        <section class="about-section">
          <div class="about-content">
            <div class="image-column">
              <img src="assets\landingpagepic.png" alt="About DormMate" class="about-image">
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
          <div class="feature-card" tabindex="0" role="button">Unit Management
              <p class="feature-description">
                  Allows the admin to add and manage units. They can assign tenants to specific units and store tenant information, ensuring streamlined tracking and updates.
              </p>
          </div>
           <div class="feature-card" tabindex="0" role="button">Payment Tracking
                <p class="feature-description">
                    Ensure rent payments are marked as completed and send automated email reminders to tenants for any outstanding balances, helping to maintain timely collections and organized records.
                </p>
           </div>
           <div class="feature-card" tabindex="0" role="button">Maintenance Request
                <p class="feature-description">
                   Easily view and track reports submitted by tenants regarding maintenance issues or fixtures that need attention, allowing for prompt resolution and improved property management efficiency.
               </p>
           </div>
           <div class="feature-card" tabindex="0" role="button">Bulletin Board
               <p class="feature-description">
                   Post and manage announcements regarding dorm updates, scheduled power interruptions, maintenance activities, or other important information, ensuring tenants stay informed and prepared for any changes or disruptions.
               </p>
          </div>
        </div>
      </div>
    </main>
</div>


<style>

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
        font-family: var(--main-font);
    }
    .sidebar ul {
        list-style: none;
        padding: 0;
         font-family: var(--main-font);
    }

    .sidebar li {
        margin-bottom: 10px;
    }

    .main-content {
      flex-grow: 1;
       padding: 20px;
        display: flex;
        flex-direction: column;
      overflow-y: auto;
       margin-left: 250px;

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
        font-family: var(--main-font);
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
     width: auto;
        min-width: 150px;
        font-family: var(--main-font);
    }
 .login-button:hover {
     background-color: #03103c;
   }


  .welcome-container {
        width: 885px;
        max-width: 100%;
         margin-left: auto;
      margin-right: auto;
      padding: 20px;
     box-sizing: border-box;
       display: flex;
        flex-direction: column;
        font-family: var(--main-font);
    }

  .welcome-title {
    display: flex;
     align-items: start;
        gap: 0px;
        color: #262730;
      font-size: 2.5em;
      font-weight: 700;
    }

 .highlight {
       color: #20a7b5;
    }

   .intro-text {
     color: #000;
     align-self: start;
      margin-top: 0px;
      font: 300 16px;
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
        font-weight: 350;
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
        margin-top: 35px;
        gap: 10px;
     color: #262730;
      font-size: 2.5em;
      font-weight: 600;
    }

   .features-description {
     color: #000;
     margin-top: 0px;
        font: 400 14px var(--main-font), sans-serif;
  }
   .features-container {
       display: grid;
        margin-top: 27px;
      gap: 20px;
       color: #000;
        grid-template-columns: repeat(2, 1fr);
      font-size: 18px;
      font-weight: 640;
    }

   .feature-card {
     border-radius: 20px;
        border: 1px solid #c0c0c0;
     padding: 20px 26px;
     overflow: hidden;
        flex-grow: 1;
        width: 100%;
        box-sizing: border-box;
        display: flex;
      flex-direction: column;
      align-items: flex-start;

    }
   .feature-description {
      font-size: 14px;
        font-weight: 400;
        margin-top: 10px;
        text-align: left;
     font-family: var(--main-font);

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
      .welcome-container,
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