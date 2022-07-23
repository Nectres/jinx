<script lang="ts">
	import { supabase } from '$lib/supabase';
	import { nanoid } from 'nanoid';

	let url: string;
	let link: string;
	let error: string | undefined;
	let showCopied = false;
	let generateLink = false;
	$: isValidUrl = isValidHttpUrl(url);

	function isValidHttpUrl(link: string) {
		let url;
		try {
			url = new URL(link);
		} catch (_) {
			return false;
		}
		console.log(url);
		return url.protocol === 'http:' || url.protocol === 'https:';
	}

	async function createLink() {
		const shortUrl = nanoid(6);
		let result = await supabase.from('links').insert({ url, link: shortUrl });
		if (result.error) {
			error = result.error.message;
			return;
		}
		if (!result.body) return (error = "Couldn't create link");
		link = `${location.origin}/${shortUrl}`;
		url = '';
		error = undefined;
		return link;
	}

	function copyToClipboard() {
		navigator.clipboard.writeText(link);
		console.log('Copied');
		showCopied = true;
		setTimeout(() => {
			showCopied = false;
		}, 1500);
	}
</script>

<form action="" on:submit|preventDefault>
	<img src="/logo_white.png" alt="Logo" width="150px">
	<span>Simple URL Shortener</span>
	<input
		type="text"
		class:incorrect-url={!isValidUrl}
		required
		bind:value={url}
		placeholder="https://google.com"
	/>
	<button type="submit" on:click={(_) => (generateLink = true)} disabled={!isValidUrl}
		>Generate</button
	>
	{#if error}
		<span class="error">{error}</span>
	{/if}
	{#if link}
		<div class="flex link-wrapper" />
	{/if}
	{#if generateLink}
		{#await createLink()}
			<button type="button" class="green-highlight">Generating link</button>
		{:then link}
			<button type="button" class="link green-highlight" target="_blank" on:click={copyToClipboard}
				>{link}</button
			>
		{/await}
	{/if}
	{#if showCopied}
		<div class="notif green-highlight">Copied</div>
	{/if}
</form>

<style>
	.notif {
		position: absolute;
		z-index: 99;
		padding: 8px 12px;
		bottom: 5em;
		width: 10em;
		text-align: center;
	}
	.link-wrapper {
		display: flex;
		gap: 0.5em;
	}

	.error {
		background-color: darkred;
		color: white;
		padding: 8px 12px;
		border-radius: 1.5em;
		min-width: 5vw;
		text-align: center;
		font-weight: 800;
	}

	.green-highlight {
		color: greenyellow;
		background-color: darkgreen;
		padding: 8px 15px;
		text-decoration: none;
	}

	form {
		background-color: rgb(22, 22, 22);
		width: 100vw;
		height: 100vh;
		display: flex;
		gap: 2em;
		flex-flow: column;
		color: white;
		justify-content: center;
		align-items: center;
		margin: 0;
	}

	input:focus {
		border: 2.5px solid rgb(156, 252, 112);
	}

	.incorrect-url:focus {
		border: 2.5px solid rgb(255, 163, 163);
	}

	button {
		background-color: rgba(8, 121, 4, 0.927);
		color: white;
		border: none;
		border-radius: 5px;
		padding: 10px;
		font-weight: 200;
		font-size: 1.2em;
		cursor: pointer;
	}

	button:disabled {
		cursor: not-allowed;
	}

	input {
		border: 2.5px solid white;
		border-radius: 5px;
		padding: 10px;
		font-size: 1.2em;
		width: 85vw;
		max-width: 400px;
		outline: none;
	}
</style>
