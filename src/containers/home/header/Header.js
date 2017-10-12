/**
 * Created by happyu on 2017/10/11.
 */
import React from 'react'
import { Menu, Icon} from 'antd'
const SubMenu = Menu.SubMenu;
import './header.less'
class Header extends React.PureComponent {
    render() {
        return(
            <div className="ant-layout-header">
                <Icon
                    className="trigger"
                    type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.props.toggle}
                />
                <Menu
                    onClick={this.handleClick}
                    mode="horizontal"
                    className="header-menu"
                >
                    <SubMenu title={<span><Icon type="user" />Happyu</span>}>
                        <Menu.Item key="setting:1">message</Menu.Item>
                        <Menu.Item key="setting:2">forget</Menu.Item>
                        <Menu.Divider/>
                        <Menu.Item key="setting:3">Log out</Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}

export default Header