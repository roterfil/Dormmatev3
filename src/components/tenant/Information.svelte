<script>
    import { onMount } from 'svelte';
    import { getUserById, updateUser } from '../../lib/api';
     import { useNavigate } from 'svelte-navigator';


    let loading = true;
    let error = null;
    let user = null;
    let userId = null;
    let currentPassword = "";
    let newPassword = "";
    let confirmNewPassword = "";
    let passwordError = null;

    const navigate = useNavigate();


    onMount(async () => {
         // Get userId from localStorage
        userId = localStorage.getItem('userId');
      fetchUser();
    });
        async function fetchUser() {
        loading = true;
        try{
          user = await getUserById(userId);
       } catch(err){
          error = err.message;
      } finally {
            loading = false;
      }
    }
    async function handleUpdatePassword(event) {
      event.preventDefault();
        passwordError = null;
    if (newPassword !== confirmNewPassword) {
        passwordError = 'Passwords do not match';
        return;
      }
      try {
       const updatedUser = {
           password: newPassword,
         };
            const response = await updateUser(userId, updatedUser);
           console.log("Password updated", response)
            newPassword = "";
            confirmNewPassword ="";
        }
      catch(error){
          passwordError = error.message;
         console.error('Error updating password', error)
       }
    }
</script>
<div class = "container">
<h2>User Profile</h2>

{#if loading}
 <p>Loading profile...</p>
   {:else if error}
     <p>Error: {error}</p>
 {:else}
    <div class="profile-card">
        <p><strong>Name: </strong>{user.name}</p>
        <p><strong>Username: </strong>{user.username}</p>
        <p><strong>Email: </strong>{user.email}</p>
         <p><strong>Contact Number: </strong>{user.contactNumber ? user.contactNumber : 'Not Available'}</p>
        <p>
               <strong>Move-In Date: </strong>
               {#if user.moveInDate}
                    {new Date(user.moveInDate).toLocaleDateString()}
                   {:else}
                      Not Set
                    {/if}
              </p>
           <p><strong>Unit: </strong>{user.unit ? user.unit.unitName : 'Not Assigned'}
      </p>
       <p><strong>Description: </strong> {user.unit ? user.unit.description : 'Not Assigned'}</p>
    <div class="password-change-form">
            <h3>Change Password</h3>
       {#if passwordError}
             <p class="error">{passwordError}</p>
           {/if}
         <form on:submit|preventDefault={handleUpdatePassword}>
              <div>
                 <label for="currentPassword">Current Password:</label>
                  <input type = "password" id="currentPassword" bind:value={currentPassword}/>
            </div>
              <div>
                <label for="newPassword">New Password:</label>
                  <input type="password" id="newPassword" bind:value={newPassword} required />
               </div>
               <div>
                  <label for="confirmNewPassword">Confirm New Password:</label>
                    <input type="password" id="confirmNewPassword" bind:value={confirmNewPassword} required />
                </div>
                 <button type="submit">Change Password</button>
             </form>
       </div>
    </div>
{/if}
</div>

<style>

  .container { 
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    margin-left: 300px;
  }
   .profile-card {
        background-color: white;
        border-radius: 8px;
         padding: 20px;
       box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
     width: 400px;
       margin: 0 auto;
       margin-top: 20px;
      line-height: 2em;
   }
    .profile-card p {
       margin-bottom: 10px;
   }
     .password-change-form {
         margin-top: 20px;
          padding: 10px;
           text-align: center;
      }
      .password-change-form h3 {
        margin-bottom: 20px;
      }
     .password-change-form form {
          display: flex;
        flex-direction: column;
        align-items: center;
        }
   .password-change-form form div {
         margin-bottom: 10px;
          display: flex;
           flex-direction: column; /* Arrange labels and inputs vertically */
    }
     .password-change-form label {
         text-align: left;
      }
    input[type="password"] {
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
   .error {
        color: red;
      margin-bottom: 10px;
   }
 </style>