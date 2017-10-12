/**
 * Created by happyu on 2017/10/11.
 */
import SignIn from '../containers/login/SignIn'
import Register from '../containers/login/Register'
import Home from '../containers/user/index'
import UserList from '../containers/user/user'
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
        path: '/user',
        exact: true,
        component: UserList
    }
];

export default routes