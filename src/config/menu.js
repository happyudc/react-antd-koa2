/**
 * Created by happyu on 2017/10/10.
 */
const menuConfig = [{
    key: 'orders',
    path: '/orders/list',
    name: '我的订单',
    icon: 'printer',
    children: [{
        key: 'orderUnassign',
        path: '/orderUnassign',
        name: '未分配订单'
    }, {
        key: 'orderAssigned',
        path: '/user/3',
        name: '已分配订单'
    },{
        key: 'UnreturnVisitOrders',
        path: '/user/3',
        name: '未回访订单'
    }, {
        key: 'ReturnVisitOrders',
        path: '/user/4',
        name: '已回访订单'
    }, {
        key: 'OrdersBack',
        path: '/user/5',
        name: '退货订单'
    }]
}, {
    key: 'userList',
    path: '/user/list',
    name: '用户管理',
    icon: 'user'
}, {
    key: 'orderListBack',
    path: '/express/orderListBack',
    name: '已发货订单',
    icon: 'phone'
}];
export default menuConfig