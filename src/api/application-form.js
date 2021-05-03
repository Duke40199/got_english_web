import APIKit from './APIKit'
import DefineErrorLog from '../reusable/DefineErrorLog'

export const GetApplicationFormListAPI = async () => {
    const token = (JSON.parse(localStorage.getItem("user"))).token;
    let applicationFormList = null;

    const onSuccess = data => {
        applicationFormList = data.data.data;
    }

    const onFailure = error => {
        console.log(error);
    }

    const apiConfig = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    await APIKit.get('/application-forms', apiConfig)
        .then(onSuccess)
        .catch(onFailure);

    return applicationFormList;
}

export const GetPendingApplicationFormListAPI = async () => {
    const token = (JSON.parse(localStorage.getItem("user"))).token;
    let applicationFormList = null;

    const onSuccess = data => {
        applicationFormList = data.data.data;
    }

    const onFailure = error => {
        console.log(error);
    }

    const apiConfig = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    await APIKit.get('/application-forms?status=Pending', apiConfig)
        .then(onSuccess)
        .catch(onFailure);

    return applicationFormList;
}

export const GetApprovedApplicationFormListAPI = async () => {
    const token = (JSON.parse(localStorage.getItem("user"))).token;
    let applicationFormList = null;

    const onSuccess = data => {
        applicationFormList = data.data.data;
    }

    const onFailure = error => {
        console.log(error);
    }

    const apiConfig = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    await APIKit.get('/application-forms?status=Approved', apiConfig)
        .then(onSuccess)
        .catch(onFailure);

    return applicationFormList;
}

export const GetRejectedApplicationFormListAPI = async () => {
    const token = (JSON.parse(localStorage.getItem("user"))).token;
    let applicationFormList = null;

    const onSuccess = data => {
        applicationFormList = data.data.data;
    }

    const onFailure = error => {
        console.log(error);
    }

    const apiConfig = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    await APIKit.get('/application-forms?status=Rejected', apiConfig)
        .then(onSuccess)
        .catch(onFailure);

    return applicationFormList;
}

export const ApproveApplicationFormByIdAPI = async (applicationFormId) => {
    const token = (JSON.parse(localStorage.getItem("user"))).token;
    let approveApplicationFormResult = null;

    const onSuccess = response => {
        approveApplicationFormResult = response.data.success;
    }

    const onFailure = error => {
        approveApplicationFormResult = DefineErrorLog(error);
    }

    const apiConfig = {
        headers: { "Authorization": `Bearer ${token}` }
    }

    await APIKit.put('/application-forms/' + applicationFormId + '/approve', [], apiConfig)
        .then(onSuccess)
        .catch(onFailure);

    return approveApplicationFormResult;
}

export const RejectApplicationFormByIdAPI = async (applicationFormId) => {
    const token = (JSON.parse(localStorage.getItem("user"))).token;
    let rejectApplicationFormResult = null;

    const onSuccess = response => {
        rejectApplicationFormResult = response.data.success;
    }

    const onFailure = error => {
        rejectApplicationFormResult = DefineErrorLog(error);
    }

    const apiConfig = {
        headers: { "Authorization": `Bearer ${token}` }
    }

    await APIKit.put('/application-forms/' + applicationFormId + '/reject', [], apiConfig)
        .then(onSuccess)
        .catch(onFailure);

    return rejectApplicationFormResult;
}