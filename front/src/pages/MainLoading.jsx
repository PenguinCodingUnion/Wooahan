import axiosRequest from "util/Axios";
import {loginActions} from "store/features/login/loginSlice"
import React, { Suspense, useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import MainLoadingComponent from "components/main/loading/MainLoadingComponent"
import { Navigate } from "react-router";

const MainLoading = () => {

    const [loginInfo, setLoginInfo] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch();

    // 안드로이드 기기 id 받아오기
    const getAndroidId = () => {
        // return window.react_toast.sendDeviceID();
    }

    // 로딩시, 첫 로그인 시도할 데이터
    const postData = {
        "androidId": "google",
        "email": ""
    }
    
    const LoginRequest = async () => {
        await axiosRequest
            .post("/login/guest", postData)
            .then((res) => {
                console.log(res)
                // setLoginInfo(res)
                dispatch(loginActions.getStarCount(res.starCount))
                dispatch(loginActions.getRewards(res.rewards))
                dispatch(loginActions.getEmail(res.email))
                setTimeout(() => {
                    setIsLoading(false)
                }, 4000)
            })
            .catch((error) => {
                setTimeout(() => {
                    setIsLoading(false);
                }, 4000);
                console.log(error);
            });
    };

    useEffect(() => {

        // postData.androidId = getAndroidId();
        LoginRequest()
    }, [dispatch])

    return(
        <>
            <Suspense fallback={<MainLoadingComponent />}>
                {isLoading ? <MainLoadingComponent /> : <Navigate to={"/main"} />}
            </Suspense>
        </>   
    )
}

export default MainLoading;