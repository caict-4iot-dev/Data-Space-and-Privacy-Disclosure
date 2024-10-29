const resloverRouter = {
    path: '/resolver',
    name: 'resolver',
    component: () => import('/@/views/reslover/index.vue'),
    meta: {
        title: '',
        isLink: '',
        isHide: false,
        isKeepAlive: true,
        isAffix: true,
        isIframe: false,
        roles: ['admin', 'common'],
        icon: '',
    },
};

export default resloverRouter;
