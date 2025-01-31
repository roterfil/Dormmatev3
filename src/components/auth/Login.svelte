<script>
  import { createEventDispatcher } from 'svelte';
  import { navigate } from 'svelte-navigator';

  const dispatch = createEventDispatcher();

  let username = '';
  let password = '';
  let error = null;
  let isLoading = false;
  let showPassword = false;

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
    isLoading = true;
    
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
    } finally {
      isLoading = false;
    }
  }

  function togglePasswordVisibility() {
    showPassword = !showPassword;
  }
</script>

<div class="login-page">
  <div class="login-container">
    <div class="login-header">
      <h1>Welcome Back</h1>
      <p>Please sign in to continue</p>
    </div>
    
    {#if error}
      <div class="error-alert" role="alert">
        <svg xmlns="http://www.w3.org/2000/svg" class="error-icon" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
        </svg>
        {error}
      </div>
    {/if}
    
    <form on:submit|preventDefault={handleSubmit} class="login-form">
      <div class="form-group">
        <label for="username">Username</label>
        <input 
          type="text" 
          id="username" 
          bind:value={username}
          placeholder="Enter your username"
          required
          class="form-input"
        />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <div class="password-input-container">
          {#if showPassword}
            <input 
              type="text"
              id="password" 
              bind:value={password}
              placeholder="Enter your password"
              required
              class="form-input"
            />
          {:else}
            <input 
              type="password"
              id="password" 
              bind:value={password}
              placeholder="Enter your password"
              required
              class="form-input"
            />
          {/if}
          <button 
            type="button" 
            class="password-toggle" 
            on:click={togglePasswordVisibility}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {#if showPassword}
              <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd" />
                <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
              </svg>
            {:else}
              <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
              </svg>
            {/if}
          </button>
        </div>
      </div>

      <button 
        type="submit" 
        class="login-button" 
        disabled={isLoading}
      >
        {#if isLoading}
          <span class="loading-spinner"></span>
          Signing in...
        {:else}
          Sign In
        {/if}
      </button>
    </form>
  </div>
</div>

<style>
  .login-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5f5f5;
    padding: 1rem;
  }

  .login-container {
    background: white;
    padding: 2.5rem;
    border-radius: 1rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    width: 100%;
    max-width: 400px;
  }

  .login-header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .login-header h1 {
    font-size: 1.875rem;
    font-weight: 700;
    color: #1a1a1a;
    margin: 0;
  }

  .login-header p {
    color: #666;
    margin-top: 0.5rem;
  }

  .login-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .form-group label {
    font-size: 0.875rem;
    font-weight: 500;
    color: #4a5568;
  }

  .form-input {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    font-size: 1rem;
    transition: border-color 0.2s;
  }

  .form-input:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }

  .password-input-container {
    position: relative;
  }

  .password-toggle {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    color: #6b7280;
  }

  .icon {
    width: 1.25rem;
    height: 1.25rem;
  }

  .login-button {
    width: 100%;
    padding: 0.875rem;
    background-color: #4f46e5;
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .login-button:hover {
    background-color: #4338ca;
  }

  .login-button:disabled {
    background-color: #6b7280;
    cursor: not-allowed;
  }

  .loading-spinner {
    width: 1.25rem;
    height: 1.25rem;
    border: 2px solid #ffffff;
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .error-alert {
    background-color: #fee2e2;
    border-radius: 0.5rem;
    padding: 1rem;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: #dc2626;
    font-size: 0.875rem;
  }

  .error-icon {
    width: 1.25rem;
    height: 1.25rem;
    flex-shrink: 0;
  }
</style>