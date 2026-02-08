<script lang="ts">
	import { onDestroy } from 'svelte';
	import { cards, companies } from '$lib/data/catalog';
	import { orderStore, type Order } from '$lib/stores/order-store';

	let allOrders: Order[] = [];
	const unsubscribe = orderStore.subscribe((value) => {
		allOrders = value;
	});

	onDestroy(unsubscribe);

	$: pendingOrders = allOrders.filter((order) => order.status === 'Pending');
	$: historyOrders = allOrders
		.filter((order) => order.status !== 'Pending')
		.sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt));
	$: pendingTotal = pendingOrders.reduce((acc, item) => acc + item.price, 0);

	const getPackageName = (packageId: string) =>
		cards.find((card) => card._id === packageId)?.name ?? 'Unknown package';

	const getCompanyName = (companyId: string) =>
		companies.find((company) => company._id === companyId)?.name ?? 'Unknown company';

	const increase = (order: Order) => {
		orderStore.update(order._id, { count: order.count + 1 });
	};

	const decrease = (order: Order) => {
		if (order.count <= 1) {
			orderStore.remove(order._id);
			return;
		}

		orderStore.update(order._id, { count: order.count - 1 });
	};

	const registerOrders = () => {
		orderStore.submitPending();
	};
</script>

<main class="mx-auto min-h-screen max-w-5xl space-y-8 px-5 py-10">
	<header>
		<h1 class="text-3xl font-bold text-slate-900">Basket</h1>
		<p class="mt-2 text-slate-600">Текущие заказы можно уменьшать, удалять и регистрировать.</p>
	</header>

	<section class="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
		<div class="flex items-center justify-between gap-3">
			<h2 class="text-xl font-semibold text-slate-900">Текущие (Pending)</h2>
			{#if pendingOrders.length > 0}
				<button
					type="button"
					onclick={registerOrders}
					class="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500"
				>
					Зарегистрировать все
				</button>
			{/if}
		</div>

		{#if pendingOrders.length === 0}
			<p class="rounded-xl border border-dashed border-slate-300 p-6 text-sm text-slate-500">
				Корзина пуста. Добавьте package из каталога.
			</p>
		{:else}
			<div class="space-y-3">
				{#each pendingOrders as order}
					<article
						class="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-slate-50 p-4"
					>
						<div>
							<p class="font-semibold text-slate-900">{getPackageName(order.package)}</p>
							<p class="text-sm text-slate-500">{getCompanyName(order.company)}</p>
							<p class="text-sm text-slate-600">{order.description}</p>
						</div>
						<div class="flex items-center gap-3">
							<button
								type="button"
								onclick={() => decrease(order)}
								class="h-9 w-9 rounded-lg border border-slate-300 text-lg text-slate-700"
							>
								−
							</button>
							<span class="w-10 text-center text-sm font-semibold text-slate-700"
								>{order.count}</span
							>
							<button
								type="button"
								onclick={() => increase(order)}
								class="h-9 w-9 rounded-lg border border-slate-300 text-lg text-slate-700"
							>
								+
							</button>
							<p class="w-24 text-right text-sm font-semibold text-slate-800">${order.price}</p>
							<button
								type="button"
								onclick={() => orderStore.remove(order._id)}
								class="rounded-lg border border-rose-300 px-3 py-2 text-sm text-rose-600"
							>
								Удалить
							</button>
						</div>
					</article>
				{/each}
			</div>

			<div class="border-t border-slate-200 pt-4 text-right font-semibold text-slate-900">
				Итого: ${pendingTotal}
			</div>
		{/if}
	</section>

	<section class="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
		<h2 class="text-xl font-semibold text-slate-900">История</h2>
		{#if historyOrders.length === 0}
			<p class="rounded-xl border border-dashed border-slate-300 p-6 text-sm text-slate-500">
				Здесь появятся зарегистрированные заказы.
			</p>
		{:else}
			<div class="space-y-3">
				{#each historyOrders as order}
					<article class="rounded-xl bg-slate-50 p-4">
						<div class="flex flex-wrap items-center justify-between gap-2">
							<p class="font-semibold text-slate-900">{getPackageName(order.package)}</p>
							<span class="rounded-full bg-slate-200 px-3 py-1 text-xs font-medium text-slate-700"
								>{order.status}</span
							>
						</div>
						<p class="text-sm text-slate-600">
							{getCompanyName(order.company)} · {order.count} шт. · ${order.price}
						</p>
						<p class="text-xs text-slate-500">
							Обновлён: {new Date(order.updatedAt).toLocaleString()}
						</p>
					</article>
				{/each}
			</div>
		{/if}
	</section>
</main>
