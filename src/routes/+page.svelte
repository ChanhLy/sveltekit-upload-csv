<script>
	import axios from 'axios';
	let loading = false;
	let progress = 0;
	function handleUpload(e) {
		e.preventDefault();
		if (!e?.target?.file?.files?.[0]) return;
		const file = e.target.file.files[0];
		const formData = new FormData();
		formData.append('file', file);
		loading = true;
		axios
			.post('/', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				},
				onUploadProgress: (progressEvent) => {
					progress = progressEvent.total
						? Math.round((progressEvent.loaded * 100) / progressEvent.total)
						: 0;
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

<form method="post" enctype="multipart/form-data" on:submit={handleUpload}>
	<div class="group">
		<label for="file">Upload your file</label>
		<input type="file" id="file" name="fileToUpload" accept=".csv" required />
	</div>

	<button type="submit">Submit</button>

	{#if loading}
		<p>Loading...</p>
	{/if}

	{#if progress}
		<p>Progress: {progress}%</p>
	{/if}
</form>
