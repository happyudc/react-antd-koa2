/**
 * Created by happyu on 2017/10/11.
 */
import "babel-polyfill"
import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom'
import Home from '../containers/'
import Welcome from '../containers/welcome/'
import Login from '../containers/login/SignIn'
import Register from '../containers/login/Register'
import NoMatch from '../component/noMatch/'
class RouterMap extends React.PureComponent {
    render() {
        return(
            <Router history={this.props.history}>
                <Switch>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/" component={Welcome}/>
                    <Route path="/user" component={Home}/>
                    <Route component={NoMatch}/>
                </Switch>
            </Router>
        )
    }
}

export default RouterMap
