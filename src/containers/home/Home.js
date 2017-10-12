/**
 * Created by happyu on 2017/10/10.
 */
import React from 'react'
import { Layout, Breadcrumb, Menu, Icon } from 'antd'
const { Sider, Content, Footer } = Layout;
import { Link, Route, BrowserRouter as Router } from 'react-router-dom'
const { SubMenu } = Menu;
import Logo from './logo/Logo'
import Header from './header/Header'
import routes from '../../config/routes'
import menuConfig from '../../config/menu'
import './home.less'
class Home extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false, // 当前收起状态，默认false, 表示不收起
        }
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    render() {
        return(
            <Router history={this.props.history}>
                <Layout>
                    {/*左边菜单部分*/}
                    <Sider
                        trigger={null} // 自定义 trigger，设置为 null 时隐藏 trigger
                        collapsible
                        collapsed={this.state.collapsed}
                    >
                        <Logo collapsed={this.state.collapsed}/>
                        <Menu
                            theme={menuConfig.theme}
                            mode={menuConfig.mode}
                            defaultSelectedKeys={menuConfig.defaultSelectedKeys}
                            defaultOpenKeys={menuConfig.defaultOpenKeys}
                        >
                            {menuConfig.subMenu.map((subMenu,index) =>
                                <SubMenu
                                    key={subMenu.key}
                                    title={<span><Icon type={subMenu.icon}/><span>{subMenu.title}</span></span>}
                                >
                                    {subMenu.menuItems.map((menuItem, idx) =>
                                        <Menu.Item key={menuItem.name}>
                                            <Link to={menuItem.path}>{menuItem.name}</Link>
                                        </Menu.Item>
                                    )}
                                </SubMenu>
                            )}
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header toggle={this.toggle} collapsed={this.state.collapsed}/>
                        <Content style={{ margin: '0 16px'}}>
                            <Breadcrumb style={{ margin: '12px 0'}}>
                                <Breadcrumb.Item>User</Breadcrumb.Item>
                                <Breadcrumb.Item>Bill</Breadcrumb.Item>
                            </Breadcrumb>
                            <div style={{ padding: 24, background: '#fff', minHeight: 280}}>
                                {routes.map((route, index) =>
                                    <Route
                                        key={index}
                                        path={route.path}
                                        exact={route.exact}
                                        component={route.component}
                                    />
                                )}
                            </div>
                        </Content>
                        <Footer style={{ textAlign: 'center'}}>Ant Design ©2016 Created by Ant UED</Footer>
                    </Layout>
                </Layout>
            </Router>
        )
    }
}

export default Home