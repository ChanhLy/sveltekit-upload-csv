<script>
	import axios from 'axios';
	/** @type {import('./$types').PageData} */
	export let data;
	const username = data.content?.username;
	const files = data.content?.files;
	let loading = false;
	let progress = 0;
	function handleUpload(e) {
		const file = e.target.file.files[0];
		const formData = new FormData();
		formData.append('username', username);
		formData.append('file', file);
		loading = true;
		axios
			.post('', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				},
				onUploadProgress: (progressEvent) => {
					if (!progressEvent.total) {
						return;
					}
					progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
				}
			})
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.error(err);
			})
			.finally(() => {
				loading = false;
			});
	}
</script>

<h1>Hello {data.content?.username}</h1>
<form method="post" enctype="multipart/form-data" on:submit={handleUpload}>
	<div class="group">
		<label for="file">Upload your file</label>
		<input type="file" id="file" name="fileToUpload" accept=".csv" required />
	</div>

	<button type="submit">Submit</button>

	{#if loading && progress}
		<p>Loading...</p>
		<p>Progress: {progress}%</p>
	{/if}

	<ul>
		{#each files || [] as file}
			<li><a href={`${username}/${file}?page=1`}>{file}</a></li>
		{/each}
	</ul>
</form>

<button><a href="/">Go back</a></button>
