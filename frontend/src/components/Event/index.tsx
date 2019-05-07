import React, { Component } from 'react'

import { CupholderEventImage, DennisHongImage, DonaldNormanImage, RobertBettsLaugnlinImage, ICISTS2018Image } from "../../assets/img/cupholder";

const cupholderImageHeight = 1714;
const cupholderImageWidth = 1080;
const cupholderImageRate = 0.4;

const icists2018ImageHeight = 1365;
const icists2018ImageWidth = 2048;
const icists2018IamgeRate = 0.4;

export class ICISTSEvent extends Component<any, any> {
  render() {
    return (
      <div className="event">
        <div className="container">
          <div className="event-info">
            <div className="row align-items-center">
              <div className="col-md-6">
                <img
                  className="event-cupholder-image"
                  height={cupholderImageHeight * cupholderImageRate}
                  width={cupholderImageWidth * cupholderImageRate}
                  src={CupholderEventImage}
                />
              </div>
              <div className="col-md-6">
                <div className="event-how-to-apply align-middle">
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
          </div>
          <div className="event-brief">
            <div className="row">
              <div className="col">
                <h2> 행사소개 </h2>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <img
                  className="icists-2018-image"
                  src={ICISTS2018Image}
                  height={icists2018ImageHeight * icists2018IamgeRate}
                  width={icists2018ImageWidth * icists2018IamgeRate}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-1"/>
              <div className="col-md-10">
                <p>
                  ICISTS는 과학 기술 사회에 대한 상호작용을 고찰하는 국제 대학생 컨퍼런스로, 이번 여름, 제 15회 컨퍼런스가 개최됩니다.
                </p>
                <p>
                  ICISTS는 연설과 팀프로젝트, 스타트업 페스티벌과 과학 예술 전시회, 250여명의 대학생들이 만들어내는 네트워킹의 장을 통해 영감의 기회를 제공합니다.
                </p>
                <p>
                  애플 전 부사장 Don Norman, 데니스 홍, 노벨물리학상 수상자 Robert B. Laughlin, 이더리움 개발자 Vitalik Buterin 외 많은 연사님들과 마이크로소프트, 아마존, 삼성 외 여러 기업들의 도움으로 총 14회의 컨퍼런스를 성공리에 마쳤습니다.
                </p>
                <p>
                  이번 컨퍼런스 주제 및 프로그램 등의 자세한 정보는 다음 링크를 참고해 주세요
                </p>
                <p>
                  (ICISTS 2019 링크)
                  행사일정: 2019년 7월 29일~8월 2일(옆에 포스터)(옆에 시간표넣고 클릭하면 확대되도록)
                </p>
              </div>
              <div className="col-md-1"/>
            </div>
          </div>
          <div className="event-schedule">
            <h2> 일정 </h2>
            <h4>Early Application</h4>
            <p>5월 6일 ~ 5월 31일</p>
            <h4>Regular Application</h4>
            <p>6월 2일 ~ 7월 7일</p>
            <h4>Late Application</h4>
            <p>7월 9일 ~ 7월 20일</p>
            <h4>행사 일정</h4>
            <p>7월 29일 ~ 8월 2일</p>
          </div>
        </div>
      </div>
    )
  }
}

export default ICISTSEvent
