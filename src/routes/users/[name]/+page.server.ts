import { readdirSync, existsSync } from 'fs';
import { fail } from '@sveltejs/kit';
import { writeFileSync, mkdirSync } from 'fs';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, depends }) {
	const username = params.name;

	if (!existsSync(`static/${username}`)) {
		mkdirSync(`static/${username}`, { recursive: true });
	}
	const files = readdirSync(`static/${username}`).map((file) => file);

	depends('files');

	return { content: { files, username } };
}

export const actions = {
	default: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());
		const file = formData.file as File;

		const username = formData.username as string;

		if (!file?.name || file.name === 'undefined') {
			return fail(400, {
				error: true,
				message: 'You must provide a file to upload'
			});
		}

		const fileBuffer = Buffer.from(await file.arrayBuffer());

		mkdirSync(`static/${username}`, { recursive: true });
		writeFileSync(`static/${username}/${file.name}`, fileBuffer);

		return {
			success: true
		};
	}
};
