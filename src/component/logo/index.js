/**
 * Created by happyu on 2017/10/11.
 */
import React from 'react'
import './index.less'
const LOGO = "Happyu";
class Logo extends React.PureComponent {
    render() {
        return(
            <div className="logo">
                <span className="user-name">{this.props.collapsed ? LOGO[0] : LOGO}</span>
            </div>
        )
    }
}

export default Logo