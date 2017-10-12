/**
 * Created by happyu on 2017/10/10.
 */
import React from 'react'
import { Layout, Breadcrumb, Menu } from 'antd'
import { withRouter } from 'react-router-dom'
import Logo from '../../component/logo/'
import Header from '../../component/header/'
import menuConfig from '../../config/menu'
import renderMenu from '../../component/menu/'
import './index.less'
const { Sider, Content, Footer } = Layout;
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
    };

    render() {
        console.log(this.props.location);
        return(
            <Layout>
                {/*左边菜单部分*/}
                <Sider
                    trigger={null} // 自定义 trigger，设置为 null 时隐藏 trigger
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <Logo collapsed={this.state.collapsed}/>
                    <Menu
                        theme={'dark'}
                        mode={'inline'}
                    >
                        {renderMenu(menuConfig, false)}
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
                            {this.props.children}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center'}}>Ant Design ©2016 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        )
    }
}

export default withRouter(Home)