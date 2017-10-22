/**
 * Created by happyu on 2017/10/10.
 */
const menuConfig = [
    {
        key: 'user',
        path: '/user/list',
        name: '用户管理',
        icon: 'user'
    },
    {
        key: 'blog',
        path: '/blog',
        name: '博客管理',
        icon: 'pay-circle',
        children: [
            {
                key: 'blogList',
                path: '/blog/list',
                name: '博客列表',
                icon: 'calendar'
            },
            {
                key: 'tag',
                path: '/blog/tag',
                name: '博客标签',
                icon: 'calendar'
            }
        ]
    }
];
export default menuConfig