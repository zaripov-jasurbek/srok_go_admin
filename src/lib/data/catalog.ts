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
		photo: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
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
		photo: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1200&q=80',
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
		photo: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6f?auto=format&fit=crop&w=1200&q=80',
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
		photo: 'https://images.unsplash.com/photo-1551281044-8b9a4b1f6a2f?auto=format&fit=crop&w=1200&q=80',
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
		photo: 'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=1200&q=80',
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
		photo: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
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
