<script context="module" lang="ts">
	import { supabase } from '$lib/supabase';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ params }) => {
		const link = params['link'];
		let data = await supabase.from('links').select('url').eq('link', link);
		if (data.error || !data.body || data.body.length < 1) return { props: { url: '/' } };
		return {
			props: {
				url: data.body[0].url
			}
		};
	};
</script>

<script lang="ts">
	export let url: string;
</script>

<svelte:head>
	<meta http-equiv="refresh" content="0; url={url}" />
</svelte:head>
