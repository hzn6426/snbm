export default {
  dev: {
    '/authority/': {
      target: 'http://127.0.0.1:8090/',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
    '/business/': {
      target: 'http://127.0.0.1:8090/',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
};
