export type Company = {
	_id: string;
	name: string;
	description: string;
	photo: string;
	OpenTime: number;
	CloseTime: number;
	category: string;
	rating: number;
	coordination: [number, number];
	region: string;
	createdAt: string;
	updatedAt: string;
};

export type PackageCategory = 'Marketing' | 'Design' | 'Development' | 'Analytics';

export type Package = {
	_id: string;
	name: string;
	photo: string | null;
	description: string | null;
	category: PackageCategory;
	count: number;
	price: number;
	getTime: number;
	closeTime: number;
	active: boolean;
	rating: number;
	company: string;
	createdAt: string;
	updatedAt: string;
};

export type User = {
	_id: string;
	createdAt: string;
	updatedAt: string;
	name: string;
	about?: string;
	avatar?: string;
	email?: string;
	phone?: string;
	rating: number;
};

export const currentUser: User = {
	_id: 'usr-admin-001',
	createdAt: '2024-11-02T09:30:00.000Z',
	updatedAt: '2025-02-14T14:00:00.000Z',
	name: 'Aruzhan N.',
	about:
		'Веду операционную часть в Srok: проверяю карточки, отвечаю на отзывы и координирую работу с компаниями.',
	avatar:
		'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
	email: 'aruzhan@srok.io',
	phone: '+7 700 123 45 67',
	rating: 4.9
};

export const companies: Company[] = [
	{
		_id: '67ca1dfe12d3b9ea8f5a1001',
		name: 'Nova Digital',
		description:
			'Агентство полного цикла: performance-маркетинг, контент-стратегия и поддержка брендов в социальных сетях.',
		photo:
			'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80',
		OpenTime: 9,
		CloseTime: 19,
		category: 'Marketing',
		rating: 4.8,
		coordination: [55.7558, 37.6173],
		region: 'Moscow',
		createdAt: '2025-01-10T09:00:00.000Z',
		updatedAt: '2025-02-12T12:00:00.000Z'
	},
	{
		_id: '67ca1dfe12d3b9ea8f5a1002',
		name: 'Pixel Forge',
		description:
			'Команда дизайнеров, которая проектирует интерфейсы и брендовые решения для веб и мобильных продуктов.',
		photo:
			'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
		OpenTime: 10,
		CloseTime: 20,
		category: 'Design',
		rating: 4.9,
		coordination: [59.9343, 30.3351],
		region: 'Saint Petersburg',
		createdAt: '2025-01-12T08:30:00.000Z',
		updatedAt: '2025-02-11T14:30:00.000Z'
	},
	{
		_id: '67ca1dfe12d3b9ea8f5a1003',
		name: 'CodeBridge',
		description:
			'Разработка SaaS-платформ, интеграций и внутренних админ-панелей с фокусом на масштабируемость.',
		photo:
			'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
		OpenTime: 8,
		CloseTime: 18,
		category: 'Development',
		rating: 4.6,
		coordination: [56.8389, 60.6057],
		region: 'Yekaterinburg',
		createdAt: '2025-01-15T10:00:00.000Z',
		updatedAt: '2025-02-10T16:10:00.000Z'
	}
];

export const cards: Package[] = [
	{
		_id: 'pkg-growth-accelerator',
		name: 'Growth Accelerator',
		category: 'Marketing',
		active: true,
		description: 'Комплексная рекламная кампания для роста заявок в B2B-сегменте.',
		photo:
			'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
		company: '67ca1dfe12d3b9ea8f5a1001',
		count: 12,
		price: 1200,
		getTime: 30,
		closeTime: 90,
		rating: 4.8,
		createdAt: '2025-01-10T09:00:00.000Z',
		updatedAt: '2025-02-12T12:00:00.000Z'
	},
	{
		_id: 'pkg-brand-refresh',
		name: 'Brand Refresh',
		category: 'Design',
		active: true,
		description: 'Редизайн карточек продукта, иконок и визуальной системы бренда.',
		photo:
			'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1200&q=80',
		company: '67ca1dfe12d3b9ea8f5a1002',
		count: 8,
		price: 980,
		getTime: 20,
		closeTime: 60,
		rating: 4.9,
		createdAt: '2025-01-12T08:30:00.000Z',
		updatedAt: '2025-02-11T14:30:00.000Z'
	},
	{
		_id: 'pkg-admin-suite',
		name: 'Admin Suite',
		category: 'Development',
		active: false,
		description: 'Новый модуль управления пользователями и ролями в админ-панели.',
		photo:
			'https://images.unsplash.com/photo-1461749280684-dccba630e2f6f?auto=format&fit=crop&w=1200&q=80',
		company: '67ca1dfe12d3b9ea8f5a1003',
		count: 4,
		price: 2400,
		getTime: 45,
		closeTime: 120,
		rating: 4.2,
		createdAt: '2025-01-15T10:00:00.000Z',
		updatedAt: '2025-02-10T16:10:00.000Z'
	},
	{
		_id: 'pkg-funnel-audit',
		name: 'Funnel Audit',
		category: 'Analytics',
		active: true,
		description: 'Анализ воронки продаж с рекомендациями по оптимизации каждого этапа.',
		photo:
			'https://images.unsplash.com/photo-1551281044-8b9a4b1f6a2f?auto=format&fit=crop&w=1200&q=80',
		company: '67ca1dfe12d3b9ea8f5a1001',
		count: 20,
		price: 650,
		getTime: 15,
		closeTime: 40,
		rating: 4.7,
		createdAt: '2025-01-18T11:15:00.000Z',
		updatedAt: '2025-02-13T09:25:00.000Z'
	},
	{
		_id: 'pkg-mobile-ui-kit',
		name: 'Mobile UI Kit',
		category: 'Design',
		active: false,
		description: 'Библиотека компонентов для мобильного приложения и дизайн-гайд.',
		photo:
			'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=1200&q=80',
		company: '67ca1dfe12d3b9ea8f5a1002',
		count: 6,
		price: 740,
		getTime: 25,
		closeTime: 70,
		rating: 4.4,
		createdAt: '2025-01-22T13:20:00.000Z',
		updatedAt: '2025-02-09T10:45:00.000Z'
	},
	{
		_id: 'pkg-api-modernization',
		name: 'API Modernization',
		category: 'Development',
		active: true,
		description: 'Рефакторинг API и внедрение мониторинга производительности.',
		photo:
			'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
		company: '67ca1dfe12d3b9ea8f5a1003',
		count: 10,
		price: 1900,
		getTime: 35,
		closeTime: 95,
		rating: 5,
		createdAt: '2025-01-27T07:55:00.000Z',
		updatedAt: '2025-02-14T08:00:00.000Z'
	}
];

export const getCompanyById = (id: string) => companies.find((company) => company._id === id);

export const getCardById = (id: string) => cards.find((card) => card._id === id);

export type ReactionType = 'like' | 'dislike';

export type ReactionHistoryEntry = {
	userName: string;
	reaction: ReactionType;
	at: string;
};

export type Comment = {
	_id: string;
	userName: string;
	package: string | null;
	company: string | null;
	profile?: string | null;
	parentId: string | null;
	text: string;
	likesCount: number;
	dislikesCount: number;
	rating: number | null;
	createdAt: string;
	reactionHistory: ReactionHistoryEntry[];
};

export const comments: Comment[] = [
	{
		_id: 'cmt-008',
		userName: 'Samat B.',
		package: null,
		company: null,
		profile: 'usr-admin-001',
		parentId: null,
		text: 'Очень оперативно отвечает в чате и всегда подробно объясняет, что исправить в карточке.',
		likesCount: 7,
		dislikesCount: 0,
		rating: 5,
		createdAt: '2025-02-05T08:10:00.000Z',
		reactionHistory: [
			{ userName: 'Ainur', reaction: 'like', at: '2025-02-05T08:40:00.000Z' },
			{ userName: 'Bekzod', reaction: 'like', at: '2025-02-05T09:05:00.000Z' }
		]
	},
	{
		_id: 'cmt-009',
		userName: 'Aruzhan N.',
		package: null,
		company: null,
		profile: 'usr-admin-001',
		parentId: 'cmt-008',
		text: 'Спасибо большое! Рада, что обратная связь полезна 🙌',
		likesCount: 3,
		dislikesCount: 0,
		rating: null,
		createdAt: '2025-02-05T09:20:00.000Z',
		reactionHistory: [{ userName: 'Samat B.', reaction: 'like', at: '2025-02-05T09:30:00.000Z' }]
	},
	{
		_id: 'cmt-010',
		userName: 'Nova Digital',
		package: null,
		company: null,
		profile: 'usr-admin-001',
		parentId: null,
		text: 'От лица компании спасибо за системность: все ревью понятные и по делу.',
		likesCount: 4,
		dislikesCount: 0,
		rating: 5,
		createdAt: '2025-02-06T11:00:00.000Z',
		reactionHistory: [{ userName: 'Aruzhan N.', reaction: 'like', at: '2025-02-06T11:16:00.000Z' }]
	},
	{
		_id: 'cmt-006',
		userName: 'Aruzhan N.',
		package: 'pkg-funnel-audit',
		company: null,
		parentId: null,
		text: 'Сделали аудит воронки за 2 дня, отчёт понятный. В следующей версии хотелось бы больше примеров по retention.',
		likesCount: 6,
		dislikesCount: 0,
		rating: 5,
		createdAt: '2025-02-04T10:12:00.000Z',
		reactionHistory: [
			{ userName: 'Nursultan', reaction: 'like', at: '2025-02-04T11:00:00.000Z' },
			{ userName: 'Dina', reaction: 'like', at: '2025-02-04T11:42:00.000Z' }
		]
	},
	{
		_id: 'cmt-007',
		userName: 'CodeBridge PM',
		package: 'pkg-funnel-audit',
		company: null,
		parentId: 'cmt-006',
		text: 'Спасибо! Добавим блок с retention-кейсами в ближайшем обновлении методологии.',
		likesCount: 2,
		dislikesCount: 0,
		rating: null,
		createdAt: '2025-02-04T12:05:00.000Z',
		reactionHistory: [{ userName: 'Aruzhan N.', reaction: 'like', at: '2025-02-04T12:30:00.000Z' }]
	},
	{
		_id: 'cmt-001',
		userName: 'Aida K.',
		package: 'pkg-growth-accelerator',
		company: null,
		parentId: null,
		text: 'Пакет помог увеличить лиды за первый месяц. Удобный отчёт и понятные рекомендации.',
		likesCount: 5,
		dislikesCount: 1,
		rating: 5,
		createdAt: '2025-02-01T09:40:00.000Z',
		reactionHistory: [
			{ userName: 'Timur', reaction: 'like', at: '2025-02-01T10:15:00.000Z' },
			{ userName: 'Svetlana', reaction: 'like', at: '2025-02-01T11:00:00.000Z' },
			{ userName: 'Arman', reaction: 'dislike', at: '2025-02-01T13:22:00.000Z' }
		]
	},
	{
		_id: 'cmt-002',
		userName: 'Manager Nova',
		package: 'pkg-growth-accelerator',
		company: null,
		parentId: 'cmt-001',
		text: 'Спасибо за отзыв! Уже готовим обновление с новыми шаблонами отчётов.',
		likesCount: 2,
		dislikesCount: 0,
		rating: null,
		createdAt: '2025-02-01T12:30:00.000Z',
		reactionHistory: [{ userName: 'Aida K.', reaction: 'like', at: '2025-02-01T12:50:00.000Z' }]
	},
	{
		_id: 'cmt-003',
		userName: 'Rustam T.',
		package: null,
		company: '67ca1dfe12d3b9ea8f5a1002',
		parentId: null,
		text: 'Команда быстро отвечает, дизайн-решения качественные, но дедлайн один раз сдвигали.',
		likesCount: 4,
		dislikesCount: 1,
		rating: 4,
		createdAt: '2025-02-03T08:20:00.000Z',
		reactionHistory: [
			{ userName: 'Nina', reaction: 'like', at: '2025-02-03T09:02:00.000Z' },
			{ userName: 'Bek', reaction: 'like', at: '2025-02-03T10:18:00.000Z' },
			{ userName: 'Aliya', reaction: 'dislike', at: '2025-02-03T12:47:00.000Z' }
		]
	},
	{
		_id: 'cmt-004',
		userName: 'Pixel Forge PM',
		package: null,
		company: '67ca1dfe12d3b9ea8f5a1002',
		parentId: 'cmt-003',
		text: 'Да, тогда перенесли на 1 день из-за правок. Сейчас усилили контроль сроков 🙌',
		likesCount: 3,
		dislikesCount: 0,
		rating: null,
		createdAt: '2025-02-03T13:10:00.000Z',
		reactionHistory: [{ userName: 'Rustam T.', reaction: 'like', at: '2025-02-03T14:01:00.000Z' }]
	},
	{
		_id: 'cmt-005',
		userName: 'Rustam T.',
		package: null,
		company: '67ca1dfe12d3b9ea8f5a1002',
		parentId: 'cmt-004',
		text: 'Отлично, спасибо за прозрачность и обратную связь.',
		likesCount: 1,
		dislikesCount: 0,
		rating: null,
		createdAt: '2025-02-03T15:05:00.000Z',
		reactionHistory: [
			{ userName: 'Pixel Forge PM', reaction: 'like', at: '2025-02-03T15:20:00.000Z' }
		]
	}
];

export const getCommentsByPackage = (packageId: string) =>
	comments.filter((comment) => comment.package === packageId);

export const getCommentsByCompany = (companyId: string) =>
	comments.filter((comment) => comment.company === companyId);

export const getCommentsByUserName = (userName: string) =>
	comments.filter((comment) => comment.userName === userName);

export const getCommentsByProfile = (profileId: string) =>
	comments.filter((comment) => comment.profile === profileId);
