<script lang="ts">
	import CommentNode from '$lib/components/CommentNode.svelte';
	import type { Comment } from '$lib/data/catalog';

	let {
		comments,
		title = 'Отзывы',
		maxDepth = 3
	}: {
		comments: Comment[];
		title?: string;
		maxDepth?: number;
	} = $props();

	const roots = $derived(comments.filter((comment) => !comment.parentId));
</script>

<section class="mt-8">
	<h2 class="mb-4 text-2xl font-semibold text-slate-900">{title}</h2>

	{#if !roots.length}
		<p class="rounded-xl border border-dashed border-slate-300 p-4 text-sm text-slate-500">
			Пока отзывов нет.
		</p>
	{:else}
		<div class="space-y-4">
			{#each roots as comment}
				<CommentNode {comment} {comments} depth={1} {maxDepth} />
			{/each}
		</div>
	{/if}
</section>
