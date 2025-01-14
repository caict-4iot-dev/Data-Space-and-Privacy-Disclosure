const courseRouter = {
    path: '/course',
    name: 'course',
    redirect: '/course/train',
    component: () => import('/@/layout/routerView/parent.vue'),
    meta: {
        title: '活动培训',
        isLink: '',
        isHide: false,
        isKeepAlive: false,
        isAffix: true,
        isIframe: false,
        roles: ['admin', 'common'],
        icon: '',
    },
    children: [
        {
            path: '/course/train',
            name: 'train',
            component: () => import('/@/views/course/train/index.vue'),
            meta: {
                title: '培训课程',
                isLink: '',
                isHide: false,
                isKeepAlive: false,
                isAffix: true,
                isIframe: false,
                roles: ['admin', 'common'],
                icon: '',
            },
        },
        {
            path: '/course/train/detail',
            name: 'trainDetail',
            component: () => import('/@/views/course/train/detail.vue'),
            meta: {
                title: '培训课程',
                isLink: '',
                isHide: true,
                isKeepAlive: false,
                isAffix: true,
                isIframe: false,
                roles: ['admin', 'common'],
                icon: '',
            },
        },
        {
            path: '/course/activity',
            name: 'activity',
            component: () => import('/@/views/course/activity/index.vue'),
            meta: {
                title: '活动中心',
                isLink: '',
                isHide: false,
                isKeepAlive: false,
                isAffix: true,
                isIframe: false,
                roles: ['admin', 'common'],
                icon: '',
            },
        },
        {
            path: '/course/activity/detail',
            name: 'activityDetail',
            component: () => import('/@/views/course/activity/detail.vue'),
            meta: {
                title: '活动中心',
                isLink: '',
                isHide: true,
                isKeepAlive: false,
                isAffix: true,
                isIframe: false,
                roles: ['admin', 'common'],
                icon: '',
            },
        },
    ]
};

export default courseRouter;
