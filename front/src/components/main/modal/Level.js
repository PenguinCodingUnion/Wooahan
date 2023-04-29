import SelectLevel from './SelectLevel'

const Level = () => {

    return (
        <div className="h-[30%]">
            <div className="font-['MaplestoryOTFBold'] text-xl mt-[2%]">
                난이도를 선택해 주세요.
            </div>
            <SelectLevel />
        </div>
    )
}

export default Level;