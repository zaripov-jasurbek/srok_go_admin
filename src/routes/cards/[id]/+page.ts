import { error } from '@sveltejs/kit';
import { getCardById, getCompanyById } from '$lib/data/catalog';

export const load = ({ params }) => {
	const card = getCardById(params.id);

	if (!card) {
		throw error(404, 'Package not found');
	}

	const company = getCompanyById(card.company);

	if (!company) {
		throw error(404, 'Company not found');
	}

	return { card, company };
};
