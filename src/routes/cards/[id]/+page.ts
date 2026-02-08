import { error } from '@sveltejs/kit';
import { getCardById, getCommentsByPackage, getCompanyById } from '$lib/data/catalog';

export const load = ({ params }) => {
	const card = getCardById(params.id);

	if (!card) {
		throw error(404, 'Package not found');
	}

	const company = getCompanyById(card.company);

	if (!company) {
		throw error(404, 'Company not found');
	}

	const comments = getCommentsByPackage(card._id);

	return { card, company, comments };
};
