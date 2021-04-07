import APIKit from './APIKit';

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

    const apiConfig = {
        headers: { "Authorization": `Bearer ${token}` }
    }

    await APIKit.get('/accounts?username=' + username, apiConfig)
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

    const apiConfig = {
        headers: { "Authorization": `Bearer ${token}` }
    }

    await APIKit.get('/accounts?role=Admin', apiConfig)
        .then(onSuccess)
        .catch(onFailure);

    return adminInfoList;
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

    const apiConfig = {
        headers: { "Authorization": `Bearer ${token}` }
    }

    await APIKit.get('/accounts?role=Moderator', apiConfig)
        .then(onSuccess)
        .catch(onFailure);

    return moderatorInfoList;
}

export const GetLearnerInfoListAPI = async () => {
    const token = (JSON.parse(localStorage.getItem("user"))).token;
    let learnerInfoList = null;
    const onSuccess = data => {
        learnerInfoList = data.data.data;
    }

    const onFailure = error => {
        console.log(error);
    }

    const apiConfig = {
        headers: { "Authorization": `Bearer ${token}` }
    }

    await APIKit.get('/accounts?role=Learner', apiConfig)
        .then(onSuccess)
        .catch(onFailure);

    return learnerInfoList;
}

export const GetExpertInfoListAPI = async () => {
    const token = (JSON.parse(localStorage.getItem("user"))).token;
    let learnerInfoList = null;
    const onSuccess = data => {
        learnerInfoList = data.data.data;
    }

    const onFailure = error => {
        console.log(error);
    }

    const apiConfig = {
        headers: { "Authorization": `Bearer ${token}` }
    }

    await APIKit.get('/accounts?role=Expert', apiConfig)
        .then(onSuccess)
        .catch(onFailure);

    return learnerInfoList;
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

    const apiConfig = {
        headers: { "Authorization": `Bearer ${token}` }
    }

    await APIKit.put('/accounts/' + userID + '/update', updateInfoJson, apiConfig)
        .then(onSuccess)
        .catch(onFailure);

    return updateResult;
}

export const CreateUserAPI = async (userInfoJson) => {
    const token = (JSON.parse(localStorage.getItem("user"))).token;
    let createData = null;
    const onSuccess = response => {
        console.log(response.data);
        createData = response.data;
    }

    const onFailure = error => {
        console.log(error);
    }

    const apiConfig = {
        headers: { "Authorization": `Bearer ${token}` }
    }

    await APIKit.post('/accounts', userInfoJson, apiConfig)
        .then(onSuccess)
        .catch(onFailure);

    return createData;
}

export const UpdateModeratorPermissionByIdAPI = async (moderatorId, updateInfoJson) => {
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

    const apiConfig = {
        headers: { "Authorization": `Bearer ${token}` }
    }

    await APIKit.put('/moderators/' + moderatorId + '/update', updateInfoJson, apiConfig)
        .then(onSuccess)
        .catch(onFailure);

    return updateResult;
}

export const UpdateAdminPermissionByIdAPI = async (adminId, updateInfoJson) => {
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

    const apiConfig = {
        headers: { "Authorization": `Bearer ${token}` }
    }

    await APIKit.put('/admins/' + adminId + '/update', updateInfoJson, apiConfig)
        .then(onSuccess)
        .catch(onFailure);

    return updateResult;
}