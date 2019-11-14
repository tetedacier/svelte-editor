<script>
export let from = { value: '0', unit:'px' }
export let to = { value: '0', unit:'px' }
</script>
<style>
  .to {
    padding-left: 2rem;
  }
</style>

<span>{from.value}</span>
<span>{from.unit}</span>
<pre>
  =>  <span class="to">{to.value}</span> <span>{to.unit}</span>
</pre>
