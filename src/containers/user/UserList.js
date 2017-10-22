/**
 * Created by happyu on 2017/10/11.
 */
import React from 'react'
import { Table, Popconfirm, message, Button } from 'antd'
import { userPageApi, userDeleteApi } from '../../api/user/user'
import dateFormat from '../../utils/dateFormat'
import EditUser from './EditUser'
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
            updateData: {}, // 当前修改的用户信息
        };
        this.getUserList = this.getUserList.bind(this);
    }
    componentDidMount() {
        const { current, pageSize } = this.state.pagination;
        this.getUserList(Math.ceil((current - 1) * pageSize), pageSize)
    }

    async getUserList(begin, offset) {
        let result = await userPageApi(begin, offset);
        if(result && result.success) {
            this.setState({
                data: this.handleTableDataSource(result.data),
                pagination: {
                    current: this.state.pagination.current,
                    defaultCurrent: 1,
                    total:result.total,
                    pageSize: this.state.pagination.pageSize
                }
            })
        }
    }

    // 为Table中的添加key,防止出现警告
    handleTableDataSource(data) {
        let dataSource = [];
        Array.isArray(data) && data.length > 0 && data.map((user, index) =>{
            user.key = index;
            user.create_time = dateFormat(new Date(user.create_time), 'yyyy-MM-dd hh:mm:ss')
            dataSource.push(user)
        });
        return dataSource
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
            this.getUserList(0,5)
        }else {
            message.error(result.message)
        }

    };

    handleEditUser(id) {
        this.setState({
            visible: true,
        });
        this.state.data.filter((user) => {
            return user.id === id ? this.setState({updateData: user}) : null
        })
    };

    handleUpdateCancel = () => {
        this.setState({
            visible: false,
        });
    };

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
            title: 'Password',
            dataIndex: 'password',
            key: 'password'
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
                   {/* <a href="#">Action-{record.username}</a>
                    <span className="ant-divider"></span>*/}
                    <Popconfirm title="确定要删除吗？"
                                onConfirm={this.handleDeleteConfirm.bind(this,record.id)} //  利用bind()第二个参数实现传参
                                okText="Yes" cancelText="No"
                    >
                        <Button icon="delete">删除</Button>
                    </Popconfirm>
                    <span className="ant-divider"></span>
                    <Button icon="edit" onClick={this.handleEditUser.bind(this, record.id)}>修改</Button>
                </span>
            ),
        }];
        return(
            <div>
                <Table columns={columns} dataSource={this.state.data}
                       pagination={this.state.pagination} onChange={this.handlePaginationChange} loading={false}/>
                {this.state.visible
                    ? <EditUser title="修改用户信息"
                                getUserList={this.getUserList}
                                handleUpdateCancel={this.handleUpdateCancel}
                                user={this.state.updateData}
                                visible={this.state.visible}/>
                    : ''
                }
            </div>
        )
    }
}

export default UserList