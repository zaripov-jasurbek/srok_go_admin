<script lang="ts">
	import CommentNode from '$lib/components/CommentNode.svelte';
	import type { Comment } from '$lib/data/catalog';

	let {
		comment,
		comments,
		depth,
		maxDepth
	}: {
		comment: Comment;
		comments: Comment[];
		depth: number;
		maxDepth: number;
	} = $props();

	let showReplyForm = $state(false);
	let replyText = $state('');
	let localReplies = $state<Comment[]>([]);

	const children = $derived.by(() => {
		const baseChildren = comments.filter((item) => item.parentId === comment._id);

		return [...baseChildren, ...localReplies].sort(
			(a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
		);
	});

	const canReply = $derived(depth < maxDepth);

	const reactionLabel = (reaction: 'like' | 'dislike') =>
		reaction === 'like' ? '👍 Like' : '👎 Dislike';

	const submitReply = () => {
		const normalized = replyText.trim();
		if (!normalized || !canReply) {
			return;
		}

		localReplies = [
			...localReplies,
			{
				_id: `local-${comment._id}-${Date.now()}`,
				userName: 'You',
				package: comment.package,
				company: comment.company,
				parentId: comment._id,
				text: normalized,
				likesCount: 0,
				dislikesCount: 0,
				rating: null,
				createdAt: new Date().toISOString(),
				reactionHistory: []
			}
		];
		replyText = '';
		showReplyForm = false;
	};
</script>

<article class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
	<div class="flex items-center justify-between gap-2">
		<p class="font-medium text-slate-900">{comment.userName}</p>
		<p class="text-xs text-slate-500">{new Date(comment.createdAt).toLocaleString()}</p>
	</div>

	{#if comment.rating}
		<p class="mt-1 text-sm text-amber-600">
			{'★'.repeat(comment.rating)}{'☆'.repeat(5 - comment.rating)}
		</p>
	{/if}

	<p class="mt-2 text-slate-700">{comment.text}</p>

	<div class="mt-3 flex flex-wrap items-center gap-2 text-sm">
		<div class="group relative">
			<button class="rounded-lg bg-emerald-50 px-3 py-1 text-emerald-700"
				>👍 {comment.likesCount}</button
			>
			<div
				class="pointer-events-none absolute top-full left-0 z-10 mt-2 hidden w-72 rounded-lg border border-slate-200 bg-white p-3 text-xs text-slate-600 shadow-lg group-hover:block"
			>
				<p class="mb-2 font-semibold text-slate-800">История реакций</p>
				{#if comment.reactionHistory.some((item) => item.reaction === 'like')}
					{#each comment.reactionHistory.filter((item) => item.reaction === 'like') as entry}
						<p>
							{reactionLabel(entry.reaction)} · {entry.userName} · {new Date(
								entry.at
							).toLocaleString()}
						</p>
					{/each}
				{:else}
					<p>Пока нет лайков.</p>
				{/if}
			</div>
		</div>

		<div class="group relative">
			<button class="rounded-lg bg-rose-50 px-3 py-1 text-rose-700"
				>👎 {comment.dislikesCount}</button
			>
			<div
				class="pointer-events-none absolute top-full left-0 z-10 mt-2 hidden w-72 rounded-lg border border-slate-200 bg-white p-3 text-xs text-slate-600 shadow-lg group-hover:block"
			>
				<p class="mb-2 font-semibold text-slate-800">История реакций</p>
				{#if comment.reactionHistory.some((item) => item.reaction === 'dislike')}
					{#each comment.reactionHistory.filter((item) => item.reaction === 'dislike') as entry}
						<p>
							{reactionLabel(entry.reaction)} · {entry.userName} · {new Date(
								entry.at
							).toLocaleString()}
						</p>
					{/each}
				{:else}
					<p>Пока нет дизлайков.</p>
				{/if}
			</div>
		</div>

		{#if canReply}
			<button
				class="rounded-lg border border-slate-200 px-3 py-1 text-slate-700 hover:bg-slate-50"
				onclick={() => (showReplyForm = !showReplyForm)}
			>
				Ответить
			</button>
		{/if}
	</div>

	{#if showReplyForm && canReply}
		<div class="mt-3 rounded-lg bg-slate-50 p-3">
			<textarea
				bind:value={replyText}
				rows="2"
				class="w-full rounded-lg border border-slate-200 p-2 text-sm"
				placeholder="Напишите ответ..."
			></textarea>
			<div class="mt-2 flex gap-2">
				<button class="rounded-lg bg-slate-900 px-3 py-1 text-sm text-white" onclick={submitReply}
					>Отправить</button
				>
				<button
					class="rounded-lg border border-slate-200 px-3 py-1 text-sm text-slate-700"
					onclick={() => {
						showReplyForm = false;
						replyText = '';
					}}
				>
					Отмена
				</button>
			</div>
		</div>
	{/if}

	{#if children.length && depth < maxDepth}
		<div class="mt-4 space-y-3 border-l-2 border-slate-100 pl-4">
			{#each children as child}
				<CommentNode comment={child} {comments} depth={depth + 1} {maxDepth} />
			{/each}
		</div>
	{/if}
</article>
