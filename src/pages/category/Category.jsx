import React, { Component } from "react";
import { Card, Button, Icon, Table, message, Modal } from "antd";
import "./Category.less";
import LinkButton from "../../components/linkButton";
import AddForm from "./add-form";
import { reqCategorys, reqAddCategorys, reqUpadateCategorys } from "../../api";

//   const data = [
//     {
//       _id: '1dddd113x',
//       name: '家用电器',
//     },
//     {
//       _id: '1dddd113x2',
//       name: '清洁用品',
//     },
//     {
//       _id: '1ddd2d113x',
//       name: '办公用品',
//     },
//     {
//       _id: '1dddd112113x',
//       name: '男装',
//     },
//     {
//       _id: '1ddd111d113x',
//       name: '女装',
//     },
//     {
//       _id: '1d44ddd113x',
//       name: '童装',
//     },
//     {
//       _id: '1ddd221d113x',
//       name: '汽车配件',
//     },
//     {
//       _id: '1dddd11233x',
//       name: '药品',
//     },
//   ];
export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categorys: [],
      loading: false,
      showStatus: 0, //0代表不显示 1代表显示添加2表示修改
    };
  }

  getCategorys = async () => {
    this.setState({
      loading: true,
    });
    const result = await reqCategorys();
    this.setState({
      loading: false,
    });
    if (result.status === 0) {
      this.setState({
        categorys: result.data,
      });
    } else {
      message.error("获取列表失败");
    }
  };
  handleOk = () => {
    this.form.validateFields(async (err, values) => {
      if (!err) {
          this.form.resetFields();
        const { categoryName } = values;
        const { showStatus} = this.state;
        let result
        if(showStatus ===1){
              result = await reqAddCategorys(categoryName);

        }else{
            const categoryId = this.category._id
            // console.log(categoryName);
            
            result = await reqUpadateCategorys({categoryId,categoryName})
        }
        const action = showStatus===1?'添加':'修改'
        this.setState({ showStatus: 0 });
        if (result.status === 0) {
            this.getCategorys();
          message.success(action+"分类成功！");
        } else {
          message.error(action+"分类失败");
        }
      }
    });
  };
  handleCancel = () => {
    this.form.resetFields();
    this.setState({
      showStatus: 0,
    });
  };

  UNSAFE_componentWillMount() {
    this.columns = [
      {
        title: "分类id",
        dataIndex: "_id",
        //   render: text => <a>{text}</a>,
      },
      {
        title: "分类名称",
        dataIndex: "name",
        //   render: text => <a>{text}</a>,
        width: 500,
      },
      {
        title: "分类操作",
        //   dataIndex: 'name',
        render: (category) => (
          <LinkButton
            onClick={() => {
              this.category = category
              this.setState({ showStatus: 2 })
            }}
          >
            修改分类
          </LinkButton>
        ),
      },
    ];
  }
  componentDidMount() {
    this.getCategorys();
  }

  render() {
      const category = this.category || {}
    const { categorys, showStatus } = this.state;
    const extra = (
      <Button type="primary" onClick={() =>{ this.category={} ;this.setState({ showStatus: 1 })}}>
        <Icon type="plus"></Icon>
        添加
      </Button>
    );
    return (
      <Card className="category" extra={extra}>
        <Table
          loading={this.state.loading}
          columns={this.columns}
          dataSource={categorys}
          bordered
          //   title={() => "Header"}
          //   footer={() => "Footer"}
          pagination={{ defaultPageSize: 4, showQuickJumper: true }}
          rowKey="_id"
        />
        <Modal
          title={showStatus === 1 ? "添加分类" : "修改分类"}
          visible={showStatus !== 0}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <AddForm setForm={(form) => (this.form = form)} categoryName={category.name} />
        </Modal>
      </Card>
    );
  }
}
