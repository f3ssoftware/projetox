import axios, { AxiosError, AxiosRequestConfig } from "axios";

const httpService = {
    get,
    post,
    put,
    patch,
    delete: _delete
}
async function get(url: string, options?: AxiosRequestConfig) {
    try {
        const res = await axios.get(url, options);

        return res;
    } catch (err: any) {
        if (err.response.status === 403 || err.response.status === 401) {
            refreshToken(await get(url, options));
            return;
        }
        throw new Error(err.message);
    }
}

async function post(url: string, body: any, options?: AxiosRequestConfig) {
    try {
        const res = await axios.post(url, body, options);

        return res;
    } catch (err: any) {
        if (err.response.status === 403 || err.response.status === 401) {
            refreshToken(await get(url, options));
            return;
        }
        console.log(err)
        throw new AxiosError(err.response.data.message, err.response.status);
    }
}

async function put(url: string, body: any, options?: AxiosRequestConfig) {
    try {
        const res = await axios.put(url, body, options);

        return res;
    } catch (err: any) {
        if (err.response.status === 403 || err.response.status === 401) {
            refreshToken(await get(url, options));
            return;
        }
        throw new Error(err.message);
    }
}

async function patch(url: string, body: any, options?: AxiosRequestConfig) {
    try {
        const res = await axios.patch(url, body, options);

        return res;
    } catch (err: any) {
        if (err.response.status === 403 || err.response.status === 401) {
            refreshToken(await get(url, options));
            return;
        }
        throw new Error(err.message);
    }
}

async function _delete(url: string, options?: AxiosRequestConfig) {
    try {
        const res = await axios.delete(url, options);

        return res;
    } catch (err: any) {
        if (err.response.status === 403 || err.response.status === 401) {
            refreshToken(await get(url, options));
            return;
        }
        throw new Error(err.message);
    }
}


async function refreshToken(callback: any) {
    try {
        const newTokenReq = await axios.post(`${process.env.REACT_APP_API_URL}/v1/authentication/refresh-token`, {}, {
            headers: {
                refresh_token: sessionStorage.getItem('refresh_token')
            }
        });

        sessionStorage.setItem('refresh_token', newTokenReq.data.refresh_token);
        sessionStorage.setItem('access_token', newTokenReq.data.access_token);
        callback();
    } catch (err: any) {
        throw new Error(err.message);
    }
}


export default httpService;