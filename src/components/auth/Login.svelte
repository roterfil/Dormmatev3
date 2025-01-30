<script>
  import { createEventDispatcher } from 'svelte';
  import { navigate } from 'svelte-navigator';

  const dispatch = createEventDispatcher();

  let username = '';
  let password = '';
  let error = null;

  async function login(username, password) {
    const response = await fetch('http://localhost:8080/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }

    return response.json();
  }

  async function handleSubmit() {
    error = null;
    try {
      const response = await login(username, password);
      localStorage.setItem('role', response.role);
      localStorage.setItem('userId', response.userId);
      localStorage.setItem('unitId', response.unitId);
      
      // Redirect based on role
      if (response.role === 'admin') {
        navigate('/admin');
      } else if (response.role === 'tenant') {
        navigate('/tenant');
      } else {
        navigate('/');
      }
    } catch (err) {
      error = err.message || 'Login failed';
    }
  }
</script>

<div class="login-container">
  <h2>Login</h2>
  
  {#if error}
    <p class="error">{error}</p>
  {/if}
  
  <form on:submit|preventDefault={handleSubmit}>
    <div>
      <label for="username">Username:</label>
      <input type="text" id="username" bind:value={username} required />
    </div>
    <div>
      <label for="password">Password:</label>
      <input type="password" id="password" bind:value={password} required />
    </div>
    <button type="submit">Login</button>
  </form>
</div>

<style>
  /* Your existing styles remain the same */
</style>