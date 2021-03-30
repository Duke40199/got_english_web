import APIKit from './APIKit';

export const GetCoinBundleInfoListAPI = async () => {
    const token = (JSON.parse(localStorage.getItem("user"))).token;
    let coinBundleInfoList = null;
    const onSuccess = data => {
        coinBundleInfoList = data.data.data;
    }

    const onFailure = error => {
        console.log(error);
    }

    const apiConfig = {
        headers: { "Authorization": `Bearer ${token}` }
    }

    await APIKit.get('/coin-bundles', apiConfig)
        .then(onSuccess)
        .catch(onFailure);

    return coinBundleInfoList;
}

export const UpdateCoinBundleByIdAPI = async (coinBundleId, updateInfoJson) => {
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

    await APIKit.get('/coin-bundles/' + coinBundleId + '/update', updateInfoJson, apiConfig)
        .then(onSuccess)
        .catch(onFailure);

    return updateResult;
}

export const CreateCoinBundleAPI = async (coinBundleInfoJson) => {
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

    const apiConfig = {
        headers: { "Authorization": `Bearer ${token}` }
    }

    await APIKit.post('/coin-bundles', coinBundleInfoJson, apiConfig)
        .then(onSuccess)
        .catch(onFailure);

    return createResult;
}