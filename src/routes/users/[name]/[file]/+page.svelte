<script lang="ts">
	import { goto } from '$app/navigation';
	export let data;
	$: content = data.content;

	$: search = content?.search || '';
	$: page = data.content?.page || 1;
	console.log(page);
	function handleSearch(e) {
		const value = e.target.search.value;

		goto(`?search=${value}&page=1`);
	}
</script>

<form on:submit|preventDefault={handleSearch}>
	<input type="text" name="search" />
	<button type="submit">Search</button>
</form>
<a href="?page={page - 1}&search={search}">Prev Page</a>
<a href="?page={page + 1}&search={search}">Next Page</a>

{#await data.content?.streamed}
	Loading...
{:then value}
	{#if value?.length === 0}
		<p>No results found</p>
	{/if}

	{#if value?.length}
		<table>
			<thead>
				<tr>
					{#each Object.keys(value?.[0]) as header}
						<th>{header}</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each value as row}
					<tr>
						{#each Object.keys(value?.[0]) as header}
							<td>{row[header]}</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}
{/await}
<button><a href="/">Go back</a></button>

<style>
	table,
	th,
	td {
		border: 1px solid black;
		border-collapse: collapse;
	}
</style>
