import {useContext} from 'react';
import AuthContentx from '../context/AuthProvider';

const useAuth = () => {
    return useContext(AuthContentx);
};

export default useAuth;