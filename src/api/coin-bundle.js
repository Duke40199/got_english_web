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
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    await APIKit.get('/coin-bundles', apiConfig)
        .then(onSuccess)
        .catch(onFailure);

    return coinBundleInfoList;
}

export const GetCoinBundleByIdAPI = async (coinBundleId) => {
    const token = (JSON.parse(localStorage.getItem("user"))).token;
    let coinBundleInfo = null;
    const onSuccess = data => {
        //only first data
        coinBundleInfo = data.data.data[0];
    }

    const onFailure = error => {
        console.log(error);
    }

    const apiConfig = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    await APIKit.get('/coin-bundles?id=' + coinBundleId, apiConfig)
        .then(onSuccess)
        .catch(onFailure);

    return coinBundleInfo;
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

    await APIKit.put('/coin-bundles/' + coinBundleId + '/update', updateInfoJson, apiConfig)
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

export const DeleteCoinBundleByIdAPI = async (coinBundleId) => {
    const token = (JSON.parse(localStorage.getItem("user"))).token;
    let deleteResult = null;

    const onSuccess = response => {
        console.log(response.data);
        deleteResult = response.data.success;
    }

    const onFailure = error => {
        console.log(error);
        if ((error.response.data).includes("coin bundle not found or already deleted")) {
            deleteResult = "Gói Coin này không tìm thấy hoặc đã bị xóa!"
        } else {
            deleteResult = "Xóa Gói Coin thất bại!"
        }
    }

    const apiConfig = {
        headers: { "Authorization": `Bearer ${token}` }
    }

    await APIKit.delete('/coin-bundles/' + coinBundleId + "/delete", apiConfig)
        .then(onSuccess)
        .catch(onFailure);

    return deleteResult;
}