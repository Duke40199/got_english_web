
import APIKit, { setClientToken } from './APIKit';

export const LoginAPI = async userInput => {
  let result = {
    userData: null,
    errorMessage: null,
  };

  const onSuccess = data => {
    // Set JSON Web Token on success
    setClientToken(data.data.data.token);
    // set the state of the user
    // setUser(data.data);
    // store the user in localStorage
    // localStorage.setItem("user", JSON.stringify(data.data));
    // get logged in user info
    // await GetUserInfo()

    //console.log(`======= LOGIN USERNAME:${user.username}`);
    // history.push("/");
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

  await APIKit.post('/login', userInput)
    .then(onSuccess)
    .catch(onFailure);

  return result;
}