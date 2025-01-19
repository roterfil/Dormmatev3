<script>

    //import routing to navigate the pages
    import { Router, Route } from "svelte-navigator";

    //import the landing page 
    import Layout from "./routes/_layout.svelte";
    import LandingPage from './routes/index.svelte';

    //import all of the admins pages 

    import AdminDashboard from './components/admin/Dashboard.svelte';
    import AnnouncementsAdmin from './components/admin/Announcements.svelte';
    import MaintenanceRequest from './components/admin/MaintenanceRequests.svelte';
    import Payment from './components/admin/PaymentTracking.svelte';
    import Units from './components/admin/Units.svelte';

    //import all of the tenants pages 

    import TenantDashboard from './components/tenant/Dashboard.svelte';
    import AnnouncementsTenant from './components/tenant/Announcements.svelte';
    import MaintenanceDisplay from './components/tenant/Maintenance.svelte';
    import SubmitPayment from './components/tenant/Payment.svelte';

    import Login from './components/auth/Login.svelte';

</script>

<Router>
    <Layout>

        <!-- Route for landing page -->
        <Route path="/" component={LandingPage} />

        <!-- Route for the login pages -->
        <Route path="/login/admin" component={Login} role="admin" />
        <Route path="/login/tenant" component={Login} role="tenant" />

        <!-- Route for the admin pages -->
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/admin/units" component={Units}/>
		<Route path="/admin/announcements" component={AnnouncementsAdmin}/>
        <Route path="/admin/maintenance" component={MaintenanceRequest}/>
        <Route path="/admin/payment" component={Payment}/>

        <!-- Route for the tenant pages -->
        <Route path="/tenant" component={TenantDashboard} />
        <Route path="/tenant/announcements" component={AnnouncementsTenant}/>
        <Route path="/tenant/maintenance" component={MaintenanceDisplay}/>
        <Route path="/tenant/payment" component={SubmitPayment}/>

    </Layout>
</Router>