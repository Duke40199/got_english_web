import APIKit from './APIKit';
import DefineErrorLog from '../reusable/DefineErrorLog';

export const GetRatingAlgorithmAPI = async () => {
    const token = (JSON.parse(localStorage.getItem("user"))).token;
    let ratingAlgorithm = null;
    const onSuccess = data => {
        ratingAlgorithm = data.data.data;
    }

    const onFailure = error => {
        console.log(error);
    }

    const apiConfig = {
        headers: { "Authorization": `Bearer ${token}` }
    }

    await APIKit.get('/rating-algorithm', apiConfig)
        .then(onSuccess)
        .catch(onFailure);

    return ratingAlgorithm;
}

export const UpdateRatingAlgorithmAPI = async (updateInfoJson) => {
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

    await APIKit.put('/rating-algorithm', updateInfoJson, apiConfig)
        .then(onSuccess)
        .catch(onFailure);

    return updateResult;
}