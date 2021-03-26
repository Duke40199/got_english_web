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

export const GetModeratorInfoListAPI = async () => {
    const token = (JSON.parse(localStorage.getItem("user"))).token;
    let moderatorInfoList = null;
    const onSuccess = data => {
        moderatorInfoList = data.data.data;
    }

    const onFailure = error => {
        console.log(error);
    }

    setClientToken(token);

    await APIKit.get('/accounts', {
        params: {
            role: 'Moderator',
        }
    })
        .then(onSuccess)
        .catch(onFailure);

    return moderatorInfoList;
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

export const CreateModeratorAPI = async (moderatorInfoJson) => {
    const token = (JSON.parse(localStorage.getItem("user"))).token;
    let createResult = null;
    const onSuccess = response => {
        console.log(response.data);
        createResult = response.data.success;
    }

    const onFailure = error => {
        console.log(error);
        createResult = false;
    }

    setClientToken(token);

    await APIKit.post('/accounts', moderatorInfoJson)
        .then(onSuccess)
        .catch(onFailure);

    return createResult;
}