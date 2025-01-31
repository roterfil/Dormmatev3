<!-- RootLayout.svelte -->
<script>
    import { onMount } from 'svelte';
    import { navigate } from 'svelte-navigator';
    
    let userRole = '';
    
    onMount(() => {
      userRole = localStorage.getItem('role');
      if (!userRole) {
        navigate('/login');
      }
    });
  </script>
  
  {#if userRole === 'admin'}
    <AdminLayout>
      <slot />
    </AdminLayout>
  {:else if userRole === 'tenant'}
    <TenantLayout>
      <slot />
    </TenantLayout>
  {/if}
  