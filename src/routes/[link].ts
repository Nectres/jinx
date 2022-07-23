import { supabase } from '$lib/supabase';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params }) => {
	const link = params['link'];
	let data = await supabase.from('links').select('url').eq('link', link);
	if (data.error || !data.body || data.body.length < 1)
		return { headers: { location: '/' }, status: 302 };
	return {
		headers: {
			location: data.body[0].url, 
			'Cache-control':'public, max-age=5184000, immutable, stale-while-revalidate=8640000',
		},
		status: 302,
		body: 'Redirecting...'
	};
};
