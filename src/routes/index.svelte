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
      <div class="logo-container">
        <img src="/assets/dormmate-logo.png" alt="DormMate" class="logo" />
        <h1 class="brand">DormMate</h1>
        <p class="tagline">Manage your dorm with ease</p>
        <hr>
      </div>
    </div>

    <!-- Move the logout button to the bottom of the sidebar -->
    <div class="footer-links">
      <Link to="/login">
        <button class="logout-button" on:click={handleLogout}>
          <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd" />
          </svg>
          Log in
        </button>
      </Link>
    </div>
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
    background-color: #051650;
    color: white;
    width: 250px;
    padding: 1rem;
    position: fixed;
    height: 100vh;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
    border-radius: 0 20px 20px 0;
    z-index: 1000;
    overflow-y: auto;
}

.logo-container {
    text-align: center;
}

.logo {
    width: 80px;
    height: 80px;
    margin-top: 10px;
    margin-bottom: -10px;
}

.brand {
    font-size: 1.5rem;
    font-weight: 800;
    color: #00ffff;
    margin: 0;
}

.tagline {
    font-size: 0.875rem;
    color: #b3e0e0;
    margin: 0.5rem 0 0 0;
}

.footer-links {
    margin-top: auto;
    width: 100%;
    padding: 0 1rem;
    box-sizing: border-box;
}

.logout-button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 0.75rem;
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background-color 0.2s;
    margin-bottom: 3rem;
}

.logout-button:hover {
    background-color: rgba(255, 255, 255, 0.2);
}

.icon {
    width: 1.25rem;
    height: 1.25rem;
}

.main-content {
    flex: 1;
    padding: 2rem;
    background-color: #f5f5f5;
    margin-left: 250px;
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