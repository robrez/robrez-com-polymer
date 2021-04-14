export const entries = ['ignore-test', 'hello-world'];

export const resolve = (name: string): Promise<unknown> => {
  switch (name) {
    case 'hello-world':
      return import('./hello-world/index').then(module => module['idx']);
    case 'ignore-test':
      return import('./ignore-test/index').then(module => module['idx']);
    default:
      return Promise.resolve(null);
  }
};
