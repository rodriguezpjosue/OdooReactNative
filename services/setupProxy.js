import { createProxyMiddleware } from 'http-proxy-middleware';

export default (app) => {
  app.use(
    '/api/login',
    createProxyMiddleware({
      target: 'https://app-test.sgsdominion-global.com/jsonrpc',
      changeOrigin: true,
    })
  );
};