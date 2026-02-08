import { currentUser, getCommentsByProfile, getCommentsByUserName } from '$lib/data/catalog';

export const load = () => {
	const authoredComments = getCommentsByUserName(currentUser.name);
	const profileComments = getCommentsByProfile(currentUser._id);

	return {
		user: currentUser,
		authoredComments,
		profileComments
	};
};
