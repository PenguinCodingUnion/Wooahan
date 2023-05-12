import React, { useState, useEffect, useRef } from "react";
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
import { useDispatch, useSelector } from "react-redux"
import { backActions } from 'store/features/mainCard/backSlice' 
import { cardActions } from 'store/features/mainCard/cardSlice'

const games =[
    {id: 1, title: '뛰어쓰기', animal: penguin, url: '/jump'},
    {id: 2, title: '팽글썰매', animal: bunny, url: '/sleigh'},
    {id: 3, title: '한글방울', animal: octopus, url: '/bubble'},
    {id: 4, title: '끝말기차', animal: fox, url: '/train'},
    {id: 5, title: '뛰어쓰기', animal: penguin, url: '/jump'},
    {id: 6, title: '팽글썰매', animal: bunny, url: '/sleigh'},
    {id: 7, title: '한글방울', animal: octopus, url: '/bubble'},
    {id: 8, title: '끝말기차', animal: fox, url: '/train'},
]

const Carousel = () => {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const startPage = useSelector((state) => state.prevPage.prevPage)

    const [mainCard, setMainCard] = useState(startPage);

    const changeMainCard = (swiper) => {
        setMainCard(swiper.realIndex);
        dispatch(backActions.changeBackGround(swiper.realIndex))
    }

    useEffect(() => {
        dispatch(cardActions.savePrevCard(mainCard))
    }, [mainCard])

    useEffect(() => {
        dispatch(backActions.changeBackGround(0))
    }, [])

    const movePageHandler = (game, idx) => {
        if(mainCard === idx) nav(game.url)
    }
    
    return (
        <>
            <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={3}
                loop={true}
                coverflowEffect={{
                    rotate: 20,
                    stretch: 0,
                    depth: 200,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={false}
                modules={[EffectCoverflow, Pagination]}
                className="mySwiper"
                // style={{height: "230%"}}
                onSlideChange={changeMainCard}
                initialSlide={mainCard}
            >

                {games.map((game, idx) => (
                    <SwiperSlide onClick={() => {movePageHandler(game, idx)}} key={game.id} id={idx} className="relative rounded-xl">
                        <CardImage coverImage={mainCard} id={idx}/>
                        <img src={games[idx].animal} 
                                className="ml-[2%] mt-[2%] mb-[2%] w-28 h-36 " />
                        <GameCard id={game.id} title={game.title} />
                    </SwiperSlide>
                ))}

            </Swiper>
        </>

        )
    }

export default  Carousel;