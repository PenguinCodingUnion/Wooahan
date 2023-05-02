import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "./styles.css";

import { EffectCoverflow, Pagination } from "swiper";
import GameCard from './GameCard'
import CardImage from './CardImage'

import penguin from "assets/images/animal/penguin.png"
import bunny from "assets/images/animal/bunny.png"
import octopus from "assets/images/animal/octopus.png"
import fox from "assets/images/animal/fox.png"
import {useNavigate} from 'react-router-dom';
import { useDispatch } from "react-redux"
import { backActions } from 'store/features/mainCard/backSlice' 

const games =[
    {id: 0, title: '뛰어쓰기', animal: penguin, url: '/jump'},
    {id: 1, title: '팽글썰매', animal: bunny, url: '/sleigh'},
    {id: 2, title: '한글방울', animal: octopus, url: '/bubble'},
    {id: 3, title: '끝말기차', animal: fox, url: '/train'},
]

const Carousel = () => {
    const nav = useNavigate();
    const dispatch = useDispatch();

    const [mainCard, setMainCard] = useState(0);

    const changeMainCard = (num) => {
        setMainCard(num);
        dispatch(backActions.changeBackGround(num))
    }
    const movePageHandler = (game, idx) => {
        if(mainCard === idx) nav(game.url)
    }
    
    return (
        <>
            <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 10,
                    depth: 100,
                    modifier: 1,
                    slideShadows: false,
                }}
                // loopPreventsSlide={true}
                // loop={true}
                pagination={true}
                modules={[EffectCoverflow, Pagination]}
                
                className="mySwiper"
                onSlideChange={(e) => changeMainCard(e.activeIndex)}
            >
                <div id="slides">
                    {games.map((game, idx) => (
                        <SwiperSlide onClick={() => {movePageHandler(game, idx)}} key={game.id} id={idx} className="relative rounded-xl">
                            <CardImage coverImage={mainCard} id={idx}/>
                            <img src={games[idx].animal} 
                                 className="ml-[2%] mt-[2%] mb-[2%] w-28 h-36" />
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