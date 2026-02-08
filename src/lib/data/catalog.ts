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

export type Card = {
	id: string;
	title: string;
	category: 'Marketing' | 'Design' | 'Development' | 'Analytics';
	status: 'Active' | 'Paused';
	description: string;
	photo: string;
	companyId: string;
	reviews: Review[];
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

export const cards: Card[] = [
	{
		id: 'growth-accelerator',
		title: 'Growth Accelerator',
		category: 'Marketing',
		status: 'Active',
		description: 'Комплексная рекламная кампания для роста заявок в B2B-сегменте.',
		photo: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
		companyId: 'nova-digital',
		reviews: [
			{ id: 'r1', author: 'Анна', rating: 5, comment: 'CTR вырос на 38% за 2 месяца.' },
			{ id: 'r2', author: 'Павел', rating: 4, comment: 'Хорошо оптимизировали стоимость лида.' }
		]
	},
	{
		id: 'brand-refresh',
		title: 'Brand Refresh',
		category: 'Design',
		status: 'Active',
		description: 'Редизайн карточек продукта, иконок и визуальной системы бренда.',
		photo: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1200&q=80',
		companyId: 'pixel-forge',
		reviews: [
			{ id: 'r3', author: 'Мария', rating: 5, comment: 'Новый дизайн повысил конверсию страницы.' }
		]
	},
	{
		id: 'admin-suite',
		title: 'Admin Suite',
		category: 'Development',
		status: 'Paused',
		description: 'Новый модуль управления пользователями и ролями в админ-панели.',
		photo: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80',
		companyId: 'codebridge',
		reviews: [
			{ id: 'r4', author: 'Дмитрий', rating: 4, comment: 'Функционально, но хочется больше шаблонов отчётов.' }
		]
	},
	{
		id: 'funnel-audit',
		title: 'Funnel Audit',
		category: 'Analytics',
		status: 'Active',
		description: 'Анализ воронки продаж с рекомендациями по оптимизации каждого этапа.',
		photo: 'https://images.unsplash.com/photo-1551281044-8b9a4b1f6a2f?auto=format&fit=crop&w=1200&q=80',
		companyId: 'nova-digital',
		reviews: [
			{ id: 'r5', author: 'Елена', rating: 5, comment: 'Полезные инсайты и очень структурированный отчёт.' }
		]
	},
	{
		id: 'mobile-ui-kit',
		title: 'Mobile UI Kit',
		category: 'Design',
		status: 'Paused',
		description: 'Библиотека компонентов для мобильного приложения и дизайн-гайд.',
		photo: 'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=1200&q=80',
		companyId: 'pixel-forge',
		reviews: [
			{ id: 'r6', author: 'Наталья', rating: 4, comment: 'Быстро стартовали дизайн системы.' }
		]
	},
	{
		id: 'api-modernization',
		title: 'API Modernization',
		category: 'Development',
		status: 'Active',
		description: 'Рефакторинг API и внедрение мониторинга производительности.',
		photo: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
		companyId: 'codebridge',
		reviews: [
			{ id: 'r7', author: 'Игорь', rating: 5, comment: 'Стабильность сервиса заметно выросла.' }
		]
	}
];

export const getCompanyById = (id: string) => companies.find((company) => company.id === id);

export const getCardById = (id: string) => cards.find((card) => card.id === id);
