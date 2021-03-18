// import { hmrPlugin, presets } from '@open-wc/dev-server-hmr';

/** Use Hot Module replacement by adding --hmr to the start command */
const hmr = process.argv.includes('--hmr');

const spaRouterMiddleware = (context, next) => {
  const spaRoutes = ['blog', 'resume', 'projects'];
  const isSpa = spaRoutes.find(route => context.url.indexOf(`/${route}`) === 0);
  if (isSpa) {
    console.log('forcing spa', context.url);
    // force spa routes
    context.url = '/';
  }

  return next();
};

export default /** @type {import('@web/dev-server').DevServerConfig} */ ({
  nodeResolve: true,
  watch: !hmr,
  open: '/',

  /** Compile JS for older browsers. Requires @web/dev-server-esbuild plugin */
  // esbuildTarget: 'auto'

  /** Set appIndex to enable SPA routing */
  // appIndex: 'demo/index.html',

  /** Confgure bare import resolve plugin */
  // nodeResolve: {
  //   exportConditions: ['browser', 'development']
  // },

  plugins: [
    /** Use Hot Module Replacement by uncommenting. Requires @open-wc/dev-server-hmr plugin */
    // hmr && hmrPlugin({ exclude: ['**/*/node_modules/**/*'], presets: [presets.litElement] }),
  ],

  middleware: [spaRouterMiddleware],

  // See documentation for all available options
});
