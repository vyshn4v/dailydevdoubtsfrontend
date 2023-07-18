import axios from "axios";
const server = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
})

server.interceptors.request.use(
    (config) => {
        const token = JSON.parse(localStorage.getItem('user'))?.token;
        const adminToken = JSON.parse(localStorage.getItem('admin'))?.token;
        if (token && !config.headers['authorization']) {
            if (config.headers["X-Role"] === 'user') {
                config.headers["authorization"] = "Bearer " + token;
            } else if (config.headers["X-Role"] === 'admin') {
                config.headers["authorization"] = "Bearer " + adminToken;
            }
            console.log('hello');
        }
        return config;
    },
    (error) => {
        console.log(error);
        return Promise.reject(error);
    }
);
server.interceptors.response.use(
    (res) => {
        console.log(res);
        return res;
    })
// server.interceptors.response.use(
//     (res) => {
//         return res;
//     },
//     async (error) => {
//         console.log(error);
//         const originalConfig = error.config;
//         let authorization = ''
//         if (originalConfig.headers['X-Role'] === 'admin') {
//             authorization = "Bearer " + JSON.parse(localStorage.getItem('admin')).refreshToken
//         } else if (originalConfig.headers['X-Role'] === 'user') {
//             authorization = "Bearer " + JSON.parse(localStorage.getItem('user')).refreshToken
//         }
//         if (error.response && error.response.status === 404 &&error.config.url !== "auth/refresh-token"&& !originalConfig._retry) {
//             try {
//                 const rs = await server.post("auth/refresh-token", { refreshToken: authorization }, {
//                     headers: {
//                         authorization: authorization,
//                         'X-Role': originalConfig.headers['X-Role']
//                     },

//                 })
//                 const { data } = rs.data;
//                 if (originalConfig.headers['x-Role'] === 'admin') {
//                     localStorage.setItem('admin', JSON.stringify({ ...JSON.parse(localStorage.getItem('admin')), token: data }))
//                 } else if (originalConfig.headers['x-Role'] === 'user') {
//                     console.log(JSON.parse(localStorage.getItem('user')))
//                     localStorage.setItem('user', JSON.stringify({ ...JSON.parse(localStorage.getItem('user')), token: data }))
//                 }
//                 originalConfig.headers['Authorization'] = `Bearer ${rs.data.data}`;
//                 originalConfig.headers['X-Role'] = originalConfig.headers['x-Role']
//                 return server(originalConfig);
//             } catch (_error) {
//                     if (originalConfig.headers['X-Role'] === 'admin') {
//                         localStorage.removeItem('admin')
//                     } else if(originalConfig.headers['X-Role'] === 'user'){
//                         localStorage.removeItem('user')
//                     }
//             }
//         }
//         return Promise.reject(error);
//     }
// );
export default server