<script>
	import favicon from '$lib/assets/favicon.svg';
	import { clientSession } from "$lib/session.svelte.js"
	import {onMount} from 'svelte'
	let { children } = $props();

</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav>
	<a href="/">Home</a>
	{clientSession.data?.info?.isLoggedIn}
	{#if clientSession.data?.info?.isLoggedIn}
		<a href="/">Log Out</a>
	{:else}
		<a href="/auth">Log In</a>
	{/if}
</nav>

{@render children?.()}

<style>
	nav {
		display: flex;
		justify-content: space-between;
	}
</style>