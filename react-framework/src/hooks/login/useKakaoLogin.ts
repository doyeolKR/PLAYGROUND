import { RootState } from "@/stores/store";
import axios from "axios";
import { useMutation } from "react-query"
import { useSelector } from "react-redux";

const SERVER_URL = `https://192.168.31.246:8080/oauth2/regist?code=`

const useKakaoLogin = (code: string) => {
    const userInfo = useSelector((state: RootState) => {
        const prefer_activities = [
            { "activity": "football", "level": state.userInfo.sportsLevel.football },
            { "activity": "basketball", "level": state.userInfo.sportsLevel.basketball },
            { "activity": "badminton", "level": state.userInfo.sportsLevel.badminton }
        ]
        return (
            {
                // status_message: "",
                prefer_time: `${state.userInfo.favoriteTime[0]}-${state.userInfo.favoriteTime[1]}`,
                // web_fcm_token: "",
                // moblie_fcm_token: "",
                // user_profile_img_url: "",
                prefer_activities: prefer_activities,
                nickname: state.userInfo.nickname,
            }
        )
    })

    const fetcher = () => axios.post(SERVER_URL + `${code}`, { ...userInfo });
    return useMutation(fetcher, {
        onSuccess: () => console.log("성공!")
    });
};

export default useKakaoLogin;    