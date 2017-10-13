/**
 * Created by happyu on 2017/10/10.
 */
import React from 'react'
import { Layout, Breadcrumb, Menu, message } from 'antd'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Logo from '../../component/logo/'
import Header from '../../component/header/'
import menuConfig from '../../config/menu'
import renderMenu from '../../component/menu/'
import { logoutRequest, logoutSuccess, logoutFailure } from '../../actions/userAction'
import { logoutApi } from '../../api/logout/logout'
import './index.less'
const { Sider, Content, Footer } = Layout;
class Home extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false, // 当前收起状态，默认false, 表示不收起
        };
        this.logout = this.logout.bind(this)
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
    };

    async logout() {
        this.props.logoutRequest(); // 请求登出
        let result = await logoutApi(); // 调后端清除session
        if(result && result.success) {
            this.props.logoutSuccess(); // 登出成功
            this.props.history.push('/')
        } else {
            message.info(result.message);
            this.props.logoutFailure({msg: result.message, status: result.code});
        }
    };

    render() {
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
                    <Header toggle={this.toggle} collapsed={this.state.collapsed}
                            user={localStorage.getItem('userName')}
                            logout={this.logout}
                    />
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

function mapStateToProps(state) {
    console.log(state);
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        logoutRequest: () => { dispatch(logoutRequest()) },
        logoutSuccess: () => { dispatch(logoutSuccess()) },
        logoutFailure: (data) => { dispatch(logoutFailure(data)) }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home))