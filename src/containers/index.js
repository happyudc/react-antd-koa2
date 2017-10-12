/**
 * Created by happyu on 2017/10/10.
 */
import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import UserList from './user/UserList'
import Home from './home'
const Main = (props) => {
    "use strict";
    console.log(props);
    return (
        <div>
            <Home>
                <Switch>
                    <Route exact path="/user/list" component={UserList}/>
                    <Route exact path="/user/2" render={() => <div>1</div>}/>
                    <Route exact path="/user/3" render={() => <div>2</div>}/>
                    <Route exact path="/user/4" render={() => <div>3</div>}/>
                    <Route exact path="/user/5" render={() => <div>4</div>}/>
                </Switch>
            </Home>
        </div>
    )
};


export default withRouter(Main)