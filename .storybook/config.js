import { configure } from '@storybook/svelte';

configure(require.context('../src/stories', true, /\.js$/), module);
