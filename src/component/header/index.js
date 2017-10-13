import React from 'react'
import { Menu, Icon} from 'antd'
const SubMenu = Menu.SubMenu;
import './index.less'
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
                    {/*此处从localStorage中获取用户名，如果从父组件中的props中获取用户刷新页面值就不在了*/}
                    <SubMenu title={<span><Icon type="user" />{this.props.user}</span>}>
                        <Menu.Item key="setting:1"><span><Icon type="calendar"/><span>My orders</span></span></Menu.Item>
                        <Menu.Item key="setting:2"><spap><Icon type="edit"/>Forget password</spap></Menu.Item>
                        <Menu.Divider/>
                        <Menu.Item key="setting:3"><span onClick={this.props.logout}><span><Icon type="logout"/></span>Log out</span></Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}

export default Header