<script>
    import { onMount } from 'svelte';
    import { navigate } from 'svelte-navigator';

    let userRole;

    onMount(() => {
        userRole = localStorage.getItem('role');
        if (userRole !== 'admin') {
            navigate('/login'); // Redirect to login if not an admin
        }
    });

    // Logout function
    function handleLogout() {
        // Clear local storage
        localStorage.removeItem('role');
        localStorage.removeItem('unitId');
        localStorage.removeItem('userId'); // Remove any other stored data (e.g., token)

        // Redirect to the landing page
        navigate('/');
    }
</script>

<div class="layout-container">
    <aside class="sidebar">
        <div class="logo-container">
            <img src="/assets/dormmate-logo.png" alt="DormMate" class="logo" />
            <h1 class="brand">DormMate</h1>
            <p class="tagline">Manage your dorm with ease</p>
            <hr>
        </div>

        <nav class="nav-menu">

            <a href="/admin" class="nav-item">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                Dashboard
            </a>

            <a href="/admin/units" class="nav-item">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                Unit Management
            </a>

            <a href="/admin/tenants" class="nav-item">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                Tenant Management
            </a>

            <a href="/admin/payment" class="nav-item">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                </svg>
                Payment Tracking
            </a>

            <a href="/admin/announcements" class="nav-item">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                    <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                </svg>
                Bulletin Board
            </a>

            <a href="/admin/maintenance" class="nav-item">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                </svg>
                Maintenance Reports
            </a>
        </nav>

        <div class="footer-links">
            <button class="logout-button" on:click={handleLogout}>
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd" />
                </svg>
                Logout
            </button>
        </div>
    </aside>

    <main class="main-content">
        <slot />
    </main>
</div>

<style>
    .layout-container {
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
        font-style: bold;
        margin: 0;
        color: #00ffff;
    }

    .tagline {
        font-size: 0.875rem;
        color: #b3e0e0;
        margin: 0.5rem 0 0 0;
    }

    .nav-menu {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .nav-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem 1rem;
        color: white;
        text-decoration: none;
        border-radius: 0.5rem;
        transition: background-color 0.2s;
    }

    .nav-item:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }

    .nav-item.active {
        background-color: rgba(255, 255, 255, 0.2);
    }

    .icon {
        width: 1.25rem;
        height: 1.25rem;
    }

    .footer-links {
        margin-top: auto;
    }

    .logout-button {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 3rem;
        gap: 0.75rem;
        padding: 0.75rem;
        background-color: rgba(255, 255, 255, 0.1);
        color: white;
        border: none;
        border-radius: 0.5rem;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .logout-button:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }

    .main-content {
        flex: 1;
        padding: 2rem;
        background-color: #f5f5f5;
    }
</style>