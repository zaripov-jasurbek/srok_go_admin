<script lang="ts">
	import { cards, companies } from '$lib/data/catalog';

	const pageSize = 4;
	const categories = ['All', 'Marketing', 'Design', 'Development', 'Analytics'] as const;
	const statuses = ['All', 'Active', 'Paused'] as const;

	let search = '';
	let selectedCategory: (typeof categories)[number] = 'All';
	let selectedStatus: (typeof statuses)[number] = 'All';
	let currentPage = 1;

	$: filteredCards = cards.filter((card) => {
		const bySearch =
			search.trim().length === 0 ||
			card.title.toLowerCase().includes(search.toLowerCase()) ||
			card.description.toLowerCase().includes(search.toLowerCase());
		const byCategory = selectedCategory === 'All' || card.category === selectedCategory;
		const byStatus = selectedStatus === 'All' || card.status === selectedStatus;

		return bySearch && byCategory && byStatus;
	});

	$: totalPages = Math.max(1, Math.ceil(filteredCards.length / pageSize));
	$: currentPage = Math.min(currentPage, totalPages);
	$: paginatedCards = filteredCards.slice((currentPage - 1) * pageSize, currentPage * pageSize);

	const getCompanyName = (companyId: string) => companies.find((company) => company.id === companyId)?.name ?? 'Unknown';

	const resetPage = () => {
		currentPage = 1;
	};
</script>

<main class="mx-auto min-h-screen max-w-6xl px-5 py-10">
	<header class="mb-8">
		<h1 class="text-3xl font-bold text-slate-900">Cards</h1>
		<p class="mt-2 text-slate-600">Каталог карточек с фильтрацией, поиском и пагинацией.</p>
	</header>

	<section class="mb-6 grid gap-4 rounded-xl bg-slate-50 p-4 shadow-sm md:grid-cols-3">
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
			<label class="mb-1 block text-sm font-medium text-slate-700" for="category">Фильтр по категории</label>
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
			<label class="mb-1 block text-sm font-medium text-slate-700" for="status">Фильтр по статусу</label>
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
	</section>

	{#if paginatedCards.length === 0}
		<div class="rounded-xl border border-dashed border-slate-300 p-10 text-center text-slate-500">
			Карточки не найдены. Попробуйте изменить параметры поиска.
		</div>
	{:else}
		<section class="grid gap-5 md:grid-cols-2">
			{#each paginatedCards as card}
				<article class="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
					<img src={card.photo} alt={card.title} class="h-44 w-full object-cover" />
					<div class="space-y-3 p-4">
						<div class="flex items-center justify-between">
							<h2 class="text-xl font-semibold text-slate-900">{card.title}</h2>
							<span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
								>{card.status}</span
							>
						</div>
						<p class="text-sm text-slate-600">{card.description}</p>
						<div class="flex items-center justify-between text-sm text-slate-500">
							<span>{card.category}</span>
							<span>{getCompanyName(card.companyId)}</span>
						</div>
						<a
							href={`/cards/${card.id}`}
							class="inline-block rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
						>
							Открыть карточку
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
