import React, { useEffect, useState } from "react";
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

const games =[
    {id: 0, title: '뛰어쓰기', animal: penguin},
    {id: 1, title: '팽글썰매', animal: bunny},
    {id: 2, title: '한글방울', animal: octopus},
    {id: 3, title: '끝말기차', animal: fox},
]

const Carousel = () => {

    const [mainCard, setMainCard] = useState(0);

    const changeMainCard = (num) => {
        setMainCard(num)
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
                        <SwiperSlide key={game.id} id={idx} className="relative rounded-xl">
                            <CardImage coverImage={mainCard} id={idx}/>
                            <img src={games[idx].animal} 
                                 className="ml-2 mt-2 mb-2 w-28 h-36" />
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