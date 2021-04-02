import APIKit from './APIKit';

export const LoginAPI = async idToken => {
  let result = {
    userData: null,
    errorMessage: null,
  };
  const onSuccess = data => {
    result.userData = data.data.data;
  };
  const onFailure = error => {
    console.log(error);
    let errorMessage = "";
    if (error.response != null) {
      if (error.response.status == 403) {
        errorMessage = "Xin kiểm tra lại thông tin đăng nhập.";
      }
    } else {
      errorMessage = "Đã có một lỗi bất thường xảy ra. Xin hãy liên hệ với Admin để bảo trì hệ thống.";
    }
    result.errorMessage = errorMessage;
  };
  const apiConfig = {
    headers: { "Authorization": `Bearer ${idToken.token}` }
  }
  await APIKit.post('/login', null, apiConfig)
    .then(onSuccess)
    .catch(onFailure);

  return result;
}

export const GetMyProfileAPI = async () => {
  const token = (JSON.parse(localStorage.getItem("user"))).token;

  let myProfile = null;

  const onSuccess = data => {
    myProfile = data.data.data;
  }

  const onFailure = error => {
    console.log(error);
  }

  const apiConfig = {
    headers: { "Authorization": `Bearer ${token}` }
  }

  await APIKit.get('/profile', apiConfig)
    .then(onSuccess)
    .catch(onFailure);

  return myProfile;
}