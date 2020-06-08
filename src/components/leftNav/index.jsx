import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu, Icon } from "antd";
import menuList from "../../config/menuConfig";
import "./index.less";
import logo from "../../assets/images//adminimage.png";
import memoryUtils from "../../utils/memoryUtils";

const { SubMenu } = Menu;

class LeftNav extends Component {
  hasAuth = (item) => {
    const user = memoryUtils.user;
    const menus = user.role.menus;
    if (
      user.username === "admin" ||
      item.public ||
      menus.indexOf(item.key) !== -1
    ) {
      return true;
    } else if (item.children) {
      const cItem = item.children.find(
        (cItem) => menus.indexOf(cItem.key) !== -1
      );
      return !!cItem;
    }
    return false;
  };
  getMenuList = (menuList) => {
    // 得到当前请求的 path
    const path = this.props.location.pathname;
    return menuList.reduce((pre, item) => {
      if (this.hasAuth(item)) {
        if (!item.children) {
          pre.push(
            <Menu.Item key={item.key}>
              <Link to={item.key}>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </Link>
            </Menu.Item>
          );
        } else {
          pre.push(
            <SubMenu
              key={item.key}
              title={
                <span>
                  <Icon type={item.icon} />
                  <span>{item.title}</span>
                </span>
              }
            >
              {this.getMenuList(item.children)}
            </SubMenu>
          );
          if (item.children.find((cItem) => path.indexOf(cItem.key) === 0)) {
            this.openKey = item.key;
          }
        }
      }
      return pre;
    }, []);
  };
  // getMenuList = (menuList) => {
  //   const cCpath = this.props.location.pathname;
  //   return menuList.map((item, index) => {

  //     if (!item.children) {
  //       return (
  //         <Menu.Item key={item.key}>
  //           <Link to={{ pathname: item.key, query: item.title }}>
  //             <Icon type={item.icon} />
  //             <span>{item.title}</span>
  //           </Link>
  //         </Menu.Item>
  //       );
  //     }
  //     const cItem = item.children.find((cItem) => cItem.key === cCpath);
  //     if (cItem) {
  //       this.openKey = item.key;
  //     }
  //     return (
  //       <SubMenu
  //         key={item.key}
  //         title={
  //           <span>
  //             <Icon type={item.icon} />
  //             <span>{item.title}</span>
  //           </span>
  //         }
  //       >
  //         {this.getMenuList(item.children)}
  //       </SubMenu>
  //     );

  //   });
  // };
  UNSAFE_componentWillMount() {
    this.menuNodes = this.getMenuList(menuList);
  }

  render() {
    const selectPath = this.props.location.pathname;
    return (
      <div className="left-nav">
        <Link className="left-nav-link" to="/home">
          <img src={logo} alt="" />
          <p>后台管理</p>
        </Link>
        <Menu
          selectedKeys={[selectPath]}
          defaultOpenKeys={[this.openKey]}
          mode="inline"
          theme="dark"
          //   inlineCollapsed={this.state.collapsed}
        >
          {/* 遍历循环 开始*/}
          {this.menuNodes}

          {/* 遍历循环 结束*/}

          {/* <Menu.Item key="/home">
            <Link to="/home">
              <Icon type="home" />
              <span>首页</span>
            </Link>
          </Menu.Item>
          <SubMenu
            key="/products"
            title={
              <span>
                <Icon type="mail" />
                <span>商品</span>
              </span>
            }
          >
            <Menu.Item key="/category">
              <Link to="/category">
                <Icon type="folder-open" />
                <span>品类管理</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/product">
              <Link to="/product">
                <Icon type="filter" />
                <span>商品管理</span>
              </Link>
            </Menu.Item>
          </SubMenu> */}
        </Menu>
      </div>
    );
  }
}

export default withRouter(LeftNav);
