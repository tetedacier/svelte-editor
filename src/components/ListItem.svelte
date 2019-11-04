<script>
export let item
</script>

<h2>{item.name}</h2>
<p>{item.content}</p>
<pre>{JSON.stringify(item, null, 2)}</pre>
