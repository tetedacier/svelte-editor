import List from './List.svelte'
import { things } from '../stories/mockups'
export default { title: 'Customized virtual list' }
export const virtualList = () => ({
  Component: List,
  props: { things }
})
