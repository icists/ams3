import React, { Component } from 'react'
import cupholderevent from '../../../assets/img/cupholder/cupholder-event-how-to-apply.jpg'


export class Event extends Component {
  render() {
    return (
      <div id="cup-event" className="container">
        <h1>Event</h1>
        <div className="row">
            <div className="col-lg-1"></div>
            <div className="col-lg-10">
                <div className="row">
                <div className="col-lg-6">
                    <img src={cupholderevent} alt=""/>
                </div>
                <div className="col-lg-6 event-how-to-apply align-middle">
                  <h2>응모 방법</h2>
                  <p>1. 컵홀더 사진을 찍습니다.</p>
                  <p>2. 해시태그를 적어서 인스타그램에 올립니다.</p>
                  <h3>필수 해시태그!</h3>
                  <p>#ICISTS #컨퍼런스 #KAIST #스펙쌓기</p>
                  <h2>추첨 상품</h2>
                  <p>영화 관람권 10매</p>
                  <h2>당첨자 발표</h2>
                  <p>7월 7일</p>
                </div>
                </div>
            </div>
            <div className="col-lg-1"></div>
        </div>
      </div>
    )
  }
}

export default Event
