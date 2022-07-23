import { supabase } from '$lib/supabase';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params }) => {
	const link = params['link'];
	let data = await supabase.from('links').select('url').eq('link', link);
	if (data.error || !data.body || data.body.length < 1)
		return { headers: { location: '/' }, status: 302 };

	supabase.rpc('increment', { id: data.body[0].id });

	return {
		headers: {
			location: data.body[0].url
		},
		status: 302,
		body: 'Redirecting...'
	};
};
