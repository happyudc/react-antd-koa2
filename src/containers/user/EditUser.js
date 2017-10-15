/**
 * Created by happyu on 2017/10/13.
 */
import React from 'react'
import { Modal, Form, Input } from 'antd'
const FormItem = Form.Item;
class EditUser extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            confirmLoading: false,
            user: this.props.user
        }
    }

    componentDidMount() {
        const { setFieldsValue } = this.props.form;
        const { user } = this.state;
        // 初始化表单数据
        setFieldsValue({
            username: user.username,
            password: user.password,
            email: user.email
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(!err) {
                console.log("values: ",values)
            }
        })
    };

    handleUpdateOk = (e) => {
        this.setState({ confirmLoading: true });
        this.handleSubmit(e)
    };

    render() {
        const { title, visible, handleUpdateCancel, form: { getFieldDecorator } } = this.props;
        return(
            <Modal
                title={title}
                visible={visible}
                confirmLoading={this.state.confirmLoading}
                onOk={this.handleUpdateOk}
                onCancel={handleUpdateCancel}
            >
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        label="用户名"
                    >
                        {getFieldDecorator('username', {
                            rules: [{require: true, message: '用户名不能为空!'}]
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        label="密码"
                    >
                        {getFieldDecorator('password', {
                            rules: [{require: true, message: '密码不能为空！'}]
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        label="E-mail"
                    >
                        {getFieldDecorator('email', {
                            rules: [{require: true, message: 'E-mail不能为空！'}]
                        })(
                            <Input/>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}

export default Form.create()(EditUser)