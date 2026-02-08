<script lang="ts">
	import { onMount } from 'svelte';
	import { companies } from '$lib/data/catalog';

	const categories = ['All', 'Marketing', 'Design', 'Development'] as const;
	const regions = ['All', ...new Set(companies.map((company) => company.region))];
	const limit = 4;

	let search = '';
	let byCategory: (typeof categories)[number] = 'All';
	let region = 'All';
	let maxDistance = '';
	let currentPage = 1;

	let userLocation: [number, number] | null = null;
	let locationState: 'idle' | 'loading' | 'ready' | 'unavailable' = 'idle';

	onMount(() => {
		if (!navigator.geolocation) {
			locationState = 'unavailable';
			return;
		}

		locationState = 'loading';

		navigator.geolocation.getCurrentPosition(
			(position) => {
				userLocation = [position.coords.latitude, position.coords.longitude];
				locationState = 'ready';
			},
			() => {
				locationState = 'unavailable';
			},
			{ enableHighAccuracy: true, timeout: 10000 }
		);
	});

	$: normalizedMaxDistance = maxDistance.trim() === '' ? null : Number(maxDistance);

	const distanceBetween = (first: [number, number], second: [number, number]) => {
		const toRadians = (value: number) => (value * Math.PI) / 180;
		const earthRadiusKm = 6371;

		const dLat = toRadians(second[0] - first[0]);
		const dLon = toRadians(second[1] - first[1]);
		const lat1 = toRadians(first[0]);
		const lat2 = toRadians(second[0]);

		const a =
			Math.sin(dLat / 2) ** 2 +
			Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

		return earthRadiusKm * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	};

	$: filteredCompanies = companies.filter((company) => {
		const bySearch =
			search.trim().length === 0 ||
			company.name.toLowerCase().includes(search.toLowerCase()) ||
			company.description.toLowerCase().includes(search.toLowerCase());
		const byCategoryFilter = byCategory === 'All' || company.category === byCategory;
		const byRegionFilter = region === 'All' || company.region === region;

		let byRange = true;

		if (normalizedMaxDistance !== null && userLocation) {
			byRange = distanceBetween(company.coordination, userLocation) <= normalizedMaxDistance;
		}

		return bySearch && byCategoryFilter && byRegionFilter && byRange;
	});

	$: skip = (currentPage - 1) * limit;
	$: totalPages = Math.max(1, Math.ceil(filteredCompanies.length / limit));
	$: currentPage = Math.min(currentPage, totalPages);
	$: paginatedCompanies = filteredCompanies.slice(skip, skip + limit);

	const resetPage = () => {
		currentPage = 1;
	};
</script>

<main class="mx-auto min-h-screen max-w-6xl px-5 py-10">
	<header class="mb-8">
		<h1 class="text-3xl font-bold text-slate-900">Companies</h1>
		<p class="mt-2 text-slate-600">
			Поиск компаний c фильтрацией по category, region и byRange от текущей локации пользователя.
		</p>
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
			<label class="mb-1 block text-sm font-medium text-slate-700" for="category">Category</label>
			<select
				id="category"
				bind:value={byCategory}
				onchange={resetPage}
				class="w-full rounded-lg border-slate-300"
			>
				{#each categories as category}
					<option value={category}>{category}</option>
				{/each}
			</select>
		</div>
		<div>
			<label class="mb-1 block text-sm font-medium text-slate-700" for="region">Region</label>
			<select
				id="region"
				bind:value={region}
				onchange={resetPage}
				class="w-full rounded-lg border-slate-300"
			>
				{#each regions as regionOption}
					<option value={regionOption}>{regionOption}</option>
				{/each}
			</select>
		</div>
	</section>

	<section class="mb-6 grid gap-4 rounded-xl bg-slate-50 p-4 shadow-sm md:grid-cols-1">
		<div>
			<label class="mb-1 block text-sm font-medium text-slate-700" for="maxDistance">
				Max distance (km) от вашей текущей геолокации
			</label>
			<input
				id="maxDistance"
				type="number"
				min="0"
				bind:value={maxDistance}
				oninput={resetPage}
				placeholder="500"
				class="w-full rounded-lg border-slate-300"
			/>
		</div>
	</section>

	<div class="mb-4 rounded-lg bg-slate-100 px-4 py-3 text-sm text-slate-600">
		FindCompanyDto preview: skip = {skip}, limit = {limit}, byCategory = {byCategory === 'All'
			? 'undefined'
			: byCategory}, region = {region === 'All' ? 'undefined' : region}, byRange.current = {userLocation
			? `${userLocation[0].toFixed(4)}, ${userLocation[1].toFixed(4)}`
			: 'undefined'}
	</div>

	{#if locationState === 'loading'}
		<p class="mb-4 text-sm text-slate-500">Определяем вашу текущую локацию…</p>
	{:else if locationState === 'unavailable'}
		<p class="mb-4 text-sm text-amber-600">
			Не удалось получить геолокацию. byRange не применяется, пока браузер не вернёт текущие координаты.
		</p>
	{/if}

	{#if paginatedCompanies.length === 0}
		<div class="rounded-xl border border-dashed border-slate-300 p-10 text-center text-slate-500">
			Компании не найдены. Попробуйте изменить параметры фильтрации.
		</div>
	{:else}
		<section class="grid gap-5 md:grid-cols-2">
			{#each paginatedCompanies as company}
				<article class="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
					<img src={company.photo} alt={company.name} class="h-44 w-full object-cover" />
					<div class="space-y-3 p-4">
						<div class="flex items-center justify-between gap-3">
							<h2 class="text-xl font-semibold text-slate-900">{company.name}</h2>
							<span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
								>{company.category}</span
							>
						</div>
						<p class="text-sm text-slate-600">{company.description}</p>
						<div class="grid grid-cols-2 gap-2 text-sm text-slate-500">
							<span>Region: {company.region}</span>
							<span>Rating: {company.rating.toFixed(1)}</span>
							<span>Open: {company.OpenTime}:00</span>
							<span>Close: {company.CloseTime}:00</span>
						</div>
						<a
							href={`/companies/${company._id}`}
							class="inline-block rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
						>
							Открыть компанию
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
