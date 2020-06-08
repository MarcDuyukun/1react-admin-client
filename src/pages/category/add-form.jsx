import React, { Component } from "react";
import PropsTypes from 'prop-types'
import { Form, Input } from "antd";

class AddForm extends Component {
    static PropsTypes={
        setForm:PropsTypes.func.isRequired,
        categoryName:PropsTypes.string
    }

    componentDidMount(){
        this.props.setForm(this.props.form)
    }
  render() {

    const { getFieldDecorator } = this.props.form;
    const {categoryName} = this.props;
    return (
      <Form>
        <Form.Item>
          {getFieldDecorator("categoryName", {
            initialValue: categoryName || "",
            rules: [{ required: true, message: "分类名称必须输入！" }],
          })(<Input type="text" placeholder="请输入分类名称"></Input>)}
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(AddForm);
