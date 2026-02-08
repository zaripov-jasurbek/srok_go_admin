import { browser } from '$app/environment';
import { cards, type Package } from '$lib/data/catalog';
import { get, writable } from 'svelte/store';

export const orderStatuses = ['Pending', 'Registered', 'Cancelled'] as const;

export type OrderStatus = (typeof orderStatuses)[number];

export type Order = {
	_id: string;
	createdAt: string;
	updatedAt: string;
	package: string;
	company: string;
	user: string;
	description: string;
	count: number;
	coordination: [number, number];
	status: OrderStatus;
	price: number;
};

export type CreateOrderDto = Omit<Order, '_id' | 'createdAt' | 'updatedAt' | 'price' | 'status'>;
export type OrderFilter = Partial<Omit<Order, '_id' | 'createdAt' | 'updatedAt' | 'status'>> & {
	status?: OrderStatus;
};

const STORAGE_KEY = 'admin_panel_orders_v1';
const FALLBACK_USER_ID = 'demo-admin-user';

const uid = () =>
	typeof crypto !== 'undefined' && 'randomUUID' in crypto
		? crypto.randomUUID()
		: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

const readOrders = (): Order[] => {
	if (!browser) {
		return [];
	}

	const raw = localStorage.getItem(STORAGE_KEY);

	if (!raw) {
		return [];
	}

	try {
		const parsed = JSON.parse(raw) as Order[];
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
};

const orders = writable<Order[]>(readOrders());

if (browser) {
	orders.subscribe((value) => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
	});
}

const getPackageById = (id: string): Package | undefined => cards.find((item) => item._id === id);

const create = (body: CreateOrderDto): Order => {
	const packageItem = getPackageById(body.package);

	if (!packageItem) {
		throw new Error('Package not found');
	}

	const now = new Date().toISOString();
	const existing = get(orders).find(
		(order) =>
			order.status === 'Pending' &&
			order.package === body.package &&
			order.company === body.company &&
			order.user === body.user
	);

	if (existing) {
		let updated = existing;
		orders.update((items) =>
			items.map((order) => {
				if (order._id !== existing._id) {
					return order;
				}

				updated = {
					...order,
					count: order.count + body.count,
					updatedAt: now,
					price: (order.count + body.count) * packageItem.price
				};

				return updated;
			})
		);

		return updated;
	}

	const nextOrder: Order = {
		_id: uid(),
		createdAt: now,
		updatedAt: now,
		package: body.package,
		company: body.company,
		user: body.user,
		description: body.description,
		count: body.count,
		coordination: body.coordination,
		status: 'Pending',
		price: packageItem.price * body.count
	};

	orders.update((items) => [nextOrder, ...items]);
	return nextOrder;
};

const findOne = (id: string): Order | undefined => get(orders).find((order) => order._id === id);

const find = (params: OrderFilter = {}): Order[] =>
	get(orders).filter((order) =>
		Object.entries(params).every(([key, value]) => {
			if (value === undefined || value === null || value === '') {
				return true;
			}

			return order[key as keyof Order] === value;
		})
	);

const update = (
	id: string,
	updateOrderDto: Partial<Omit<Order, '_id' | 'createdAt'>>
): Order | undefined => {
	let updatedOrder: Order | undefined;
	const now = new Date().toISOString();

	orders.update((items) =>
		items.map((order) => {
			if (order._id !== id) {
				return order;
			}

			const packageItem = getPackageById(order.package);
			const nextCount = updateOrderDto.count ?? order.count;
			const nextPrice = packageItem ? packageItem.price * nextCount : order.price;
			updatedOrder = {
				...order,
				...updateOrderDto,
				price: nextPrice,
				updatedAt: now
			};

			return updatedOrder;
		})
	);

	return updatedOrder;
};

const remove = (id: string): boolean => {
	const before = get(orders).length;
	orders.update((items) => items.filter((order) => order._id !== id));
	return get(orders).length < before;
};

const submitPending = (): number => {
	const now = new Date().toISOString();
	let changedCount = 0;

	orders.update((items) =>
		items.map((order) => {
			if (order.status !== 'Pending') {
				return order;
			}

			changedCount += 1;
			return { ...order, status: 'Registered', updatedAt: now };
		})
	);

	return changedCount;
};

export const orderStore = {
	subscribe: orders.subscribe,
	create,
	findOne,
	find,
	update,
	remove,
	submitPending,
	fallbackUserId: FALLBACK_USER_ID
};
