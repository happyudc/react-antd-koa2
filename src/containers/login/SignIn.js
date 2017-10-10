/**
 * Created by happyu on 2017/10/9.
 */
import 'babel-polyfill';
import React from 'react'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd'
import { signInApi } from '../../api/signIn'
const FormItem = Form.Item;
import './sigin.less'
class SignIn extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    async handleSubmit(e) {
        e.preventDefault();
        let values = await this.getFormValues();
        if(values) {
            let result = await signInApi(values);
            if(result && result.success) {
                message.success("登陆成功！")
            } else {
                message.error(result.message)
            }
        } else {
            message.error('系统繁忙, 稍后再试! ')
        }
    };

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
                    Or <a href="">register now!</a>
                </FormItem>
            </Form>
        )
    }
}

export default Form.create()(SignIn)