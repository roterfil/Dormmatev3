<script>
    import { createEventDispatcher } from 'svelte';
    import { useNavigate, useLocation } from 'svelte-navigator';
  
    const dispatch = createEventDispatcher();
    const navigate = useNavigate();
      const location = useLocation();
  
    let username = '';
    let password = '';
    let error = null;
  
      async function handleSubmit() {
        error = null;
        console.log('Login submitted');
  
          const queryParams = new URLSearchParams(location.search);
          const role = queryParams.get('role');
          if (role === 'admin') {
             localStorage.setItem("role", 'admin')
             navigate('/admin');
          } else {
              localStorage.setItem("role", 'tenant');
              navigate('/tenant');
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
    .login-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 5px;
      width: 300px;
      margin: 0 auto;
    }
    h2 {
      text-align: center;
      margin-bottom: 20px;
    }
    .error {
      color: red;
      margin-bottom: 10px;
    }
    form {
      display: flex;
      flex-direction: column;
    }
    form div {
      margin-bottom: 10px;
    }
    label {
      display: block;
      margin-bottom: 5px;
    }
    input[type="text"],
    input[type="password"] {
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    button {
      padding: 10px 20px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background-color: #0056b3;
    }
  </style>