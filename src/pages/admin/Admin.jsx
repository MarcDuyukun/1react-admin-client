import React, { Component } from 'react'
import {Redirect , Switch, Route} from 'react-router-dom'
import { Layout } from 'antd';
import storageUtils from '../../utils/storageUtils'
import LeftNav from '../../components/leftNav'
import Header from '../../components/header'
import Home from '../home/Home'
import Category from '../category/Category'
// import Charts from '../charts/Charts'
import Product from '../product/Product'
import Role from '../role/Role'
import User from '../user/User'
import Line from '../line/Line'
import Pie from '../pie/Pie'
import Bar from '../bar/Bar'

const { Footer, Sider, Content } = Layout;
 class Admin extends Component {
    render() {

        //读取localstorage
        const user = storageUtils.getUser()
        if(!user._id){
              return <Redirect to='/login' />
        }
        return (
            <Layout style={{height:'100%'}}>
            <Sider> <LeftNav /> </Sider>
            <Layout>
              <Header />
              <Content style={{background:'#fff',margin:'20px'}}>
                  <Switch>
                      <Route path='/home' component={Home} />
                      <Route path='/category' component={Category} />
                      <Route path='/product' component={Product} />
                      <Route path='/role' component={Role} />
                      <Route path='/user' component={User} />
                      <Route path='/charts/bar' component={Bar} />
                      <Route path='/charts/pie' component={Pie} />
                      <Route path='/charts/line' component={Line} />
                      <Redirect to='/home' />
                  </Switch>
              </Content>
              <Footer style={{textAlign:'center',color:'#666'}} >使用谷歌浏览器获得更好体验</Footer>
            </Layout>
          </Layout>
        )
    }
}

export default Admin
