/**
 * Created by happyu on 2017/10/9.
 */
import React from 'react'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { signInApi } from '../../api/login/signIn'
import { loginRequest, loginSuccess, loginFailure } from '../../actions/userAction'
import './sigin.less'
const FormItem = Form.Item;
class SignIn extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    // 请求后端，登陆验证
    async handleSubmit(e) {
        e.preventDefault();
        let values = await this.getFormValues();
        if(values) {
            this.props.loginRequest(values); // 请求登陆认证
            let result = await signInApi(values);
            if(result && result.success) {
                message.success("登陆成功！");
                this.props.loginSuccess('qwertyu', values.userName === 'admin' ? true : false, values.userName); // 认证成功
                this.props.history.push('/index')
            } else {
                message.error(result.message);
                this.props.loginFailure({msg: result.message, status: '404'})
            }
        } else {
            message.error('系统繁忙, 稍后再试! ');
            this.props.loginFailure({msg: '系统繁忙, 稍后再试!', status: '500'})
        }
    };

    // 获取用户输入信息
    getFormValues = () => {
        return new Promise((resolve, reject) => {
            this.props.form.validateFields((err, values) => {
                if(!err) {
                    resolve(values)
                }
            })
        })
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <div  style={{ height: '100vh', background: 'rgba(0, 0, 0, .5)' }}>
                <div className="form-container">
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{required: true, message: 'Please input your username!'}],
                            })(
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }}/>} placeholder="Username"/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: 'Place input your password!'}],
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13}}/>} type="password" placeholder="Password"/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>Remember me</Checkbox>
                            )}
                            <a className="login-form-forget">Forget password</a>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                            Or <Link to="/register">register now!</Link>
                        </FormItem>
                    </Form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.userReducer.authenticated,
        isAuthenticating: state.userReducer.isAuthenticating,
        isAdmin: state.userReducer.isAdmin
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loginRequest: (data) => { dispatch(loginRequest(data)) },
        loginSuccess: (token, isAdmin, userName) => { dispatch(loginSuccess(token, isAdmin, userName))},
        loginFailure: (data) => { dispatch(loginFailure(data))}
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Form.create()(SignIn)))