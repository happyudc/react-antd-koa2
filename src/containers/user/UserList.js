/**
 * Created by happyu on 2017/10/11.
 */
import React from 'react'
import { Table, Popconfirm, message } from 'antd'
import { userPageApi } from '../../api/user/userList'

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
            }
        };
        this.getUserList = this.getUserList.bind(this)
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

    handleDeleteConfirm = (id) => {
        console.log(id);
        message.success('Click on Yes');
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
            <a href="#">edit</a>
        </span>
            ),
        }];
        return(
            <Table columns={columns} dataSource={this.state.data}
                   pagination={this.state.pagination} onChange={this.handlePaginationChange} loading={false}/>
        )
    }
}

export default UserList