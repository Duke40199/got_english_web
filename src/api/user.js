import APIKit, { setClientToken } from './APIKit';

export const GetUserInfoAPI = async (username) => {
    const token = (JSON.parse(localStorage.getItem("user"))).token;
    let userInfo = null;
    const onSuccess = data => {
        //only first data
        userInfo = data.data.data[0];
    }

    const onFailure = error => {
        console.log(error);
    }

    setClientToken(token);

    await APIKit.get('/users', {
        params: {
            username: username,
        }
    })
        .then(onSuccess)
        .catch(onFailure);

    return userInfo;
}

export const GetAdminInfoListAPI = async () => {
    const token = (JSON.parse(localStorage.getItem("user"))).token;
    let adminInfoList = null;
    const onSuccess = data => {
        adminInfoList = data.data.data;
    }

    const onFailure = error => {
        console.log(error);
    }

    setClientToken(token);

    await APIKit.get('/users', {
        params: {
            role: 'Admin',
        }
    })
        .then(onSuccess)
        .catch(onFailure);

    return adminInfoList;
}