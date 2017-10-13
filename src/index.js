/**
 * Created by happyu on 2017/10/9.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import RouterMap from './routers/routes'
import createHistory from 'history/createBrowserHistory'
import configStore from './store/configStore'
const store = configStore();
const history = createHistory();
ReactDOM.render(
    <Provider store={store}>
        <RouterMap history={history}/>
    </Provider>,
    document.getElementById('root')
);

