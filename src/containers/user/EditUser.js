/**
 * Created by happyu on 2017/10/13.
 */
import React from 'react'
import { Modal, Form, Input, message } from 'antd'
import { userUpdateAPi } from '../../api/user/user'
const FormItem = Form.Item;
class EditUser extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            confirmLoading: false,
            visible: this.props.visible,
            user: this.props.user
        };
        this.handleSubmit = this.handleSubmit.bind(this)
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

    async handleSubmit(e){
        e.preventDefault();
        let user = null;
        this.props.form.validateFields(function(err, values){
            if(!err) {
                user = values;
            } else {
                return
            }
        });
        let updateUser = {
            id: this.state.user.id,
            username: user.username,
            password: user.password,
            email: user.email,
            create_time: this.state.create_time
        };
        let result = await userUpdateAPi(updateUser);
        if(result && result.success) {
            this.setState({ confirmLoading: false, visible: false });
            message.success("修改成功!");
            this.props.handleUpdateCancel(); // 关闭修改页面
            this.props.getUserList(0,5) // 修改成功后重新查询
        } else {
            message.error(result.message)
        }
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