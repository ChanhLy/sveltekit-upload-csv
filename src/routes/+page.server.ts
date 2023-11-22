import { fail } from '@sveltejs/kit';
import { writeFileSync } from 'fs';

export const actions = {
	default: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());
		const file = formData.fileToUpload as File;
		if (!file?.name || file.name === 'undefined') {
			return fail(400, {
				error: true,
				message: 'You must provide a file to upload'
			});
		}

		const fileBuffer = Buffer.from(await file.arrayBuffer());

		writeFileSync(`static/${file.name}`, fileBuffer);

		return {
			success: true
		};
	}
};
