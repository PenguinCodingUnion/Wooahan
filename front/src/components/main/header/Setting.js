import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

library.add(faGear);

const Setting = () => {

    const modal = () => {
        console.log("hihi");
    }

    return (
        <div className="pr-4 w-1/6 h-full flex justify-end items-center">
            <button onClick={modal} className="bg-palePupple rounded-xl w-1/2 h-4/5 flex items-center justify-center">
                <FontAwesomeIcon icon={faGear} spin size='2xl'/>
            </button>
        </div>
    )
}

export default Setting;