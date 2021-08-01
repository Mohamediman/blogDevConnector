import axios from 'axios'

const setAuthtoken = token => {
    if(token){
        axios.defaults.headers.common['authorization'] = `Bearer ${token}`
    } else {
        delete axios.defaults.common['authorization']
    }
}

export default setAuthtoken;

