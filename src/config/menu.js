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
        key: 'product',
        path: '/product/list',
        name: '商品管理',
        icon: 'calendar'
    },
    {
        key: 'order',
        path: '/order',
        name: '订单管理',
        icon: 'pay-circle',
        children: [
            {
                key: 'finishedOrder',
                path: '/order/finished',
                name: '已完成订单',
                icon: 'calendar'
            }
        ]
    }
];
export default menuConfig