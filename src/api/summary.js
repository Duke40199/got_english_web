import APIKit from './APIKit';

export const GetDailySummaryAPI = async () => {
    const token = (JSON.parse(localStorage.getItem("user"))).token;
    let dailySummary = null;

    const onSuccess = data => {
        dailySummary = data.data.data;
    }

    const onFailure = error => {
        console.log(error);
    }

    const apiConfig = {
        headers: { "Authorization": `Bearer ${token}` }
    }

    await APIKit.get('/administrator/daily-summary', apiConfig)
        .then(onSuccess)
        .catch(onFailure);

    return dailySummary;
}

export const GetMonthlyAccountSummaryByYearMonthAPI = async (year, month) => {
    const token = (JSON.parse(localStorage.getItem("user"))).token;
    let accountMonthlySummary = null;

    const onSuccess = data => {
        accountMonthlySummary = data.data.data;
    }

    const onFailure = error => {
        console.log(error);
    }

    const apiConfig = {
        headers: { "Authorization": `Bearer ${token}` }
    }

    await APIKit.get('/administrator/account-monthly-summary?year=' + year + "&month=" + month, apiConfig)
        .then(onSuccess)
        .catch(onFailure);

    return accountMonthlySummary;
}

export const GetMonthlyServiceSummaryByYearMonthAPI = async (year, month) => {
    const token = (JSON.parse(localStorage.getItem("user"))).token;
    let serviceMonthlySummary = null;

    const onSuccess = data => {
        serviceMonthlySummary = data.data.data;
    }

    const onFailure = error => {
        console.log(error);
    }

    const apiConfig = {
        headers: { "Authorization": `Bearer ${token}` }
    }

    await APIKit.get('/administrator/service-monthly-summary?year=' + year + "&month=" + month, apiConfig)
        .then(onSuccess)
        .catch(onFailure);

    return serviceMonthlySummary;
}