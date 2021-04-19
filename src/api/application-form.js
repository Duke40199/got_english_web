import APIKit from './APIKit'

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

export const ApproveApplicationFormByIdAPI = async (applicationFormId) => {
    const token = (JSON.parse(localStorage.getItem("user"))).token;
    let approveApplicationFormResult = null;

    const onSuccess = response => {
        approveApplicationFormResult = response.data.success;
    }

    const onFailure = error => {
        console.log(error);
        if ((error.response.data).includes("Application form is already being either approved or rejected.")) {
            approveApplicationFormResult = "Đơn xin này đã được duyệt hoặc đã bị từ chối!"
        } else {
            approveApplicationFormResult = "Duyệt đơn xin thất bại!"
        }
    }

    const apiConfig = {
        headers: { "Authorization": `Bearer ${token}` }
    }

    await APIKit.get('/application-forms/' + applicationFormId + '/approve', apiConfig)
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
        console.log(error);
        if ((error.response.data).includes("Application form is already being either approved or rejected.")) {
            rejectApplicationFormResult = "Đơn xin này đã được duyệt hoặc đã bị từ chối!"
        } else {
            rejectApplicationFormResult = "Duyệt đơn xin thất bại!"
        }
    }

    const apiConfig = {
        headers: { "Authorization": `Bearer ${token}` }
    }

    await APIKit.get('/application-forms/' + applicationFormId + '/reject', apiConfig)
        .then(onSuccess)
        .catch(onFailure);

    return rejectApplicationFormResult;
}