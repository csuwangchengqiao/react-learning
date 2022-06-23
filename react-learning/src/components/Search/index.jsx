import React, { Component } from 'react'
import axios from 'axios'
import PubSub from 'pubsub-js'
export default class Search extends Component {
  // 创建ref的一种方式，使用React.create()创建
  keyWordContainer = React.createRef()

  search = ()=>{
    const {value} = this.keyWordContainer.current
    if(!value.trim()) return alert("输入不能为空")
    // axios返回的是promise对象，成功时得到response,失败时返回error
    // 使用Pubsub进行消息订阅与发布，实现任意组件之间的通信
    PubSub.publish('caseA',{isFirst:false,isLoading:true})
    //q之后使用模板字符串查询实实际输入的用户数据
    axios.get(`https://api.github.com/search/users?q=${value}`)
    .then(
      // 请求成功后通知app存储用户数据,同时将isLoading改为false
      response => {
        const {items} = response.data
        PubSub.publish('caseA',{users:items,isLoading:false})
      },
      // 注意此处的error是一个对象，真正的错误信息是error.message
      // 发生错误时，将错误信息error.message返回给App,同时将isLoading改为false
      error =>{
        PubSub.publish('caseA',{errorMsg:error.message,isLoading:false})
      }
    )
  }
  render() {
    return (
        <section className="jumbotron">
            <h3 className="jumbotron-heading">Github用户搜索</h3>
            <div>
                <input type="text" ref={this.keyWordContainer} placeholder="输入你要搜索的名字"/>&nbsp;
                <button onClick={this.search}>搜索</button>
            </div>
        </section>
    )
  }
}
