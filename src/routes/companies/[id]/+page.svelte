<script lang="ts">
	import CommentThread from '$lib/components/CommentThread.svelte';

	let { data } = $props();
</script>

<main class="mx-auto min-h-screen max-w-4xl px-5 py-10">
	<a href="/cards" class="text-sm font-medium text-slate-500 hover:text-slate-800"
		>← Назад к cards</a
	>

	<article class="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
		<img src={data.company.photo} alt={data.company.name} class="h-64 w-full object-cover" />
		<div class="space-y-4 p-6">
			<div>
				<h1 class="text-3xl font-bold text-slate-900">{data.company.name}</h1>
				<p class="mt-1 text-slate-500">{data.company.category} · {data.company.region}</p>
			</div>
			<p class="text-slate-600">{data.company.description || 'Описание отсутствует'}</p>

			<div class="grid gap-3 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 md:grid-cols-2">
				<p><span class="font-semibold">Rating:</span> {data.company.rating.toFixed(1)} / 5</p>
				<p>
					<span class="font-semibold">Working hours:</span>
					{data.company.OpenTime}:00 - {data.company.CloseTime}:00
				</p>
				<p>
					<span class="font-semibold">Coordinates:</span>
					{data.company.coordination[0]}, {data.company.coordination[1]}
				</p>
				<p><span class="font-semibold">Region:</span> {data.company.region}</p>
				<p>
					<span class="font-semibold">Created:</span>
					{new Date(data.company.createdAt).toLocaleDateString()}
				</p>
				<p>
					<span class="font-semibold">Updated:</span>
					{new Date(data.company.updatedAt).toLocaleDateString()}
				</p>
			</div>
		</div>
	</article>

	<section class="mt-8">
		<h2 class="mb-4 text-2xl font-semibold text-slate-900">Карточки компании</h2>
		<div class="grid gap-3 md:grid-cols-2">
			{#each data.companyCards as card}
				<a
					href={`/cards/${card._id}`}
					class="rounded-xl border border-slate-200 p-4 hover:bg-slate-50"
				>
					<p class="font-medium text-slate-900">{card.name}</p>
					<p class="text-sm text-slate-500">{card.category} · ${card.price}</p>
				</a>
			{/each}
		</div>
	</section>

	<CommentThread comments={data.comments} title="Отзывы о компании" />
</main>
