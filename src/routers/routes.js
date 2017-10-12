/**
 * Created by happyu on 2017/10/11.
 */
import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'
import routes from '../config/routes'

class RouterMap extends React.PureComponent {
    render() {
        return(
            <Router history={this.props.history}>
                <Switch>
                    {routes.map((route, index) =>
                        <Route
                            key={index}
                            path={route.path}
                            exact={route.exact}
                            component={route.component}
                        />
                    )}
                </Switch>
            </Router>
        )
    }
}

export default RouterMap
