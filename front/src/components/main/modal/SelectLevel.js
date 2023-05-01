import { useDispatch } from "react-redux"
import { levelActions } from 'store/features/mainCard/levelSlice' 
import { useSelector } from "react-redux"

const levels =['하', '중', '상']

const SelectLevel = () => {

    const dispatch = useDispatch();

    const selectLevelHandler = (e) => {
        dispatch(levelActions.selectLevel(e.currentTarget.id))
    }

    const selectedLevel = useSelector(state => state.level.level)
    console.log(selectedLevel);

    return (
        <div className="flex justify-around items-center w-full h-[50%] pt-[1%]">
            {levels.map((level, index) => {
                return (
                    <div onClick={selectLevelHandler} id={index} key={index} className={`flex justify-around items-center w-[8%] h-full ${(+selectedLevel === +index) ? `border border-sharkGray`: ``} rounded-lg`}>
                        <div className="font-['MaplestoryOTFBold'] text-xl">
                            {level}
                        </div>
                    </div>
                )    
            })}
        </div>
    )
}

export default SelectLevel;