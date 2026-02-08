<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { orderStore } from '$lib/stores/order-store';

	let { children } = $props();

	let pendingOrders = $derived($orderStore.filter((order) => order.status === 'Pending'));
	let pendingCount = $derived(pendingOrders.reduce((acc, order) => acc + order.count, 0));
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="min-h-screen bg-slate-100">
	<header class="border-b border-slate-200 bg-white">
		<div class="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
			<a href="/" class="text-lg font-semibold text-slate-900">Srok Admin</a>
			<nav class="flex items-center gap-4 text-sm font-medium text-slate-700">
				<a href="/cards" class="hover:text-slate-900">Packages</a>
				<a href="/companies" class="hover:text-slate-900">Companies</a>
				<a
					href="/basket"
					class="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-xl text-slate-700 hover:bg-slate-50"
					title="Basket"
				>
					🛒
					{#if pendingCount > 0}
						<span
							class="absolute -top-1 -right-1 min-w-5 rounded-full bg-indigo-600 px-1 text-center text-xs font-semibold text-white"
						>
							{pendingCount}
						</span>
					{/if}
				</a>
			</nav>
		</div>
	</header>

	{@render children()}
</div>
