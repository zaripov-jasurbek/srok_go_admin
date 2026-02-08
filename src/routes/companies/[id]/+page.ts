import { error } from '@sveltejs/kit';
import { cards, getCommentsByCompany, getCompanyById } from '$lib/data/catalog';

export const load = ({ params }) => {
	const company = getCompanyById(params.id);

	if (!company) {
		throw error(404, 'Company not found');
	}

	const companyCards = cards.filter((card) => card.company === company._id);

	const comments = getCommentsByCompany(company._id);

	return { company, companyCards, comments };
};
