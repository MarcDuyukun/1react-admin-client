import React, { Component } from "react";

import { Redirect } from "react-router-dom";
import { Card, Icon, Form, Input, Select, Button, message } from "antd";
import LinkButton from "../../components/linkButton";
import { reqCategorys,reqAddUpdateProduct } from "../../api";
import memoryUtils from "../../utils/memoryUtils";
import PictureWall from "./pictureWall";
import RichTextEdit from "./richTextEdit";

class addUpdate extends Component {
  constructor(props) {
    super(props);
    this.pwRef = React.createRef();
    this.editorRef = React.createRef();
    this.state = {
      categorys: [],
    };
  }
  getCategorys = async () => {
    const result = await reqCategorys();
    if (result.status === 0) {
      const categorys = result.data;
      this.setState({ categorys });
    }
  };
  validatorPrice = (rule, value, callback) => {
    if (value * 1 <= 0) {
      callback("价格必须大于0");
    } else {
      callback();
    }
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const { name, desc, price, categoryId } = values;
        console.log(values);
        const imgs = this.pwRef.current.getImgs();
        console.log(imgs);
        const detail = this.editorRef.current.getDetail()
        console.log(detail)
        //发送请求
        const product = {...values ,imgs,detail}
        if(this.isUpdate){
            product._id=this.product._id
        }
        const result = await reqAddUpdateProduct(product)
        if(result.status===0){
            message.success(`${this.isUpdate?'修改':'添加'}商品成功`)
            this.props.history.push('/product')
        }else{
            message.error(result.msg)
        }
      }
    });
  };
  UNSAFE_componentWillMount() {
    this.product = memoryUtils.product;
    this.isUpdate = this.product._id ? true : false;
  }
  componentDidMount() {
    this.getCategorys();
  }
  render() {
    const { categorys } = this.state;
    const { product, isUpdate } = this;
    const { getFieldDecorator } = this.props.form;

    const title = (
      <span>
        <LinkButton onClick={() => this.props.history.goBack()}>
          <Icon type="arrow-left" />
        </LinkButton>
        <span>{isUpdate ? "修改商品" : "添加商品"}</span>
      </span>
    );
    const formLaypout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 8 },
    };
    return (
      <Card title={title} className="detail">
        <Form {...formLaypout} onSubmit={this.handleSubmit}>
          <Form.Item label="商品名称">
            {getFieldDecorator("name", {
              initialValue: product.name,
              rules: [{ required: true, message: " 商品名称不能为空！" }],
            })(<Input placeholder="商品名称" />)}
          </Form.Item>

          <Form.Item label="商品描述">
            {getFieldDecorator("desc", {
              initialValue: product.desc,
              rules: [{ required: true, message: " 商品描述不能为空！" }],
            })(<Input placeholder="商品描述" />)}
          </Form.Item>

          <Form.Item label="商品价格">
            {getFieldDecorator("price", {
              initialValue: product.price,
              rules: [
                { required: true, message: " 商品价格不能为空！" },
                { validator: this.validatorPrice },
              ],
            })(<Input type="number" placeholder="商品价格" addonAfter="元" />)}
          </Form.Item>

          <Form.Item label="商品分类">
            {getFieldDecorator("categoryId", {
              initialValue: product.categoryId || "",
              rules: [{ required: true, message: " 商品分类不能为空！" }],
            })(
              <Select>
                <Select.Option value="">未选择</Select.Option>
                {categorys.map((c) => (
                  <Select.Option value={c._id} key={c._id}>
                    {c.name}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="商品图片">
            <PictureWall ref={this.pwRef} imgs={product.imgs} />
          </Form.Item>
          <Form.Item label="商品详情" wrapperCol={{ span: 16 }}>
            <RichTextEdit ref={this.editorRef} detail={product.detail} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

export default Form.create()(addUpdate);
