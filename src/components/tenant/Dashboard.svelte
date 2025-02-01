<script>
  import { onMount } from 'svelte';
  import { Link } from 'svelte-navigator';
  import { getUserById } from '../../lib/api';

  let userId = null;
  let userRole = null;
  let userName = null;
  let userUnit = null;
  let userDescription = null;
  let userMoveInDate = null;
  let loading = true;
  let error = null;

  onMount(async () => {
    userRole = localStorage.getItem('role');
    userId = localStorage.getItem('userId');
    fetchUserData();
  });

  async function fetchUserData() {
    loading = true;
    try {
      const response = await getUserById(userId);
      userName = response.name;
      userUnit = response.unit.unitName;
      userDescription = response.unit.description;
      userMoveInDate = response.moveInDate
        ? new Date(response.moveInDate).toLocaleDateString()
        : 'Not Set';
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  }
</script>

{#if loading}
  <p class="loading-message">Loading user data...</p>
{:else if error}
  <p class="error-message">Error: {error}</p>
{:else}
  <main class="main-content">
    <div class="welcome-container">
      <h2 class="dashboard-title">Hello There, {userName}!</h2>
      <p class="dashboard-intro">
        This will be your personalized dashboard, providing easy access to
        essential features such as rent payments, maintenance requests,
        announcements, and other tools to enhance your tenant experience and
        ensure seamless communication with management.
      </p>

      <div class="dashboard-content">
        <div class="info-section">
           <div class="img-column">
              <img
                src="assets/tenantpic.png"
                alt="User Illustration"
                class="dashboard-image"
              />
          </div>

         <div class="txt-column">
             <h3 class="info-title">Your Information</h3>
               <div class="user-info-card">
                  <h2 class="info-name">{userName}</h2>
                    <hr class="info-divider" />
                      <div class="info-details">
                        <p>
                          <strong>Unit:</strong> {userUnit}
                        </p>
                        <p>
                           <strong>Description:</strong> {userDescription}
                        </p>
                          <p>
                            <strong>Move-In Date:</strong> {userMoveInDate}
                          </p>
                      </div>
                     <p class="view-more"><a href="/tenant/information">View more</a></p>
               </div>
            </div>
        </div>

        <div class="horizontal-divider" />

        <h2 class="features-title">Navigate here!</h2>
        <p class="features-description">
          You may easily navigate the latest announcements, track the status of
          your reports or maintenance requests, and manage your rent payments, all
          in one place for a more convenient and hassle-free tenant experience.
        </p>

        <div class="features-container">
            <div class="feature-card" tabindex="0" role="button">
              Maintenance Request
                <p class="feature-description">
                    Submit maintenance requests for your assigned unit.
                    <Link to="/tenant/maintenance" >
                        <button class="dashboard-button">Submit Request</button>
                    </Link>
                </p>
            </div>


            <div class="feature-card" tabindex="0" role="button">
             Payment Proof
                <p class="feature-description">
                   Submit your payment proofs for your assigned unit.
                    <Link to="/tenant/payment" >
                        <button class="dashboard-button">Submit Proof</button>
                    </Link>
                </p>
           </div>

            <div class="feature-card" tabindex="0" role="button">
                Announcements
                <p class="feature-description">
                    View the latest announcements.
                     <Link to="/tenant/announcements">
                        <button class="dashboard-button">View Announcements</button>
                      </Link>
                </p>
           </div>
        </div>
      </div>
    </div>
  </main>
{/if}

<style>
    .main-content {
        flex-grow: 1;
        padding: 20px;
        display: flex;
       flex-direction: column;
       overflow-y: auto;
       margin-left: 250px;
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
        align-items: center;
     }
    .dashboard-title {
        align-self: start;
       margin-bottom: 10px;
     color: #343a40;
        font-size: 2.5em;
       font-weight: 700;
    }
 .highlight {
        color: #20a7b5;
  }
   .dashboard-intro {
        color: #000;
        align-self: start;
        margin-top: 0px;
    }
   .loading-message {
        text-align: center;
        color: #555;
    }
 .error-message {
      color: #dc3545;
      text-align: center;
       margin-bottom: 10px;
   }
    .dashboard-content {
        display: flex;
        flex-direction: column;
        width: 100%;
    }
 .info-title {
      margin-bottom: 20px;
        font-weight: 700;
        color: #495057;
     text-align: left;
      margin-left: 23px;
   }
    .info-section {
        display: flex;
        gap: 20px;
      margin-bottom: 20px;
       align-items: flex-start;
        width: 100%;
      justify-content: center;
    }
   .dashboard-image {
         aspect-ratio: 1;
        object-fit: contain;
      width: 100%;
        flex-grow: 1;

   }
   .user-info-card {
        flex: 1;
       display: flex;
        flex-direction: column;
        align-self: stretch;
     color: #000;
       margin: auto 0;
        border-radius: 20px;
        border: 1px solid #c0c0c0;
       padding: 28px 23px;
        overflow: hidden;
    }
   .info-name {
     margin-bottom: 5px;
        margin-top: 5px;
       font-weight: 700;
   }
    .info-divider {
      border: 0;
       height: 1px;
        background-color: #ced4da;
        margin: 8px 0;
    }
  .info-details {
      margin-top: 0px;
       margin-bottom: 10px;
        font-size: 16px;
       font-weight: 300;
  }
  .view-more {
      text-align: right;
        margin-top: auto;
   }
    .view-more a {
        color: #007bff;
       text-decoration: none;
  }
   .horizontal-divider {
       border: 1px solid #313132;
        margin: 15px 0 0;
   }
    .features-title {
      margin-top: 35px;
      gap: 10px;
      color: #262730;
      font-size: 2em;
      font-weight: 700;

    }

    .features-description {
       color: #000;
     margin-top: 0px;
        font: 400 14px;
    }

    .features-container {
        display: grid;
      margin-top: 27px;
       gap: 20px;
       color: #000;
       grid-template-columns: repeat(2, 1fr);
        font: 700 20px;
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
      font-size: 18px;
      font-weight: 600;

    }
     .feature-description {
         font-size: 15px;
         font-weight: 400;
         margin-top: 10px;
        text-align: left;
   }
   .dashboard-button {
       display: inline-block;
        background-color: #007bff;
      color: white;
       padding: 10px 15px;
      text-decoration: none;
        border-radius: 6px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        margin-top: 15px;
     border: none;
    }
    .dashboard-button:hover {
      background-color: #0056b3;
    }
    
  .txt-column {
        display: flex;
        flex-direction: column;
     width: 50%;
        margin-left: 20px;
    }

   .img-column {
       display: flex;
        flex-direction: column;
       width: 50%;
   }

   @media (max-width: 991px) {
      .dashboard-container {
          margin-right: 10px;
    }
      @media (max-width: 991px) {
        .horizontal-divider {
           max-width: 100%;
       }
     }
     .dashboard-container,
      .info-section,
       .dashboard-title,
       .dashboard-intro,
       .divider,
      .features-title,
       .features-description,
      .features-container {
          max-width: 100%;
       }
        .info-section{
           flex-direction: column;
          align-items: stretch;
       }
        .dashboard-image {
         max-width: 100%;
      }
     .user-info-card {
          width: 100%;
    }
    }
</style>