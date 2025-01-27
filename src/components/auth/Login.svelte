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
  <!-- Welcome Title -->
  <div class="welcome-title">
    Welcome Back to&nbsp;<span class="highlight-text">Dorm</span>Mate!
  </div>

  <!-- Content Wrapper -->
  <div class="content-wrapper">
    <div class="split-layout">
      <!-- Image Column -->
      <div class="image-column">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/d1775ef126994d8dacd24677856a6216/3e2d355a3d624a99bb7696893b5f2f356e55a4a01ce814c711eb9cdf2980a3a1?apiKey=d1775ef126994d8dacd24677856a6216&"
          class="login-image"
          alt="DormMate login illustration"
        />
      </div>

      <!-- Form Column -->
      <div class="form-column">
        <!-- Error Message -->
        {#if error}
        <p class="error">{error}</p>
        {/if}

        <!-- Login Form -->
        <form class="login-form" on:submit|preventDefault={handleSubmit}>
          <h1 class="form-title">Log in</h1>
          <label for="username" class="visually-hidden">Username, Email, or Phone number</label>
          <input
            type="text"
            id="username"
            class="input-field username-input"
            bind:value={username}
            placeholder="Username (Admin or Tenant)"
            required
          />
          <label for="password" class="visually-hidden">Password</label>
          <input
            type="password"
            id="password"
            class="input-field password-input"
            bind:value={password}
            placeholder="Password"
            required
          />
          <button type="submit" class="submit-button">Log in</button>
        </form>
      </div>
    </div>
  </div>
</div>

  
<style>
  .login-container {
    display: flex;
    max-width: 704px;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
    margin-top: 25px;
    
  }
  .welcome-title {
    flex: 1;
    display: flex;
    align-items: start;
    gap: 0px;
    color: #262730;
    font: 700 40px/1.2 Source Sans Pro, -apple-system, Roboto, Helvetica, sans-serif;
    margin-left: auto;
    margin-right: auto;

  }
  .highlight-text {
    color: rgba(32, 167, 181, 1);
  }
  .content-wrapper {
    margin-top: 55px;
    width: 100%;
  }
  .split-layout {
    gap: 20px;
    display: flex;
  }
  .image-column {
    display: flex;
    flex-direction: column;
    line-height: normal;
    width: 44%;
    margin-left: 0;
  }
  .login-image {
    aspect-ratio: 0.72;
    object-fit: contain;
    object-position: center;
    width: 100%;
    margin-top: 25px;
    flex-grow: 1;
  }
  .form-column {
    display: flex;
    flex-direction: column;
    line-height: normal;
    width: 56%;
    margin-left: 20px;
  }
  .login-form {
    border-radius: 20px;
    display: flex;
    width: 100%;
    flex-direction: column;
    overflow: hidden;
    color: rgba(38, 39, 48, 1);
    padding: 73px 65px;
    font: 600 12px Source Sans Pro, sans-serif;
    border: 1px solid rgba(192, 192, 192, 1);
  }
  .form-title {
    font-size: 20px;
    line-height: 38px;
    text-align: center;
    align-self: center;
  }
  .input-field {
    align-self: stretch;
    border-radius: 15px;
    min-height: 42px;
    gap: 10px;
    color: var(--minor-text, #888);
    font-weight: 400;
    padding: 14px 20px 14px 15px;
    border: 1px solid rgba(194, 194, 194, 1);
  }
  .username-input {
    margin-top: 16px;
  }
  .password-input {
    margin-top: 20px;
  }
  .forgot-password-link {
    font-weight: 300;
    line-height: 3;
    text-align: right;
    align-self: end;
    margin-top: 12px;
  }
  .submit-button {
    align-self: stretch;
    flex: 1;
    border-radius: 15px;
    background-color: rgba(0, 53, 117, 1);
    margin-top: 43px;
    min-height: 42px;
    gap: 10px;
    font-size: 14px;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    padding: 12px 20px;
    border: none;
    cursor: pointer;
  }
  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
  @media (max-width: 991px) {
    .welcome-title {
      max-width: 100%;
    }
    .content-wrapper {
      max-width: 100%;
      margin-top: 40px;
    }
    .split-layout {
      flex-direction: column;
      align-items: stretch;
      gap: 0;
    }
    .image-column {
      width: 100%;
    }
    .login-image {
      margin-top: 40px;
    }
    .form-column {
      width: 100%;
    }
    .login-form {
      margin-top: 30px;
      padding: 0 20px;
    }
    .password-input {
      white-space: initial;
    }
    .forgot-password-link {
      margin-right: 9px;
    }
    .submit-button {
      margin-top: 40px;
    }
  }
</style>


  