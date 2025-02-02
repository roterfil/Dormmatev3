<script>
  import { onMount } from 'svelte';
  import { getUserById, updateUser } from '../../lib/api';
  import { useNavigate } from 'svelte-navigator';

  let loading = true;
  let error = null;
  let user = null;
  let userId = null;
  let currentPassword = '';
  let newPassword = '';
  let confirmNewPassword = '';
  let passwordError = null;
  let showModal = false; // Added showModal state

  const navigate = useNavigate();

  onMount(async () => {
    // Get userId from localStorage
    userId = localStorage.getItem('userId');
    fetchUser();
  });

  async function fetchUser() {
    loading = true;
    try {
      user = await getUserById(userId);
    } catch (err) {
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
      await updateUser(userId, updatedUser);
      console.log('Password updated');
      newPassword = '';
      confirmNewPassword = '';
      showModal = false;
    } catch (error) {
      passwordError = error.message;
      console.error('Error updating password', error);
    }
  }

  function openModal() {
    showModal = true;
    passwordError = null;
  }

  function closeModal() {
    showModal = false;
    passwordError = null;
    currentPassword = '';
    newPassword = '';
    confirmNewPassword = '';
  }
</script>

<div class="container">
  <h2>User Profile</h2>

  {#if loading}
    <p class="loading-message">Loading profile...</p>
  {:else if error}
    <p class="error-message">Error: {error}</p>
  {:else}
    <div class="profile-card">
      <div class="profile-header">
        <h3 class="profile-name">{user.name}</h3>
      </div>
      <div class="profile-details">
        <div class="detail-item">
          <strong>Username: </strong>
          <span class="detail-value">{user.username}</span>
        </div>
        <div class="detail-item">
          <strong>Email: </strong>
          <span class="detail-value">{user.email}</span>
        </div>
        <div class="detail-item">
          <strong>Contact Number: </strong>
          <span class="detail-value">
            {user.contactNumber ? user.contactNumber : 'Not Available'}
          </span>
        </div>
        <div class="detail-item">
          <strong>Move-In Date: </strong>
          <span class="detail-value">
            {#if user.moveInDate}
              {new Date(user.moveInDate).toLocaleDateString()}
            {:else}
              Not Set
            {/if}
          </span>
        </div>
        <div class="detail-item">
          <strong>Unit: </strong>
          <span class="detail-value">
            {user.unit ? user.unit.unitName : 'Not Assigned'}
          </span>
        </div>
        <div class="detail-item">
          <strong>Description: </strong>
          <span class="detail-value">
            {user.unit ? user.unit.description : 'Not Assigned'}
          </span>
        </div>
      </div>
      <button class="button primary" on:click={openModal}>Change Password</button>
    </div>
  {/if}
</div>

{#if showModal}
  <div class="modal-overlay" on:click|self={closeModal}>
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title">Change Password</h3>
        <button on:click={closeModal} class="modal-close-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="close-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      {#if passwordError}
        <p class="error-message">{passwordError}</p>
      {/if}
      <form on:submit|preventDefault={handleUpdatePassword}>
        <div class="form-group">
          <label for="currentPassword">Current Password</label>
          <input type="password" id="currentPassword" bind:value={currentPassword} />
        </div>
        <div class="form-group">
          <label for="newPassword">New Password</label>
          <input type="password" id="newPassword" bind:value={newPassword} required />
        </div>
        <div class="form-group">
          <label for="confirmNewPassword">Confirm New Password</label>
          <input type="password" id="confirmNewPassword" bind:value={confirmNewPassword} required />
        </div>
        <button type="submit" class="button primary">Change Password</button>
      </form>
    </div>
  </div>
{/if}

<style>
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

  .error-message {
    color: #dc3545;
    text-align: center;
    margin-bottom: 10px;
  }

  .profile-card {
    background-color: #fff;
    border-radius: 12px;
    padding: 25px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
    width: 80%;
    max-width: 600px;
    margin: 20px auto;
    transition: box-shadow 0.3s ease;
  }

  .profile-card:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
  }

  .profile-header {
    margin-bottom: 20px;
    border-bottom: 1px solid #e9ecef;
    padding-bottom: 15px;
  }

  .profile-name {
    margin: 0;
    font-size: 1.7rem;
    font-weight: 600;
    color: #343a40;
  }

  .profile-details {
    margin-bottom: 20px;
  }

  .detail-item {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
  }

  .detail-item strong {
    min-width: 130px;
    margin-right: 8px;
  }

  .detail-value {
    flex: 1;
    color: #495057;
  }

  .button {
    padding: 12px 25px;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    margin: 10px 0;
    transition: background-color 0.3s ease;
  }

  .button.primary {
    background-color: #007bff;
  }

  .button.primary:hover {
    background-color: #0056b3;
  }

  /* Modal Overlay */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  /* Modal Content */
  .modal-content {
    background-color: #fff;
    border-radius: 12px;
    padding: 25px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
    width: 80%;
    max-width: 500px;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  .modal-title {
    margin: 0;
    color: #495057;
  }

  .modal-close-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
  }

  .close-icon {
    width: 20px;
    height: 20px;
    color: #495057;
  }

  .modal-content form {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  .modal-content .form-group {
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
  }

  .modal-content label {
    text-align: left;
    margin-bottom: 5px;
    color: #495057;
  }

  .modal-content input[type='password'] {
    padding: 12px;
    border: 1px solid #ced4da;
    border-radius: 6px;
    width: 100%;
    box-sizing: border-box;
    transition: border-color 0.2s ease;
  }

  .modal-content input[type='password']:focus {
    border-color: #007bff;
    outline: none;
  }
</style>