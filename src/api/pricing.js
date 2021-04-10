import APIKit from './APIKit';

export const GetMessagingSessionPricingInfoListAPI = async () => {
    const token = (JSON.parse(localStorage.getItem("user"))).token;
    let pricingInfoList = null;
    const onSuccess = data => {
        pricingInfoList = data.data.data;
    }

    const onFailure = error => {
        console.log(error);
    }

    const apiConfig = {
        headers: { "Authorization": `Bearer ${token}` }
    }

    await APIKit.get('/pricings?service_name=messaging_session', apiConfig)
        .then(onSuccess)
        .catch(onFailure);

    return pricingInfoList;
}

export const GetLiveCallSessionPricingInfoListAPI = async () => {
    const token = (JSON.parse(localStorage.getItem("user"))).token;
    let pricingInfoList = null;
    const onSuccess = data => {
        pricingInfoList = data.data.data;
    }

    const onFailure = error => {
        console.log(error);
    }

    const apiConfig = {
        headers: { "Authorization": `Bearer ${token}` }
    }

    await APIKit.get('/pricings?service_name=live_call_session', apiConfig)
        .then(onSuccess)
        .catch(onFailure);

    return pricingInfoList;
}

export const GetTranslationCallSessionPricingInfoListAPI = async () => {
    const token = (JSON.parse(localStorage.getItem("user"))).token;
    let pricingInfoList = null;
    const onSuccess = data => {
        pricingInfoList = data.data.data;
    }

    const onFailure = error => {
        console.log(error);
    }

    const apiConfig = {
        headers: { "Authorization": `Bearer ${token}` }
    }

    await APIKit.get('/pricings?service_name=translation_call_session', apiConfig)
        .then(onSuccess)
        .catch(onFailure);

    return pricingInfoList;
}

export const GetPricingInfoByIdAPI = async (pricingId) => {
    const token = (JSON.parse(localStorage.getItem("user"))).token;
    let pricingInfo = null;
    const onSuccess = data => {
        //only first data
        pricingInfo = data.data.data[0];
    }

    const onFailure = error => {
        console.log(error);
    }

    const apiConfig = {
        headers: { "Authorization": `Bearer ${token}` }
    }

    await APIKit.get('/pricings?id=' + pricingId, apiConfig)
        .then(onSuccess)
        .catch(onFailure);

    return pricingInfo;
}

export const updatePricingInfoByIdAPI = async (pricingId, updateInfoJson) => {
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

    await APIKit.put('/pricings/' + pricingId + "/update", updateInfoJson, apiConfig)
        .then(onSuccess)
        .catch(onFailure);

    return updateResult;
}