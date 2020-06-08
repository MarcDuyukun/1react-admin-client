import React,{ Component } from 'react';
// import {Button , message } from 'antd';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Login from './pages/login/Login.jsx'
import Admin from './pages/admin/Admin.jsx'

class App extends Component{

  render(){
    return (
      //  <div>
         <BrowserRouter>
           <Switch>
             <Route path='/login' component={Login} ></Route>
             <Route path='/' component={Admin} ></Route>
           </Switch>
         </BrowserRouter>
      //    {/* <div className="app">你好</div>
      //  <Button type='primary' onClick={this.handleClick} >点击我</Button> */}
      //  {/* </div> */}
    )
  }
}

export default App;
