<script>
  import { Link } from 'svelte-navigator';
</script>

<h2>Admin Dashboard</h2>

<nav>
  <ul>
    <li><Link to="/admin/units">Unit Management</Link></li>
    <li><Link to="/admin/tenants">Tenant Management</Link></li>
    <li><Link to="/admin/payment">Payment Tracking</Link></li>
    <li><Link to="/admin/announcements">Bulletin Board</Link></li>
    <li><Link to="/admin/maintenance">Maintenance Requests</Link></li>
  </ul>
</nav>

<p>Welcome to the Admin Dashboard!</p>