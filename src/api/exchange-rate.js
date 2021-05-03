import APIKit from './APIKit';
import DefineErrorLog from '../reusable/DefineErrorLog';

export const GetExchangeRateInfoListAPI = async () => {
    const token = (JSON.parse(localStorage.getItem("user"))).token;
    let exchangeRateInfoList = null;
    const onSuccess = data => {
        exchangeRateInfoList = data.data.data;
    }

    const onFailure = error => {
        console.log(error);
    }

    const apiConfig = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    await APIKit.get('/exchange-rates', apiConfig)
        .then(onSuccess)
        .catch(onFailure);

    return exchangeRateInfoList;
}

export const GetExchangeRateInfoByIdAPI = async (exchangeRateId) => {
    const token = (JSON.parse(localStorage.getItem("user"))).token;
    let exchangeRateInfo = null;
    const onSuccess = data => {
        //only first data
        exchangeRateInfo = data.data.data[0];
    }

    const onFailure = error => {
        console.log(error);
    }

    const apiConfig = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    await APIKit.get('/exchange-rates?id=' + exchangeRateId, apiConfig)
        .then(onSuccess)
        .catch(onFailure);

    return exchangeRateInfo;
}

export const UpdateExchangeRateInfoByIdAPI = async (exchangeRateId, updateInfoJson) => {
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

    await APIKit.put('/exchange-rates/' + exchangeRateId + '/update', updateInfoJson, apiConfig)
        .then(onSuccess)
        .catch(onFailure);

    return updateResult;
}