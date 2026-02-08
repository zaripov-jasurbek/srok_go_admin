export type Review = {
	id: string;
	author: string;
	rating: number;
	comment: string;
};

export type Company = {
	id: string;
	name: string;
	industry: string;
	description: string;
	logo: string;
	photo: string;
	reviews: Review[];
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

export const companies: Company[] = [
	{
		id: 'nova-digital',
		name: 'Nova Digital',
		industry: 'Digital Marketing',
		description:
			'Агентство полного цикла: performance-маркетинг, контент-стратегия и поддержка брендов в социальных сетях.',
		logo: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=120&q=80',
		photo: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80',
		reviews: [
			{ id: 'c1r1', author: 'Ирина', rating: 5, comment: 'Надёжный партнёр, всегда в срок.' },
			{ id: 'c1r2', author: 'Максим', rating: 4, comment: 'Сильная аналитика и понятные отчёты.' }
		]
	},
	{
		id: 'pixel-forge',
		name: 'Pixel Forge',
		industry: 'UI/UX Design',
		description:
			'Команда дизайнеров, которая проектирует интерфейсы и брендовые решения для веб и мобильных продуктов.',
		logo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=120&q=80',
		photo: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
		reviews: [
			{ id: 'c2r1', author: 'Леонид', rating: 5, comment: 'Очень аккуратные и современные макеты.' },
			{ id: 'c2r2', author: 'Жанна', rating: 5, comment: 'Отличная коммуникация на всех этапах.' }
		]
	},
	{
		id: 'codebridge',
		name: 'CodeBridge',
		industry: 'Software Development',
		description:
			'Разработка SaaS-платформ, интеграций и внутренних админ-панелей с фокусом на масштабируемость.',
		logo: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=120&q=80',
		photo: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
		reviews: [
			{ id: 'c3r1', author: 'Сергей', rating: 5, comment: 'Качественный код и прозрачный процесс.' },
			{ id: 'c3r2', author: 'Ольга', rating: 4, comment: 'Быстро подключились и закрыли задачи.' }
		]
	}
];

export const cards: Package[] = [
	{
		_id: 'pkg-growth-accelerator',
		name: 'Growth Accelerator',
		category: 'Marketing',
		active: true,
		description: 'Комплексная рекламная кампания для роста заявок в B2B-сегменте.',
		photo: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
		company: 'nova-digital',
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
		photo: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1200&q=80',
		company: 'pixel-forge',
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
		photo: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6f?auto=format&fit=crop&w=1200&q=80',
		company: 'codebridge',
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
		photo: 'https://images.unsplash.com/photo-1551281044-8b9a4b1f6a2f?auto=format&fit=crop&w=1200&q=80',
		company: 'nova-digital',
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
		photo: 'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=1200&q=80',
		company: 'pixel-forge',
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
		photo: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
		company: 'codebridge',
		count: 10,
		price: 1900,
		getTime: 35,
		closeTime: 95,
		rating: 5,
		createdAt: '2025-01-27T07:55:00.000Z',
		updatedAt: '2025-02-14T08:00:00.000Z'
	}
];

export const getCompanyById = (id: string) => companies.find((company) => company.id === id);

export const getCardById = (id: string) => cards.find((card) => card._id === id);
