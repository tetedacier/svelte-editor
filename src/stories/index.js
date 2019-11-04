import List from '../components/List.svelte'
import { things } from '../mockups'
export default { title: 'Customized virtual list' }

// console.warn(things)

export const withText = () => ({
  Component: List,
  props: { things }
})
