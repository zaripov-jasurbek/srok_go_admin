<script lang="ts">
	import { cards, companies } from '$lib/data/catalog';
	import { orderStore } from '$lib/stores/order-store';

	const pageSize = 4;
	const categories = ['All', 'Marketing', 'Design', 'Development', 'Analytics'] as const;
	const statuses = ['All', 'Active', 'Paused'] as const;

	let search = '';
	let selectedCategory: (typeof categories)[number] = 'All';
	let selectedStatus: (typeof statuses)[number] = 'All';
	let minPrice = '';
	let maxPrice = '';
	let currentPage = 1;
	let orderCountByPackage: Record<string, number> = {};

	$: normalizedMinPrice = minPrice === '' ? null : Number(minPrice);
	$: normalizedMaxPrice = maxPrice === '' ? null : Number(maxPrice);

	$: filteredCards = cards.filter((card) => {
		const bySearch =
			search.trim().length === 0 ||
			card.name.toLowerCase().includes(search.toLowerCase()) ||
			(card.description ?? '').toLowerCase().includes(search.toLowerCase());
		const byCategory = selectedCategory === 'All' || card.category === selectedCategory;
		const byStatus =
			selectedStatus === 'All' || (selectedStatus === 'Active' ? card.active : !card.active);
		const byMinPrice = normalizedMinPrice === null || card.price >= normalizedMinPrice;
		const byMaxPrice = normalizedMaxPrice === null || card.price <= normalizedMaxPrice;

		return bySearch && byCategory && byStatus && byMinPrice && byMaxPrice;
	});

	$: totalPages = Math.max(1, Math.ceil(filteredCards.length / pageSize));
	$: currentPage = Math.min(currentPage, totalPages);
	$: paginatedCards = filteredCards.slice((currentPage - 1) * pageSize, currentPage * pageSize);

	const getCompanyName = (companyId: string) =>
		companies.find((company) => company._id === companyId)?.name ?? 'Unknown';

	const getOrderCount = (packageId: string) => orderCountByPackage[packageId] ?? 1;

	const incrementOrderCount = (packageId: string) => {
		orderCountByPackage = {
			...orderCountByPackage,
			[packageId]: Math.min(99, getOrderCount(packageId) + 1)
		};
	};

	const decrementOrderCount = (packageId: string) => {
		orderCountByPackage = {
			...orderCountByPackage,
			[packageId]: Math.max(1, getOrderCount(packageId) - 1)
		};
	};

	const setOrderCount = (packageId: string, value: string) => {
		const parsed = Number(value);
		orderCountByPackage = {
			...orderCountByPackage,
			[packageId]: Number.isFinite(parsed) && parsed >= 1 ? Math.floor(parsed) : 1
		};
	};

	const addToBasket = (packageId: string) => {
		const card = cards.find((item) => item._id === packageId);

		if (!card) {
			return;
		}

		orderStore.create({
			package: card._id,
			company: card.company,
			user: orderStore.fallbackUserId,
			description: card.description ?? card.name,
			coordination: [0, 0],
			count: getOrderCount(packageId)
		});

		orderCountByPackage = {
			...orderCountByPackage,
			[packageId]: 1
		};
	};

	const resetPage = () => {
		currentPage = 1;
	};
</script>

<main class="mx-auto min-h-screen max-w-6xl px-5 py-10">
	<header class="mb-8">
		<h1 class="text-3xl font-bold text-slate-900">Packages</h1>
		<p class="mt-2 text-slate-600">Каталог package с фильтрацией по категории, статусу и цене.</p>
	</header>

	<section class="mb-6 grid gap-4 rounded-xl bg-slate-50 p-4 shadow-sm md:grid-cols-5">
		<div>
			<label class="mb-1 block text-sm font-medium text-slate-700" for="search">Поиск</label>
			<input
				id="search"
				type="text"
				bind:value={search}
				oninput={resetPage}
				placeholder="Название или описание"
				class="w-full rounded-lg border-slate-300"
			/>
		</div>
		<div>
			<label class="mb-1 block text-sm font-medium text-slate-700" for="category">Категория</label>
			<select
				id="category"
				bind:value={selectedCategory}
				onchange={resetPage}
				class="w-full rounded-lg border-slate-300"
			>
				{#each categories as category}
					<option value={category}>{category}</option>
				{/each}
			</select>
		</div>
		<div>
			<label class="mb-1 block text-sm font-medium text-slate-700" for="status">Статус</label>
			<select
				id="status"
				bind:value={selectedStatus}
				onchange={resetPage}
				class="w-full rounded-lg border-slate-300"
			>
				{#each statuses as status}
					<option value={status}>{status}</option>
				{/each}
			</select>
		</div>
		<div>
			<label class="mb-1 block text-sm font-medium text-slate-700" for="minPrice">Min price</label>
			<input
				id="minPrice"
				type="number"
				min="0"
				bind:value={minPrice}
				oninput={resetPage}
				placeholder="0"
				class="w-full rounded-lg border-slate-300"
			/>
		</div>
		<div>
			<label class="mb-1 block text-sm font-medium text-slate-700" for="maxPrice">Max price</label>
			<input
				id="maxPrice"
				type="number"
				min="0"
				bind:value={maxPrice}
				oninput={resetPage}
				placeholder="5000"
				class="w-full rounded-lg border-slate-300"
			/>
		</div>
	</section>

	{#if paginatedCards.length === 0}
		<div class="rounded-xl border border-dashed border-slate-300 p-10 text-center text-slate-500">
			Package не найдены. Попробуйте изменить параметры фильтрации.
		</div>
	{:else}
		<section class="grid gap-5 md:grid-cols-2">
			{#each paginatedCards as card}
				<article class="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
					<img
						src={card.photo ?? 'https://placehold.co/1200x600/e2e8f0/475569?text=No+Photo'}
						alt={card.name}
						class="h-44 w-full object-cover"
					/>
					<div class="space-y-3 p-4">
						<div class="flex items-center justify-between">
							<h2 class="text-xl font-semibold text-slate-900">{card.name}</h2>
							<span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
								>{card.active ? 'Active' : 'Paused'}</span
							>
						</div>
						<p class="text-sm text-slate-600">{card.description ?? 'Описание отсутствует'}</p>
						<div class="grid grid-cols-2 gap-2 text-sm text-slate-500">
							<span>Category: {card.category}</span>
							<span>Price: ${card.price}</span>
							<span>Count: {card.count}</span>
							<span>Rating: {card.rating.toFixed(1)}</span>
							<span>Get: {card.getTime}m</span>
							<span>Close: {card.closeTime}m</span>
						</div>
						<div class="text-sm text-slate-500">Company: {getCompanyName(card.company)}</div>

						<div class="flex flex-wrap items-center gap-2 rounded-lg bg-slate-50 p-3">
							<div class="flex items-center gap-2">
								<button
									type="button"
									onclick={() => decrementOrderCount(card._id)}
									class="h-9 w-9 rounded-lg border border-slate-300 text-lg font-medium text-slate-700 hover:bg-white"
								>
									−
								</button>
								<input
									type="number"
									min="1"
									value={getOrderCount(card._id)}
									oninput={(event) => setOrderCount(card._id, event.currentTarget.value)}
									class="w-16 rounded-lg border-slate-300 text-center"
								/>
								<button
									type="button"
									onclick={() => incrementOrderCount(card._id)}
									class="h-9 w-9 rounded-lg border border-slate-300 text-lg font-medium text-slate-700 hover:bg-white"
								>
									+
								</button>
							</div>
							<button
								type="button"
								onclick={() => addToBasket(card._id)}
								class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
							>
								Add to basket
							</button>
						</div>

						<a
							href={`/cards/${card._id}`}
							class="inline-block rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
						>
							Открыть package
						</a>
					</div>
				</article>
			{/each}
		</section>

		<nav class="mt-8 flex items-center justify-center gap-3">
			<button
				onclick={() => (currentPage = Math.max(1, currentPage - 1))}
				disabled={currentPage === 1}
				class="rounded-lg border border-slate-300 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
			>
				Назад
			</button>
			<span class="text-sm text-slate-600">Страница {currentPage} из {totalPages}</span>
			<button
				onclick={() => (currentPage = Math.min(totalPages, currentPage + 1))}
				disabled={currentPage === totalPages}
				class="rounded-lg border border-slate-300 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
			>
				Вперёд
			</button>
		</nav>
	{/if}
</main>
