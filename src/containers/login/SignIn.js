/**
 * Created by happyu on 2017/10/9.
 */
import 'babel-polyfill';
import React from 'react'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import { signInApi } from '../../api/login/signIn'
const FormItem = Form.Item;
import './sigin.less'
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
            let result = await signInApi(values);
            if(result && result.success) {
                message.success("登陆成功！");
                this.props.history.push('/home')
            } else {
                message.error(result.message)
            }
        } else {
            message.error('系统繁忙, 稍后再试! ')
        }
    };

    // 获取用户输入信息
    getFormValues = () => {
        return new Promise((resolve, reject) => {
            this.props.form.validateFields((err, values) => {
                if(!err) {
                    console.log('Received values of form: ', values);
                    resolve(values)
                }
            })
        })
    };

    render() {
        console.log(this.props)
        const { getFieldDecorator } = this.props.form;
        return(
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
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13}}/>} placeholder="Password"/>
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
                    Or <a href=""><Link to="/register">register now!</Link></a>
                </FormItem>
            </Form>
        )
    }
}

export default withRouter(Form.create()(SignIn))