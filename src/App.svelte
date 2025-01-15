<script>
    import { Router, Route } from "svelte-navigator";
    import Login from './components/auth/Login.svelte';
    import Layout from "./routes/_layout.svelte";
    import LandingPage from './routes/index.svelte';
    import AdminDashboard from './components/admin/Dashboard.svelte';
    import TenantDashboard from './components/tenant/Dashboard.svelte';
	import Units from './components/admin/Units.svelte'
	import Announcements from './components/admin/Announcements.svelte'
</script>

<Router>
    <Layout>
        <Route path="/" component={LandingPage} />
        <Route path="/login/admin" component={Login} role="admin" />
        <Route path="/login/tenant" component={Login} role="tenant" />
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/tenant" component={TenantDashboard} />
		<Route path="/admin/units" component={Units}/>
		<Route path="/admin/announcements" component={Announcements}/>
    </Layout>
</Router>