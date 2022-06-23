import React, { Component } from 'react'
import './index.css'
import PubSub from 'pubsub-js'
export default class List extends Component {
    // state放在最能直接使用它的地方
    state = {
        users:[],
        isFirst:true,
        isLoading:false,
        errorMsg:''
    }

    render() {
        const {users,isFirst,isLoading,errorMsg} = this.state
        return (
            <div className="row">
                {
                isFirst ? <h1>欢迎来到这里</h1> : isLoading ? <h1>Loading.....</h1> : errorMsg ? <h1>{errorMsg}</h1> 
                : users.map((userObj)=>{
                    return (
                        <div className="card" key={userObj.id}>
                        <a href= {userObj.html_url} target="_blank">
                            <img src={userObj.avatar_url} style={{width:'100px'}}/>
                        </a>
                        <p className="card-text">{userObj.login}</p>
                        </div>
                    )
                }) 
                }
        </div>
        )
    }
    //组件挂载位完成时，进行消息的订阅
    componentDidMount(){
        this.token = PubSub.subscribe('caseA',(_,data)=>{
            this.setState(data)
        })
    }
    // 组件即将销毁时，应该撤销原有的订阅
    componentWillUnmount(){
        PubSub.unsubscribe(this.token)
    }
}
