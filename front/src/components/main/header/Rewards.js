import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpenReader } from '@fortawesome/free-solid-svg-icons';

library.add(faBookOpenReader);

const Reward = () => {

    return (
        <div className="pl-4 w-1/6 h-full flex justify-start items-center">
            <button className="bg-palePupple rounded-xl w-1/2 h-4/5 flex items-center justify-center">
                <FontAwesomeIcon icon={faBookOpenReader} size='2xl'/>
            </button>
        </div>
    )
}

export default Reward;