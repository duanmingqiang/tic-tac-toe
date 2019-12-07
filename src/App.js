import React from 'react';
import ReactDOM from 'react-dom';
import './someStyle.css'

class App extends React.Component{
    constructor() {
        super()
        this.state = {
            history:new Array(9).fill(null),
            isFirstMan: true,
        }
    }
    checkWinner() {
        let data = [
            [1,2,3],
            [4,5,6],
            [7,8,9],
            [1,4,7],
            [2,5,8],
            [3,6,9],
            [3,5,7],
            [1,5,9]
        ]
        let winner = false
        data.forEach(item => {
            if (this.state.history[item[0]] && 
                (this.state.history[item[0]] === this.state.history[item[1]]) && 
                (this.state.history[item[1]] && this.state.history[item[2]])
                ) {
                winner = item
            }
        })
        return winner
    }
    // 处理重置事件
    handleReset() {
        this.setState({
            history: new Array(9).fill(null),
            isFirstMan: true
        })
    }
    // 处理格子点击事件
    handleClick(index) {
        // 此处有值的话就不能再落子了
        if (this.state.history[index]) {
            alert('已经在此处数落子了，不能再重复落子了')
            return
        }
        console.log('this.checkWinner()', this.checkWinner())
        if (this.checkWinner()) {
            alert('比赛已有对手获取胜利，请重新开一把游戏')
            return
        }
        const history = this.state.history.slice()
        history[index] = this.state.isFirstMan? 'X': 'O'
        this.setState({
            history: history,
            isFirstMan: !this.state.isFirstMan
        })
        
    }
    // 格子组件
    btn(index) {
        return (<button className="item" onClick={() => {
            this.handleClick(index)
        }}>{this.state.history[index]}</button>)
    }
    render() {
        let status = ''
        if (this.checkWinner()) {
            status = `winner: ${!this.state.isFirstMan? 'X': 'O'}`
        }
       return (<div>
            <div className="main-content">
                {this.btn(1) }
                {this.btn(2) }
                {this.btn(3) }
                {this.btn(4) }
                {this.btn(5) }
                {this.btn(6) }
                {this.btn(7) }
                {this.btn(8) }
                {this.btn(9) }
            </div>
            <div className="tip" style={{"clear":"both"}}>提示
            {status}
            </div>
            <div>
                <button onClick={() => {
                    this.handleReset()
                }}>重开开始</button>
            </div>
        </div>)
    }
}

export default App