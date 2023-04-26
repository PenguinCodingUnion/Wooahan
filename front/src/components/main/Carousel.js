import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "./styles.css";

import { EffectCoverflow, Pagination } from "swiper";
import GameCard from './GameCard'

const games =[
    {id: 0, title: '뛰어쓰기'},
    {id: 1, title: '팽글썰매'},
    {id: 2, title: '한글방울'},
    {id: 3, title: '끝말기차'},
]

const backColors = [
    "#50BCDF", "#81C147", "#0080FF", "#F7E600"
]


const Carousel = () => {
 
    return (
         <>
            <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={"auto"}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination]}
                className="mySwiper"
                onSlideChange={(e)=>{console.log(e);}}
            >
                <div id="slides">
                    {games.map((game,idx) => (
                        <SwiperSlide key={game.id} id={idx} >
                            {/* 3d 캐릭터 들어감 */}
                            <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
                            <GameCard
                                id={game.id}
                                title={game.title}
                            />
                        </SwiperSlide>
                    ))}
                </div>
            </Swiper>
        </>
        )
    }

export default  Carousel;