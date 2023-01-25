import useMouse from "@react-hook/mouse-position";
import { useEffect, useRef } from "react"
import { useReducer } from "react"

type Action = { type: 'ISPRESSED' | 'BASKETBALL' | 'SOCCER' | 'BADMINTON' | 'INIT' };

interface State {
    isPressed: boolean;
    sportType: number;
}

const initialState: State = {
    isPressed: false,
    sportType: 0,
}

function registReducer(state: State, action: Action) {
    switch (action.type) {
        case 'ISPRESSED':
            return {
                ...state,
                isPressed: !state.isPressed
            }
        case 'BASKETBALL':
            return {
                ...state,
                sportType: 1
            }
        case 'SOCCER':
            return {
                ...state,
                sportType: 2
            }
        case 'BADMINTON':
            return {
                ...state,
                sportType: 3
            }
        case 'INIT':
            return {
                ...state,
                sportType: 0
            }
        default:
            throw new Error('Unhandled action');
    }
}
export default function HomePage() {

    const [state, dispatch] = useReducer(registReducer, initialState);
    const onPressed = () => dispatch({ type: 'ISPRESSED' });
    const basketBall = () => dispatch({ type: 'BASKETBALL' });
    const soccer = () => dispatch({ type: 'SOCCER' });
    const badminton = () => dispatch({ type: 'BADMINTON' });
    const init = () => dispatch({ type: 'INIT' });

    const mapElement: any | null = useRef(undefined);
    useEffect(() => {
        const { naver } = window;
        if (!mapElement.current || !naver) return;
        console.log("new!");

        // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
        const location = new naver.maps.LatLng(37.5656, 126.9769);
        const mapOptions: naver.maps.MapOptions = {
            center: location,
            zoom: 17,
        };
        const map = new naver.maps.Map(mapElement.current, mapOptions);
        new naver.maps.Marker({
            position: location,
            map,
        });
    }, []);

    useEffect(() => {
        switch (state.sportType) {
            case 1:
                naver.maps.Event.addListener(mapElement.current, 'click', function (e) {
                    new naver.maps.Marker({
                        position: e.coord,
                        map: mapElement.current
                    })
                    //init();

                });
                console.log(state.sportType);

                break;
            case 2:
                naver.maps.Event.addListener(mapElement.current, 'click', function (e) {
                    new naver.maps.Marker({
                        position: e.coord,
                        map: mapElement.current,
                    })
                });
                init;
                console.log(state.sportType);
                break;
            case 3:
                naver.maps.Event.addListener(mapElement.current, 'click', function (e) {
                    new naver.maps.Marker({
                        position: e.coord,
                        map: mapElement.current,
                    })
                });
                init;
                console.log(state.sportType);
                break;
        }

    }, [state])


    return (
        <div ref={mapElement} className="w-full h-full">
            <div className="w-60 h-193 flex flex-col relative float-right mt-12 mr-9 z-10 ">{
                state.isPressed === false ?
                    <button className="w-60 h-32 rounded-20 border-2 border-blue-800 bg-blue-700 text-white" onClick={onPressed}>등록</button>
                    :
                    <div>
                        <button className="w-60 h-32 rounded-20 border-2 border-blue-800 bg-blue-700 text-white" onClick={onPressed}>취소</button>
                        <div className="flex flex-col justify-between items-center w-60 h-157 mt-4 rounded-15 border-1 border-[#303eff80] bg-blue-300">
                            <div className="w-40 h-40 mt-7 rounded-50 bg-yellow-200" onClick={basketBall} ></div>
                            <div className="w-40 h-40 rounded-50 bg-blue-400" onClick={soccer}></div>
                            <div className="w-40 h-40 mb-7 rounded-50 bg-green-400" onClick={badminton}></div>
                        </div>
                    </div>
            }
            </div>
        </div>
    )
}