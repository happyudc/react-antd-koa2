/**
 * Created by happyu on 2017/10/10.
 */
const menuConfig = {
    theme: 'dark',
    mode: 'inline',
    defaultSelectedKeys: ['user List'],
    defaultOpenKeys: ['User'],
    subMenu: [
        {
            key: 'User',
            title: 'User',
            icon: 'user',
            menuItems: [
                {
                    name: 'user List',
                    path: '/userList'
                }
            ]
        }
    ]
}
export default menuConfig