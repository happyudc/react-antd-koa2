/**
 * Created by happyu on 2017/10/11.
 */
import SignIn from '../containers/login/SignIn'
import Register from '../containers/login/Register'
import Home from '../containers/home/Home'
import UserList from '../containers/user/UserList'
const routes = [
    {
        path: '/',
        exact: true,
        component: SignIn
    },
    {
        path: '/register',
        exact: true,
        component: Register
    },
    {
        path: '/home',
        exact: true,
        component: Home
    },
    {
        path: '/userList',
        exact: true,
        component: UserList
    }
];

export default routes