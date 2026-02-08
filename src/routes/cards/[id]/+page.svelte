<script lang="ts">
	import CommentThread from '$lib/components/CommentThread.svelte';

	let { data } = $props();
</script>

<main class="mx-auto min-h-screen max-w-4xl px-5 py-10">
	<a href="/cards" class="text-sm font-medium text-slate-500 hover:text-slate-800"
		>← Назад к packages</a
	>

	<article class="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
		<img
			src={data.card.photo ?? 'https://placehold.co/1200x600/e2e8f0/475569?text=No+Photo'}
			alt={data.card.name}
			class="h-64 w-full object-cover"
		/>
		<div class="space-y-4 p-6">
			<div class="flex flex-wrap items-center gap-3">
				<h1 class="text-3xl font-bold text-slate-900">{data.card.name}</h1>
				<span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
					>{data.card.active ? 'Active' : 'Paused'}</span
				>
			</div>
			<p class="text-slate-600">{data.card.description ?? 'Описание отсутствует'}</p>

			<div class="grid gap-3 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 md:grid-cols-2">
				<p><span class="font-semibold">Category:</span> {data.card.category}</p>
				<p><span class="font-semibold">Price:</span> ${data.card.price}</p>
				<p><span class="font-semibold">Count:</span> {data.card.count}</p>
				<p><span class="font-semibold">Rating:</span> {data.card.rating.toFixed(1)} / 5</p>
				<p><span class="font-semibold">Get Time:</span> {data.card.getTime} min</p>
				<p><span class="font-semibold">Close Time:</span> {data.card.closeTime} min</p>
				<p>
					<span class="font-semibold">Created:</span>
					{new Date(data.card.createdAt).toLocaleDateString()}
				</p>
				<p>
					<span class="font-semibold">Updated:</span>
					{new Date(data.card.updatedAt).toLocaleDateString()}
				</p>
			</div>

			<div class="rounded-xl bg-slate-50 p-4">
				<p class="text-sm text-slate-600">Компания:</p>
				<a
					href={`/companies/${data.company._id}`}
					class="text-lg font-semibold text-indigo-700 hover:underline">{data.company.name}</a
				>
			</div>
		</div>
	</article>

	<CommentThread comments={data.comments} title="Отзывы о package" />
</main>
