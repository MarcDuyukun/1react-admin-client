import React, { Component } from 'react'
import { Modal } from 'antd'
import {withRouter} from 'react-router-dom'
import LinkButton from '../../components/linkButton'
import storageUtils from '../../utils/storageUtils'
import {formateDate} from '../../utils/dateUtils'
import menuList from '../../config/menuConfig'
import {reqWeather} from '../../api/index'
import './index.less'
import weatherimg from '../../assets/images//weather.jpeg'


 class Header extends Component {
    constructor(props){
        super(props);
        this.state={
            currentTime: formateDate(Date.now()),
            city:'',
            weather:'',
            temperature:''
        }
    }
    logout=()=>{
     Modal.confirm({
         title:'确认退出吗？',
         content:'退出后需要重新登录哦！！',
         okText: '确定',
         okType: 'danger',
         cancelText: '取消',
         onOk:()=>{
            storageUtils.removeUser();
            this.props.history.push('/login')
         },
         onCancel(){

         }
     })
    }

    getWeather=async ()=>{
       const {city,weather,temperature}=await reqWeather('深圳');
       this.setState({
           city,
           weather,
           temperature
       })
    }
    // getTitle=()=>{
    //     // const path = this.props.location.pathname;
    //     // menuList.forEach(item =>{

    //     // })
    //     return this.props.location.state.name
    // }
    componentDidMount(){
        this.timerId=setInterval(() => {
            this.setState({
                currentTime:formateDate(Date.now())
            })
        }, 1000);
        //发请求jsonp获取天气温度信息
        this.getWeather()
    }
    componentWillUnmount(){
        clearInterval(this.timerId)
    }
    
    UNSAFE_componentWillMount(){
        this.title=this.props.location.query || '首页';
        clearInterval(this.timerId)
    }
    // componentDidUpdate(){
    //     this.title=this.props.location.query || '首页'
    // }
    UNSAFE_componentWillReceiveProps(nextProps) {
        // this.props中的值是旧值
        // nextProps中的值是新值
    const { location: oldValue } = this.props;
    const { location: newValue } = nextProps;
    if (newValue !== oldValue) {
            // TODO...
            this.title=nextProps.location.query
    }
}
    render() {
        // this.title = this.props.location.query.name || '首页'
        const { currentTime ,weather, city, temperature} = this.state;
        return (
            <div className='header'>
                <div className="header-top">
                    欢迎回来，{storageUtils.getUser().username}
                    <LinkButton  onClick={this.logout}> 退出</LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{this.title?this.title:'首页'}</div>
                    <div className="header-bottom-right">
                       <span>{currentTime}</span>
                       <img src={weatherimg} alt=""/>
                       <span>{city}-{temperature}℃-{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)