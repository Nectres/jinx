import { supabase } from '$lib/supabase';
import type { RequestHandler } from '@sveltejs/kit';
import md5 from 'crypto-js/md5';

export const GET: RequestHandler = async ({ params }) => {
	let { token } = params;
	const hash = md5(token).toString();
	let data = await supabase.from('analytics').select('*').eq('token', hash);

	if (!data.body) return {};

	if (data.body.length < 1) console.error('Not a valid token');

	return {
		body: data.body[0]
	};
};
