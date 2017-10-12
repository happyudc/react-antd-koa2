/**
 * Created by happyu on 2017/10/11.
 */
import React from 'react'
import { Table, Popconfirm, message, Modal } from 'antd'
import { userPageApi, userDeleteApi } from '../../api/user/userList'

class UserList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true,
            pagination: {
                current: 1,
                defaultCurrent: 1,
                total:0,
                pageSize: 5
            },
            visible: false, // 控制修改模态框显示隐藏
            confirmLoading: false
        };
        this.getUserList = this.getUserList.bind(this);
        this.handleUpdateOk = this.handleUpdateOk.bind(this);
        this.handleUpdateCancel = this.handleUpdateCancel.bind(this)
    }
    componentDidMount() {
        const { current, pageSize } = this.state.pagination;
        this.getUserList(Math.ceil((current - 1) * pageSize), pageSize)
    }

    async getUserList(begin, offset) {
        let result = await userPageApi(begin, offset);
        if(result && result.success) {
            this.setState({
                data: result.data,
                pagination: {
                    current: this.state.pagination.current,
                    defaultCurrent: 1,
                    total:result.total,
                    pageSize: this.state.pagination.pageSize
                }
            })
        }
    }


    handlePaginationChange = (pagination, filter, sorter) => {
        const { current, pageSize, total } = pagination;
        this.setState({ pagination: {current: current,defaultCurrent: 1,total: total,pageSize: pageSize} });
        this.getUserList(Math.ceil((current - 1) * pageSize), pageSize)
    };

    async handleDeleteConfirm(id) {
        let result = await userDeleteApi(id);
        if(result && result.success) {
            message.success('删除用户成功！');
            this.getUserList(1,5)
        }else {
            message.error(result.message)
        }

    };

    handleEditUser(id) {
        console.log(id);
        this.setState({
            visible: true,
        })
    };

    handleUpdateOk() {
        this.setState({ confirmLoading: true })
    };
    handleUpdateCancel() {
        this.setState({ visible: false })
    }

    render() {
        const columns = [{
            title: 'Id',
            dataIndex: 'id',
            key: 'id'
        }, {
            title: 'Name',
            dataIndex: 'username',
            key: 'name'
        }, {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        }, {
            title: 'CreateTime',
            dataIndex: 'create_time',
            key: 'create_time',
        }, {
            title: 'Action',
            dataIndex: 'action',
            render: (text, record) => (
                <span>
            <a href="#">Action-{record.username}</a>
            <span className="ant-divider"></span>
            <Popconfirm title="确定要删除吗？"
                        onConfirm={this.handleDeleteConfirm.bind(this,record.id)} //  利用bind()第二个参数实现传参
                        okText="Yes" cancelText="No"
            >
                <a href="#">Delete</a>
            </Popconfirm>
            <span className="ant-divider"></span>
            <a href="#" onClick={this.handleEditUser.bind(this, record.id)}>edit</a>
        </span>
            ),
        }];
        return(
            <div>
                <Table columns={columns} dataSource={this.state.data}
                       pagination={this.state.pagination} onChange={this.handlePaginationChange} loading={false}/>
                <Modal
                    title="修改用户信息"
                    visible={this.state.visible}
                    confirmLoading={this.state.confirmLoading}
                    onOk={this.handleUpdateOk}
                    onCancel={this.handleUpdateCancel}
                >
                    修改用户信息
                </Modal>
            </div>
        )
    }
}

export default UserList