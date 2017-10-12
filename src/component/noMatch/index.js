/**
 * Created by happyu on 2017/10/12.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import './index.less';

const Nomatch = () => {
    return (
        <div className="nomatch">
            <section>
                <h1>404</h1>
                <p>
                    <Link to="/">返回首页</Link>
                </p>
            </section>
        </div>
    );
};

export default Nomatch;