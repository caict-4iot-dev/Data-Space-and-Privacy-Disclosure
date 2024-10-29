const identificationRouter = {
    path: '/identifier',
    name: 'identifier',
    component: () => import('/@/views/identifier/index.vue'),
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

export default identificationRouter;
