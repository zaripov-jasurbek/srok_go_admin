<script lang="ts">
	let { data } = $props();
</script>

<main class="mx-auto min-h-screen max-w-4xl px-5 py-10">
	<a href="/cards" class="text-sm font-medium text-slate-500 hover:text-slate-800">← Назад к cards</a>

	<article class="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
		<img src={data.company.photo} alt={data.company.name} class="h-64 w-full object-cover" />
		<div class="space-y-4 p-6">
			<div class="flex items-center gap-4">
				<img src={data.company.logo} alt={data.company.name} class="h-16 w-16 rounded-full object-cover" />
				<div>
					<h1 class="text-3xl font-bold text-slate-900">{data.company.name}</h1>
					<p class="text-slate-500">{data.company.industry}</p>
				</div>
			</div>
			<p class="text-slate-600">{data.company.description}</p>
		</div>
	</article>

	<section class="mt-8">
		<h2 class="mb-4 text-2xl font-semibold text-slate-900">Карточки компании</h2>
		<div class="grid gap-3 md:grid-cols-2">
			{#each data.companyCards as card}
				<a href={`/cards/${card._id}`} class="rounded-xl border border-slate-200 p-4 hover:bg-slate-50">
					<p class="font-medium text-slate-900">{card.name}</p>
					<p class="text-sm text-slate-500">{card.category} · ${card.price}</p>
				</a>
			{/each}
		</div>
	</section>

	<section class="mt-8">
		<h2 class="mb-4 text-2xl font-semibold text-slate-900">Отзывы о компании</h2>
		<div class="space-y-3">
			{#each data.company.reviews as review}
				<article class="rounded-xl border border-slate-200 p-4">
					<div class="flex items-center justify-between">
						<p class="font-medium text-slate-800">{review.author}</p>
						<p class="text-amber-500">{'★'.repeat(review.rating)}</p>
					</div>
					<p class="mt-2 text-sm text-slate-600">{review.comment}</p>
				</article>
			{/each}
		</div>
	</section>
</main>
