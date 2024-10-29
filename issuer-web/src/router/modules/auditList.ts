const auditListRouter = {
    path: '/auditList',
    name: 'auditList',
    component: () => import('/@/views/auditList/index.vue'),
    meta: {
        title: 'Pending Verifiable Credentials List',
        isLink: '',
        isHide: false,
        isKeepAlive: true,
        isAffix: true,
        isIframe: false,
        roles: ['admin', 'common'],
        icon: '',
    },
};

export default auditListRouter;
