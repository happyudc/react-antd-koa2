/**
 * Created by happyu on 2017/10/11.
 */
import "babel-polyfill"
import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom'
import { authApi } from '../api/auth/anth'
import Home from '../containers/'
import Welcome from '../containers/welcome/'
import Login from '../containers/login/SignIn'
import Register from '../containers/login/Register'
import NoMatch from '../component/noMatch/'

// 从localStorage获取isLogin判断用户是否登陆
const isLogin = () => localStorage.getItem('isLogin');

/**
 * 为了安全起见，还需要在后端进行是否登陆验证
 * @returns {Promise.<void>}
 */
const requestBankEndAuth = async function () { // 返回的是一个Promise对象
    let result = await authApi();
    result && result.isLogin ? '' : <Redirect to="/login"/>
};

requestBankEndAuth();


/**
 * 需要登陆认证后才能进入路由
 * @param Component
 * @param rest
 * @returns {XML}
 * @constructor
 */
const PrivateRoute = ({ component: Component, ...rest }) => {
    return(
        <Route
            {...rest}
            render={ props => isLogin() ? <Component {...props}/> : <Redirect to="/login"/>}
        />
    )
};

class RouterMap extends React.PureComponent {
    render() {
        return(
            <Router>
                <Switch>
                    <Route exact path="/" component={Login}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Register}/>
                    <PrivateRoute exact path="/index" component={Welcome}/>
                    <PrivateRoute path="/user" component={Home}/>
                    <Route component={NoMatch}/>
                </Switch>
            </Router>
        )
    }
}

export default RouterMap
