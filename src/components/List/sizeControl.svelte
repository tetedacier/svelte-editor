<script>
export let editedHeigth = '100px';
$: height = editedHeigth;

const dimensionRe = {
  px: {
    RE: /^(-?(?:(?:0)|(?:[1-9][0-9]*)))px$/,
    increment: 100,
    limit: {
      min: 0
    }
  },
  em: {
    RE: /^(-?(?:(?:0)|(?:[1-9][0-9]*)))em$/,
    increment: 10,
    limit: {
      min: 0
    }
  },
  rem: {
    RE: /^(-?(?:(?:0)|(?:[1-9][0-9]*)))em$/,
    increment: 10,
    limit: {
      min: 0
    }
  },
  '%':{
    RE: /^(-?(?:(?:0)|(?:[1-9][0-9]*)))%$/,
    increment: 10,
    limit: {
      min: 0,
      max:100
    }
  }
}

const addHeightEvent =(event) => {
  editedHeigth = editedHeigth.replace(
    /^((?:0)|(?:[1-9][0-9]*))px$/,
    (stringMatched, rawHeight) =>
      parseInt(rawHeight, 10) + 100 <0
        ? '0px'
        : `${parseInt(rawHeight, 10) + 100}px`
  ).replace(
    /^.*[^p][^x]$/,
    () => `0px`
  )
}
const minusHeightEvent =(event) => {
  editedHeigth = editedHeigth.replace(
    dimensionRe.px.RE,
    (stringMatched, rawHeight) =>
      parseInt(rawHeight, 10) - 100 < 0
        ? '0px'
        : `${parseInt(rawHeight, 10) - 100}px`
  ).replace(
    /^.*[^p][^x]$/,
    () => `0px`
  )
}
</script>

<style>
  fieldset {
    display: inline;
  }
  fieldset > button {
    height: 50%;
  }
</style>

<span>
  <fieldset>
    <button on:click={minusHeightEvent} type="button" name="minusHeight" title="Substract 100 pixels to the list height">-</button>
    <button on:click={addHeightEvent} type="button" name="addHeight" title="Add 100 pixels to the list height">+</button>
  </fieldset>
</span>
