<script lang="ts">
	let { data } = $props();
</script>

<main class="mx-auto min-h-screen max-w-4xl px-5 py-10">
	<a href="/cards" class="text-sm font-medium text-slate-500 hover:text-slate-800">← Назад к cards</a>

	<article class="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
		<img src={data.card.photo} alt={data.card.title} class="h-64 w-full object-cover" />
		<div class="space-y-4 p-6">
			<div class="flex flex-wrap items-center gap-3">
				<h1 class="text-3xl font-bold text-slate-900">{data.card.title}</h1>
				<span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
					>{data.card.status}</span
				>
			</div>
			<p class="text-slate-600">{data.card.description}</p>
			<div class="rounded-xl bg-slate-50 p-4">
				<p class="text-sm text-slate-600">Компания создатель:</p>
				<a href={`/companies/${data.company.id}`} class="text-lg font-semibold text-indigo-700 hover:underline"
					>{data.company.name}</a
				>
			</div>
		</div>
	</article>

	<section class="mt-8">
		<h2 class="mb-4 text-2xl font-semibold text-slate-900">Отзывы</h2>
		<div class="space-y-3">
			{#each data.card.reviews as review}
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
