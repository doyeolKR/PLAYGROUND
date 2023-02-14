import { useState, useEffect, useRef } from "react";
import { useReducer, ComponentProps } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from "react-redux";
import 'react-calendar/dist/Calendar.css'
import { RootState } from "@/stores/store";

import { team } from "@/models/team";
import { AutoMatchTab, ListTab } from "@/components/TeamMatch/TeamMatchTab"
import TeamMatchMyTeamInfo from "@/components/TeamMatch/TeamMatchMyTeamInfo"
import useGatheringListQuery from "@/hooks/match/useGatheringListQuery";
import useTeamListQuery from "@/hooks/team/useTeamListQuery";

import basketballOriginal from "@/assets/icons/basketball-original.png"
import badmintonOriginal from "@/assets/icons/badminton-original.png"
import footBallOriginal from "@/assets/icons/football-original.png"
import matchButton from "@/assets/icons/personal-match-button.png"
import TeamMatchFilterBar from "@/components/TeamMatch/TeamMatchFilterBar";

// ============ 기타 타입 =================================================
// 자동 매칭, 목록 선택 탭
interface place {
    placeId: number,
    address: string,
    lat: number,
    lng: number
}
interface memberDetail {
    memberId: number,
    statusMessage: string,
    preferTime: string,
    userProfileImgUrl: string
}
interface host {
    memberId: number,
    name: string,
    nickname: string,
    memberDetail: memberDetail
}

interface gatheringType {
    gatheringId: number, // 1
    title: string, // "3대3 농구하실분~"
    description: string, // "같이 농구해요"
    people: number, // 6
    startDate: string, // "2023년 2월 15일"
    startTime: string, // "18:30"
    playTime: number, // 2
    hostId: number, //111
    sex: string, // "남성"
    level: string, // "중수"
    sports: string, // "basketball"
    gameType: string, // "3대3"
    place: place,
    // {
    //   "placeId": 1,
    //   "address": "고운뜰공원",
    //   "lat": 36.3663369,
    //   "lng": 127.2961423
    // }
    host: host,
    // {
    //   "memberId": 111,
    //   "name": "이경택",
    //   "nickname": "이경택",
    //   "memberDetail": {
    //     "memberId": 111,
    //     "statusMessage": "상태메시지1",
    //     "preferTime": "10:00~11:00",
    //     "userProfileImgUrl": "taek.png"
    //   }
    // }
    memberGatheringList: any,
    // [
    //   {
    //     "gatheringMemberId": 1,
    //     "gatheringId": 1,
    //     "memberId": 111,
    //     "member": {
    //       "memberId": 111,
    //       "name": "이경택",
    //       "nickname": "이경택",
    //       "memberDetail": {
    //         "memberId": 111,
    //         "statusMessage": "상태메시지1",
    //         "preferTime": "10:00~11:00",
    //         "userProfileImgUrl": "taek.png"
    //       }
    //     }
    //   }
    // ],
    completed: boolean
}
type attrType = "startData" | "location" | "distance" | "startTime" | "sports" | "gameType" | "sort" 
// ============ 상단 탭 관련 ====================================================
// 종목 탭
type TabAction = { type: 'AUTOMATCH' | 'LIST' };

interface TabState {
    tabType: string;
}

const initialTabState: TabState = {
    tabType: 'AUTOMATCH',
}

function registerTabType(state: TabState, action: TabAction) {
    switch (action.type) {
        case 'AUTOMATCH':
            return {
                ...state,
                tabType: 'AUTOMATCH'
            }
        case 'LIST':
            return {
                ...state,
                tabType: 'LIST'
            }
    }
}
// ========================= 상단 탭 ===================================================
// 자동 매칭 내용
function MatchContent() {
    return (
        <div className="flex flex-col place-items-center w-full h-full m-0 py-[30%] bg-[#fff]">
            <img src={matchButton} alt="" className="w-[200px] h-[200px] " />
            <div className="grid place-content-center w-124 h-45 mt-[5%] flex-grow-0 rounded-30 bg-[#303eff]">
                <span className="w-90 h-28 flex-grow-0  text-20 font-[500] text-center text-[#fff]">매칭 시작</span>
            </div>
        </div>
    )
}
// 목록 각 컴포넌트
function ListItem({ data }: { data: gatheringType }) {
    console.log(data);
    let sportImg;
    let sportColor;
    switch (data?.sports) {
        case "basketball":
            sportImg = basketballOriginal
            sportColor = 'bg-[#fde8b4]'
            break;
        case "football":
            sportImg = footBallOriginal
            sportColor = 'bg-[#d8caff]'
            break;
        case "badminton":
            sportImg = badmintonOriginal
            sportColor = 'bg-[#c4ffb6]'
            break;
    }
    return (
        <div className="relative w-[328px] h-120 flex-grow-0 my-10 mr-15 ml-17 pr-17 rounded-15 bg-[#fff] overflow-hidden">
            <div className={"absolute w-59 h-120 flex-grow-0 pt-51 text-center  mr-11 inline-block " + sportColor}>
                <span className="h-18 flex-grow-0  text-[15px] font-bold text-left text-[#000]">
                    {String(data.memberGatheringList.length) + '/' + data.people}
                </span>
            </div>
            <img src={sportImg} className="absolute w-20 h-20 flex-grow-0 top-17 left-70 p-0 inline-block " />
            <span className="absolute w-130 h-18 flex-grow-0 top-18 left-[101px]  text-[15px] font-bold test-left inline-block text-[#000]">{data?.title}</span>
            <div className="absolute w-1 h-105 flex-grow-0 top-8 left-[259px] bg-[#d9d9d9]"></div>
            <span className="absolute w-40 h-37 flex-grow-0 top-41 left-[276px]  text-[13px] text-left font-[#000]">
                {data?.startDate.slice(5)}
                <br></br>
                {data?.startTime.slice(0, 5)}
            </span>
        </div>
    )
}
// 목록 전체 내용
function ListContent() {
    const filterData = useSelector((state: RootState) => { return state.matchSort; });
    const gatheringListQuery = useGatheringListQuery(filterData);
    console.log(gatheringListQuery);
    console.log(filterData);

    const listItems = () => {
        if (gatheringListQuery.isSuccess) {
            console.log('success ' + gatheringListQuery)
            if (gatheringListQuery.data) {
                const gatheringList = gatheringListQuery.data.map((eachData: gatheringType, i: number) => <ListItem key={i} data={eachData} />)
                return (
                    <div>{gatheringList}</div>
                )
            } else {
                return (
                    <div>
                        해당 모임이 존재하지 않습니다.
                    </div>
                )
            }
        } else {
            return (
                <div>
                    로딩중
                </div>
            )
        }
    }
    useEffect(() => {

    }, [gatheringListQuery.isSuccess])
    return (
        <div className="flex flex-col w-full h-full m-0 pt-10 border-t-1 border-solid border-[#D8CAFF] bg=[#f5f5f5]">
            {listItems()}
        </div>
    )
}
// 상세 목록
// 매치 페이지 출력
export default function TeamMatchPage() {
    const [state, dispatch] = useReducer(registerTabType, initialTabState);
    const userId = useSelector((state: RootState) => {
        return state.userId;
    });
    console.log('userId', userId);

    const myTeamList = useTeamListQuery(userId);
    console.log('myTeamList', myTeamList)
    // 내팀 데이터 불러오기

    const autoMatch = () => dispatch({ type: 'AUTOMATCH' });
    const list = () => dispatch({ type: 'LIST' });
    const content = ()=>{
        if (state.tabType === 'AUTOMATCH') {
            return ( <MatchContent /> )
        } else {
            return ( <ListContent /> )
        }
    }
    return (
        <div className="flex flex-col h-auto w-full bg-[#f5f5f5] m-0 pt-55">
            <div className="h-1/6 w-full m-0 p-0">
                <div className="h-100 w-[90%]"></div>
            <Swiper
                slidesPerView={1.1}
                centeredSlides={true}
                spaceBetween={0}
                grabCursor={true}
                pagination={{
                    clickable: true,
                }}
                onActiveIndexChange={(e) => { console.log(e.activeIndex) }}
                >
                {/* {myTeamList.data && myTeamList.data.map((item: team, index: number)=>
                    <SwiperSlide key={index}>
                        <div className="w-full h-167 ml-[-10px]">
                            <TeamMatchMyTeamInfo myTeamData={item} />
                        <MyTeamInfo rank={myTeamInfo.data.myTeamRank} teamRanking={item} />
                        </div>
                    </SwiperSlide>
                    )} */}
                </Swiper>
            </div>
            <div className="flex flex-col items-center h-5/6 w-full m-0 p-0">
                <div className="flex items-center w-full h-[10%] px-16 py-0 grow-0 bg-[#fff] rounded-t-lg">
                    <AutoMatchTab clickedTab={state.tabType} changeType={()=>{autoMatch();}} />
                    <ListTab clickedTab={state.tabType} changeType={()=>{list();}} />
                </div>
                {/* <TeamMatchFilterBar /> */}
                <div className="w-full h-[90%]">
                    {content()}
                </div>
            </div>
        </div>
    )
}