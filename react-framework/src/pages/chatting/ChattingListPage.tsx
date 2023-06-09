import Notice from "@/components/Chatting/Notice"
import ListCard from "@/components/Chatting/ListCard"
import basketball from "@/assets/profiles/team-basketball.png"
import basketball2 from "@/assets/profiles/team-basketball2.png"
import autoMatchfootball from "@/assets/profiles/auto-match-football.png"
import autoMatchBasketball from "@/assets/profiles/auto-match-basketball.png"
import autoMatchBadminton from "@/assets/profiles/auto-match-badminton.png"

import useGetAllTeamChattingRoomsByMemberId from "@/hooks/chat/useGetAllChattingRoomsByMemberId"

import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { setTabName } from "@/stores/tab/tabName"
import { RootState } from "@/stores/store"

interface Room {
    roomId: number;
    roomProfile: string;
    title: string;
    personnel: number;
}

export default function ChattingListPage() {

    const myUserId = useSelector((state: RootState) => {
        return state.userId
    })
    const dispatch = useDispatch();
    const { data } = useGetAllTeamChattingRoomsByMemberId(myUserId);


    useEffect(() => {
        dispatch(setTabName('채팅 목록'))
        data && console.log(data)
    }, [])

    const renderChatRooms = () => {
        return data && data.map((chattingRoom: any) => {
            return <ListCard key={chattingRoom.teamChatroomId} roomId={chattingRoom.teamChatroomId} roomProfile={basketball} title={chattingRoom.chatroomName} personnel={chattingRoom.gameType} latestMsg="오늘 저녁 농구 ㄱ?" />
        })
    }

    return (
        <div className="flex flex-col h-auto">
            <Notice title="오늘 운동은 어떠셨나요?" content="팀원들에게 격려의 메세지를 남겨주세요!" />
            {renderChatRooms()}
        </div>
    )
}