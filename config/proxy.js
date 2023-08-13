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
    // '/booker/': {
    //   //target: 'http://192.168.1.223:8070/',
    //   target: 'http://127.0.0.1:7090/',
    //   changeOrigin: true,
    //   pathRewrite: {
    //     '^': '',
    //   },
    // },
  },
};
