import APIKit from './APIKit';
import DefineErrorLog from '../reusable/DefineErrorLog'

export const GetCoinValuePricingInfoListAPI = async () => {
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

    await APIKit.get('/pricings?pricing_name=coin_value', apiConfig)
        .then(onSuccess)
        .catch(onFailure);

    return pricingInfoList;
}

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

    await APIKit.get('/pricings?pricing_name=messaging_session', apiConfig)
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

    await APIKit.get('/pricings?pricing_name=live_call_session', apiConfig)
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

    await APIKit.get('/pricings?pricing_name=translation_call_session', apiConfig)
        .then(onSuccess)
        .catch(onFailure);

    return pricingInfoList;
}

export const GetCoinPricingInfoAPI = async () => {
    const token = (JSON.parse(localStorage.getItem("user"))).token;
    let pricingInfoList = null;
    const onSuccess = data => {
        //only first data
        pricingInfoList = data.data.data[0];
    }

    const onFailure = error => {
        console.log(error);
    }

    const apiConfig = {
        headers: { "Authorization": `Bearer ${token}` }
    }

    await APIKit.get('/pricings?pricing_name=coin_value', apiConfig)
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

export const UpdatePricingInfoByIdAPI = async (pricingId, updateInfoJson) => {
    const token = (JSON.parse(localStorage.getItem("user"))).token;
    let updateResult = null;
    const onSuccess = response => {
        console.log(response.data);
        updateResult = response.data.success;
    }

    const onFailure = error => {
        updateResult = DefineErrorLog(error);
    }

    const apiConfig = {
        headers: { "Authorization": `Bearer ${token}` }
    }

    await APIKit.put('/pricings/' + pricingId + "/update", updateInfoJson, apiConfig)
        .then(onSuccess)
        .catch(onFailure);

    return updateResult;
}

export const AddPricingInfoAPI = async (addInfoJson) => {
    const token = (JSON.parse(localStorage.getItem("user"))).token;
    let addResult = null;
    const onSuccess = response => {
        console.log(response.data);
        addResult = response.data.success;
    }

    const onFailure = error => {
        addResult = DefineErrorLog(error);
    }

    const apiConfig = {
        headers: { "Authorization": `Bearer ${token}` }
    }

    await APIKit.post('/pricings', addInfoJson, apiConfig)
        .then(onSuccess)
        .catch(onFailure);

    return addResult;
}

export const DeletePricingByIdAPI = async (pricingId) => {
    const token = (JSON.parse(localStorage.getItem("user"))).token;
    let deleteResult = null;
    const onSuccess = response => {
        console.log(response.data);
        deleteResult = response.data.success;
    }

    const onFailure = error => {
        deleteResult = DefineErrorLog(error);
    }

    const apiConfig = {
        headers: { "Authorization": `Bearer ${token}` }
    }

    await APIKit.delete('/pricings/' + pricingId + "/delete", apiConfig)
        .then(onSuccess)
        .catch(onFailure);

    return deleteResult;
}