/**
 * Created by happyu on 2017/10/13.
 */
import React from 'react'
import { Modal, Form } from 'antd'

class EditUser extends React.PureComponent {
    render() {
        const { title, visible, confirmLoading, onOk, onCancel } = this.props;
        return(
            <Modal
                title={title}
                visible={visible}
                confirmLoading={confirmLoading}
                onOk={onOk}
                onCancel={onCancel}
            >
                修改用户信息
            </Modal>
        )
    }
}

export default EditUser