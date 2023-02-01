import { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activeIndex } from "@/stores/register/registerTab";
import { Route, Link } from "react-router-dom";

type IndexState = {
    registerTab: { currentIndex: 0 | 1 | 2 }
};

export default function ChoiceCompoleteButton() {
    const dispatch = useDispatch();
    const currentIndex = useSelector((state: IndexState) => {
        return state.registerTab.currentIndex
    })
    const userInfo = useSelector((state: any) => {
        return state.user
    })

    return (
        <button
            onClick={() => {
                console.log(userInfo)
                dispatch(activeIndex(currentIndex + 1))
                if (currentIndex == 2) {
                    location.href = "https://localhost:3000/login/register/complete"
                }
            }}
            className="w-[300px] h-38 rounded-5 bg-blue-700 text-16 mb-32 text-white tracking-tight"
        >
            선택완료
        </button>
    )
}