<!-- <script>
    import { createEventDispatcher } from 'svelte';
    import { register } from '../lib/api'; // Import your registration API function
    import { useNavigate } from 'svelte-navigator';
    
    const dispatch = createEventDispatcher();
    const navigate = useNavigate();
    
    let username = '';
    let password = '';
    let confirmPassword = '';
    let email = '';
    let role = 'tenant'; // You might want to make this selectable (e.g., a dropdown)
    let error = null;
    
    async function handleSubmit() {
      error = null;
    
      if (password !== confirmPassword) {
        error = 'Passwords do not match';
        return;
      }
    
      const userData = {
        username,
        password,
        email,
        role,
      };
    
      try {
        const response = await register(userData);
    
        // Handle successful registration
        console.log('Registration successful:', response);
    
        // Redirect to login page or dashboard
        navigate('/login');
      } catch (err) {
        error = err.message || 'Registration failed';
      }
    }
    </script>
    
    <h2>Register</h2>
    
    {#if error}
      <p class="error">{error}</p>
    {/if}
    
    <form on:submit|preventDefault={handleSubmit}>
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" bind:value={username} required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" bind:value={email} required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" bind:value={password} required />
      </div>
      <div>
        <label for="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" bind:value={confirmPassword} required />
      </div>
      <div>
        <label for="role">Role:</label>
        <select id="role" bind:value={role}>
          <option value="tenant">Tenant</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <button type="submit">Register</button>
    </form>
    
    <style>
      .error {
        color: red;
        margin-bottom: 10px;
      }
    </style> -->