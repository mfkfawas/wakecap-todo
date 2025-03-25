import type { Preview } from '@storybook/react';
import '@/index.css';
import { withProviders } from './withProviders.decarotors';

const preview: Preview = {
  decorators: [withProviders],
  parameters: {
    // actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      darkMode: {
        current: 'light',
        darkClass: 'dark',
        stylePreview: true,
      },
    },
  },
};

export default preview;
