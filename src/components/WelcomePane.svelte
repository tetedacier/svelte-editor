<script>
import {onMount} from 'svelte'
import remark from 'remark'

import recommended from 'remark-preset-lint-recommended'
import html from 'remark-html'
import report from 'vfile-reporter'
import Welcome from './Welcome.md'

$: transformedMessage = ''
onMount(()=>{
  remark()
    .use(recommended)
    .use(html)
    .process(Welcome, function(err, file) {

      console.error( file)
      transformedMessage = file.contents
    })
})

</script>
<style>
article {
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  line-height: 1.2em;
  margin: 0 .875rem 0 0;
}
article :global(h1, h2, h3, h4, h5, h6) {
  line-height: 1.6em;
  font-weight: bold;
}
article :global(h1) {
  font-size: 2rem;
  text-align: center;
  margin: 0 19.5%;
}
article :global(h2) {
 font-size: 1.75rem;
}
article :global(h3) {
  font-size: 1.312rem;
}
article :global(h4) {
  font-size: 1.2rem;
}
article :global(h5) {
  font-size: 1.1rem;
}
article :global(h6) {
  font-size: 1rem;
}
article :global(p) {
  font-size: .875rem;
}
/*
*/
</style>
<article>
  {@html transformedMessage}
</article>
