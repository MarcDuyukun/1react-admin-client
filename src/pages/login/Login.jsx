import React, { Component } from "react";
import {Redirect} from 'react-router-dom'
import { Form, Input, Button ,Icon, message} from "antd";
import {reqLogin} from '../../api'
import storageUtils from '../../utils/storageUtils'

import "./Login.less";
import adminimage from "../../assets/images/adminimage.png";

 class Login extends Component {


  handleSubmit=(e)=>{
    //阻止表单默认提交事件
     e.preventDefault();
    // 取出输入对象
    // const form = this.props.form;
    // const formValue = form.getFieldsValue();
    // console.log(formValue);
    // 表单所有input校验
    this.props.form.validateFields(async(err,values) => {
      if(!err){
        message.success('验证成功！')
        console.log(values);
        const result =await reqLogin(values.username,values.password);
        if(result.status===0){
          //跳转路由到admin
          const user = result.data
          storageUtils.saveUser(user)
           this.props.history.push('/');
           message.success('登陆成功！！')
           
        }else{
          message.error(result.msg)
        }
        
      }else{
        message.error('用户名密码不符合规范')
      }

    })

  }

  validatePwd = (rule,value,callback)=>{
       value=value.trim();
       if(!value){
         callback('密码不能为空')
       }else if(value.length<4){
         callback('密码长度不能小于4位')
       }else if(value.length>12){
         callback('密码长度不能大于12位')
       }else if(!/^[a-zA-Z0-9_]+$/ig.test(value)){
         callback('密码必须是下划线字母数字开头组成')
       }else{
         callback()
       }
  }



  render(){

      //读取localstorage
      const user = storageUtils.getUser();
      if(user._id){
            return <Redirect to='/' />
      }

    const { getFieldDecorator } = this.props.form;


    return (
      <div className="login">
        <div className="login-header">
          <img src={adminimage} alt="icon" />
          <p>后台管理系统</p>
        </div>
        <div className="login-content">
          <h1>登 录</h1>


      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            initialValue:'',
            rules: [
              { required: true, whitespace:true, message: '用户名不可为空' },
              {min:4,message:'用户名不能小于4位'},
              {max:12,message:'用户名不能大于12位'},
              {pattern:/^[a-zA-Z0-9_]+$/ig,message:'用户名必须是下划线字母数字开头组成！'},
          ],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="请输入用户名"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            initialValue:'',
            rules: [{ validator:this.validatePwd}],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="请输入密码"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
        </Form.Item>
      </Form>
        </div>
      </div>
    );
  }
}

const WrapperForm =Form.create()(Login)

export default WrapperForm; //<Form(Login)>包装form组件 生成新组件
