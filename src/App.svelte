<script>
    import { Router, Route } from "svelte-navigator";
    import { onMount } from 'svelte';
    
    // Import the landing page 
    import LandingPage from './routes/index.svelte';
    import AdminLayout from "./layout/AdminLayout.svelte";
    import TenantLayout from "./layout/TenantLayout.svelte";

    // Import all of the admin pages 
    import AdminDashboard from './components/admin/Dashboard.svelte';
    import AnnouncementsAdmin from './components/admin/Announcements.svelte';
    import MaintenanceRequest from './components/admin/MaintenanceRequests.svelte';
    import Payment from './components/admin/PaymentTracking.svelte';
    import Units from './components/admin/Units.svelte';
    import Tenants from './components/admin/Tenants.svelte';

    // Import all of the tenant pages 
    import TenantDashboard from './components/tenant/Dashboard.svelte';
    import AnnouncementsTenant from './components/tenant/Announcements.svelte';
    import MaintenanceDisplay from './components/tenant/Maintenance.svelte';
    import SubmitPayment from './components/tenant/Payment.svelte';
    import Information from './components/tenant/Information.svelte';

    import Login from './components/auth/Login.svelte';

    let userRole;
    
    onMount(() => {
        userRole = localStorage.getItem('role');
    });
</script>

<Router>
    <!-- Public Routes -->
    <Route path="/" component={LandingPage} />
    <Route path="login" component={Login} />

    <!-- Admin Routes -->
    <Route path="admin/*">
        <AdminLayout>
            <Route path="/" component={AdminDashboard} />
            <Route path="units" component={Units} />
            <Route path="announcements" component={AnnouncementsAdmin} />
            <Route path="maintenance" component={MaintenanceRequest} />
            <Route path="payment" component={Payment} />
            <Route path="tenants" component={Tenants} />
        </AdminLayout>
    </Route>

    <!-- Tenant Routes -->
    <Route path="tenant/*">
        <TenantLayout>
            <Route path="/" component={TenantDashboard} />
            <Route path="announcements" component={AnnouncementsTenant} />
            <Route path="maintenance" component={MaintenanceDisplay} />
            <Route path="payment" component={SubmitPayment} />
            <Route path="information" component={Information} />
        </TenantLayout>
    </Route>
</Router>