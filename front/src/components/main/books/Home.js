import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseChimney } from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from 'react-router-dom';

library.add(faHouseChimney);

const Home = () => {
    
    const nav = useNavigate();

    return (
        <div onClick={() => {nav(`/`)}} className="pl-4 w-1/6 h-full flex justify-start items-center">
            <button className="bg-palePupple rounded-xl w-1/2 h-4/5 flex items-center justify-center">
                <FontAwesomeIcon icon={faHouseChimney} size='2xl'/>
            </button>
        </div>
    )
}

export default Home;