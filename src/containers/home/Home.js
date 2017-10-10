/**
 * Created by happyu on 2017/10/10.
 */
import React from 'react'
import { Layout, Breadcrumb } from 'antd'
const { Header, Sider, Content, Footer } = Layout;
import LeftMenu from './left/LeftMenu'
import './home.less'
class Home extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false
        }
    }
    onCollapse = (collapsed) => {
        this.setState({ collapsed })
    }

    render() {
        return(
            <Layout style={{ minHeight: '100vh'}}>
                <Sider
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >
                    <div className="logo"/>
                    <LeftMenu/>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0}}/>
                    <Content style={{ margin: '0 16px'}}>
                        <Breadcrumb>
                            <Breadcrumb.Item>用户管理</Breadcrumb.Item>
                            <Breadcrumb.Item>成绩管理</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360}}>
                            成绩管理
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center'}}>
                        React Antd Koa2 Design ©2017 Created by Happyu
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}

export default Home