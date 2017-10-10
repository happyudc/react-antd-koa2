/**
 * Created by happyu on 2017/10/9.
 */
import 'whatwg-fetch';

function fetchEvent( options ) {
    if ( !options ) {
        return;
    }
    let _url = options.url || '';
    let _type = options.type || 'GET';
    let _data = options.data || {};
    let _success;
    let _error;
    let fetchParams = {
        credentials: 'include',
    };
    if ( _type === 'GET' ) {
        let urlParams = [];
        for ( let key in _data ) {
            let _paramStr = '';
            if ( typeof _data[key] === 'object' ) {
                _paramStr = `${key}=${JSON.stringify(_data[key])}`;
            } else {
                _paramStr = `${key}=${_data[key]}`;
            }
            urlParams.push(_paramStr)
        }

        if ( _url.indexOf('?') >= 0 ) {
            _url = `${_url}&${urlParams.join('&')}`
        } else {
            _url = `${_url}?${urlParams.join('&')}`
        }
        fetchParams = {
            ...fetchParams,
            ...{
                headers: new Headers()
            }
        }
    } else {
        fetchParams = {
            credentials: 'include',
            method: _type,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(_data)
        }
        fetchParams = {
            ...fetchParams,
            ...{
                method: _type,
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(_data)
            }
        }
    }

    if ( typeof options.success === 'function' && typeof options.error === 'function' ) {
        _success = options.success;
        _error = options.error;
        fetch(_url, fetchParams)
            .then((response) => {
                return response.json();
            }).then( ( result ) => {
            _success( result )
        }).catch( ( err ) => {
            _error( err )
        })
    } else {
        return new Promise((resolve, reject) => {
            fetch(_url, fetchParams)
                .then((response) => {
                    return response.json();
                }).then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            })
        }).catch((err) => {
            console.log(err)
        })
    }
}

const request = {
    get( options ) {
        if ( typeof options !== 'object') {
            return;
        }
        options.type = 'GET';
        return fetchEvent( options );
    },

    post( options ) {
        if ( typeof options !== 'object') {
            return;
        }
        options.type = 'POST';
        return fetchEvent( options );
    },
};

export default request;