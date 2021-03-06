import APIKit from './APIKit';
import DefineErrorLog from '../reusable/DefineErrorLog'

export const GetUserInfoAPI = async (username, role) => {
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

    await APIKit.get('/accounts?username=' + username + '&role=' + role, apiConfig)
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

export const GetExpertInfoByIdAPI = async (expertId) => {
    const token = (JSON.parse(localStorage.getItem("user"))).token;
    let expertInfo = null;
    const onSuccess = data => {
        expertInfo = data.data.data;
    }

    const onFailure = error => {
        console.log(error);
    }

    const apiConfig = {
        headers: { "Authorization": `Bearer ${token}` }
    }

    await APIKit.get('/experts?id=' + expertId, apiConfig)
        .then(onSuccess)
        .catch(onFailure);

    return expertInfo;
}

export const UpdateUserInfoByUserIdAPI = async (userID, updateInfoJson) => {
    const token = (JSON.parse(localStorage.getItem("user"))).token;
    let updateResult = null;
    const onSuccess = response => {
        updateResult = response.data.success;
    }

    const onFailure = error => {
        updateResult = DefineErrorLog(error);
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
        createData = response.data;
    }

    const onFailure = error => {
        createData = DefineErrorLog(error);
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

export const UpdateExpertPermissionByIdAPI = async (expertId, updateInfoJson) => {
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

    await APIKit.put('/experts/' + expertId + '/update', updateInfoJson, apiConfig)
        .then(onSuccess)
        .catch(onFailure);

    return updateResult;
}

export const SuspendUserByIdAPI = async (userId) => {
    const token = (JSON.parse(localStorage.getItem("user"))).token;
    let suspendResult = null;

    const onSuccess = response => {
        suspendResult = response.data.success;
    }

    const onFailure = error => {
        suspendResult = DefineErrorLog(error);
    }

    const apiConfig = {
        headers: { "Authorization": `Bearer ${token}` }
    }

    await APIKit.put('/accounts/' + userId + '/suspend', [], apiConfig)
        .then(onSuccess)
        .catch(onFailure);

    return suspendResult;
}

export const UnsuspendUserByIdAPI = async (userId) => {
    const token = (JSON.parse(localStorage.getItem("user"))).token;
    let unsuspendResult = null;

    const onSuccess = response => {
        unsuspendResult = response.data.success;
    }

    const onFailure = error => {
        unsuspendResult = DefineErrorLog(error);
    }

    const apiConfig = {
        headers: { "Authorization": `Bearer ${token}` }
    }

    await APIKit.put('/accounts/' + userId + '/unsuspend', [], apiConfig)
        .then(onSuccess)
        .catch(onFailure);

    return unsuspendResult;
}