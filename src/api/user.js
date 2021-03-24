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

    await APIKit.get('/accounts', {
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

    await APIKit.get('/accounts', {
        params: {
            role: 'Admin',
        }
    })
        .then(onSuccess)
        .catch(onFailure);

    return adminInfoList;
}

export const UpdateUserInfoByUserIdAPI = async (userID, updateInfoJson) => {
    const token = (JSON.parse(localStorage.getItem("user"))).token;
    let updateResult = null;
    const onSuccess = response => {
        console.log(response.data);
        updateResult = response.data.success;
    }

    const onFailure = error => {
        console.log(error);
        updateResult = false;
    }

    setClientToken(token);

    await APIKit.put('/accounts/' + userID + '/update', updateInfoJson)
        .then(onSuccess)
        .catch(onFailure);

    return updateResult;
}