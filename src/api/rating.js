import APIKit from './APIKit';

export const GetRatingListByExpertIdAPI = async (expertId) => {
    const token = (JSON.parse(localStorage.getItem("user"))).token;
    let ratingList = null;
    const onSuccess = data => {
        ratingList = data.data.data;
    }

    const onFailure = error => {
        console.log(error);
    }

    const apiConfig = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    await APIKit.get('/ratings?expert_id=' + expertId, apiConfig)
        .then(onSuccess)
        .catch(onFailure);

    return ratingList;
}