import request from 'axios';

export default () => {
    return request.create({
        baseURL: 'http://localhost:5000'
    });
}