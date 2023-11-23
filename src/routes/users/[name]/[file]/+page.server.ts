import { createReadStream, existsSync } from 'fs';
import * as csv from 'fast-csv';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, url }) {
	const username = params.name;
	const filename = params.file;

	// 1 page is 20 rows
	const page = Number(url.searchParams.get('page')) || 1;
	const search = url.searchParams.get('search') || '';
	if (isNaN(page)) {
		return { status: 400 };
	}

	const start = (page - 1) * 20;
	const end = start + 20;

	if (!existsSync(`static/${username}/${filename}`)) {
		return { status: 404 };
	}

	const readCsvPromise = new Promise<any[]>((resolve, reject) => {
		const rows: any[] = [];
		createReadStream(`static/${username}/${filename}`).pipe(
			csv
				.parse({ headers: true, delimiter: ',' })
				.on('error', (error) => reject(error))
				.on('data', (row, index) => {
					if (!search || Object.values(row).find((value: string) => value.includes(search))) {
						rows.push(row);
					}
				})
				.on('end', () => resolve(rows))
		);
	});

	const rows = await readCsvPromise;

	return { content: { streamed: rows.slice(start, end), username, params, page, search } };
}
