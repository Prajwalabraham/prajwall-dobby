import axios from 'axios';

const instance=axios.create({
     baseURL:"https://imageuploader90.herokuapp.com/"
});

export default instance;