<script lang="ts">
	import { goto } from '$app/navigation';

	function handleLogin(e) {
		const username = e.target.username.value;
		goto('/users/' + username);
	}
</script>

<form on:submit|preventDefault={handleLogin}>
	Username: <input type="text" name="username" />
	<button type="submit">Submit</button>
</form>
