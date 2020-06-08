import React, { Component } from "react";
import { Card, Select, Input, Button, Icon, Table, message } from "antd";
import LinkButton from "../../components/linkButton";
import {reqProducts,reqSearchProducts,reqUpdateStatus} from '../../api'
import {PAGE_SIZE} from '../../utils/Constants'
import memoryUtils from '../../utils/memoryUtils';

const Option = Select.Option;
export default class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      products: [],
      total:0,
      searchType:'productName',
      searchName:''
    };
  }
  updateStatus=async(status,ProductId)=>{
    status = status === 1 ? 2 :1
    const result = await reqUpdateStatus(ProductId,status)
    if(result.status === 0){
      message.success('更新商品状态成功')
      //获取当前页显示
      this.getProducts(this.pageNum);
    }
  }
  initColumns = () => {
    this.columns = [
      {
        title: "商品id",
        dataIndex: "_id",
      },
      {
        title: "商品名称",
        dataIndex: "name",
      },
      {
        title: "商品描述",
        width:270,
        dataIndex: "desc",
      },
      {
        title: "商品价格",
        dataIndex: "price",
        render: (price) => "¥" + price,
      },
      {
        title: "商品状态",
        // dataIndex: "status",
        render: ({status,_id}) => {
          let btnText = "下架";
          let text = "在售";
          if (status === 2) {
            btnText = "上架";
            text = "已下架";
          }
          return (
            <span>
              <button onClick={()=>{this.updateStatus(status,_id)}}>{btnText}</button>
              <span>{text}</span>
            </span>
          );
        },
      },
      {
        title: "商品操作",
        render: (product) => {
          return (
            <span>
              <LinkButton onClick={()=> {
                memoryUtils.product = product  
                this.props.history.push('/product/detail')}}>详情</LinkButton>
              <LinkButton onClick={()=> {
                memoryUtils.product = product  
                this.props.history.push('/product/addupdate')}}>修改</LinkButton>
            </span>
          );
        },
      },
    ];
  };
  //获取分页列表 可能带搜索
  getProducts=async(pageNum)=>{
    this.pageNum=pageNum
        const {searchName,searchType }= this.state;
        let result
    if(!searchName){

          result = await reqProducts(pageNum,PAGE_SIZE)
    }else{
         result = await reqSearchProducts({pageNum,pageSize:PAGE_SIZE,searchName,searchType})
    }
    if(result.status===0){
        const {total ,list}= result.data;
        this.setState({
            total,
            products:list
        })
    }
  }

  UNSAFE_componentWillMount() {
    this.initColumns();
  }
  componentDidMount(){
      this.getProducts(1)
  }
  render() {
    const title = (
      <span>
        <Select style={{ width: 130 }} value={this.state.searchType} 
        onChange={(value)=>{this.setState({searchType:value})}}>
          <Option value="productName">按名称搜索</Option>
          <Option value="productDesc">按描述搜索</Option>
        </Select>
        <Input
          style={{ width: 180, margin: "0 10px" }}
          placeholder="请输入关键字"
          value={this.state.searchName}
          onChange={(e)=>{this.setState({searchName:e.target.value})}}
        />
        <Button type="primary" onClick={()=>this.getProducts(1)}>搜搜</Button>
      </span>
    );
    const extra = (
      <Button onClick={()=>{
        memoryUtils.product={}
        this.props.history.push('/product/addupdate')
      }} type="primary">
        <Icon type="plus"></Icon>
        添加商品
      </Button>
    );
    return (
      <Card title={title} extra={extra}>
        <Table
          loading={this.state.loading}
          columns={this.columns}
          dataSource={this.state.products}
          current={this.pageNum}
          hoverable={true}
          bordered
          pagination={{total:this.state.total, defaultPageSize:PAGE_SIZE, showQuickJumper: true ,onChange:this.getProducts}}
          rowKey="_id"
        />
      </Card>
    );
  }
}
