import APIKit from './APIKit';

export const GetUserInfoAPI = async (username) => {
    let userInfo = null;
    const onSuccess = data => {
        //only first data
        userInfo = data.data.data[0];
    }

    const onFailure = error => {
        console.log(error);
    }

    await APIKit.get('/users', {
        params: {
            username: username,
        }
    })
        .then(onSuccess)
        .catch(onFailure);

    return userInfo;
}