import { error } from '@sveltejs/kit';
import { getCardById, getCompanyById } from '$lib/data/catalog';

export const load = ({ params }) => {
	const card = getCardById(params.id);

	if (!card) {
		throw error(404, 'Card not found');
	}

	const company = getCompanyById(card.companyId);

	if (!company) {
		throw error(404, 'Company not found');
	}

	return { card, company };
};
