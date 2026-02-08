<script lang="ts">
	import CommentThread from '$lib/components/CommentThread.svelte';

	let { data } = $props();
</script>

<main class="mx-auto min-h-screen max-w-4xl px-5 py-10">
	<div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
		<div class="h-32 bg-gradient-to-r from-indigo-500 to-sky-400"></div>
		<div class="px-6 pb-6">
			<img
				src={data.user.avatar ?? 'https://placehold.co/160x160/e2e8f0/475569?text=User'}
				alt={data.user.name}
				class="-mt-14 h-28 w-28 rounded-full border-4 border-white object-cover shadow"
			/>
			<div class="mt-4 space-y-3">
				<div class="flex flex-wrap items-center justify-between gap-3">
					<h1 class="text-3xl font-bold text-slate-900">{data.user.name}</h1>
					<span class="rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700"
						>⭐ {data.user.rating.toFixed(1)}</span
					>
				</div>
				<p class="text-slate-600">
					{data.user.about || 'Пользователь пока не добавил информацию о себе.'}
				</p>
				<div class="grid gap-3 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 md:grid-cols-2">
					<p><span class="font-semibold">Email:</span> {data.user.email ?? '—'}</p>
					<p><span class="font-semibold">Phone:</span> {data.user.phone ?? '—'}</p>
					<p>
						<span class="font-semibold">Created:</span>
						{new Date(data.user.createdAt).toLocaleDateString()}
					</p>
					<p>
						<span class="font-semibold">Updated:</span>
						{new Date(data.user.updatedAt).toLocaleDateString()}
					</p>
				</div>
			</div>
		</div>
	</div>

	<CommentThread comments={data.profileComments} title="Отзывы и комментарии на профиле" />

	<CommentThread comments={data.authoredComments} title="Отзывы, которые пользователь оставил" />
</main>
