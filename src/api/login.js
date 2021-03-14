
import APIKit from './APIKit';
// const APIUrl = process.env.BACKEND_URL || 'http://localhost:4000';
const APIUrl = process.env.BACKEND_URL || 'https://got-english-backend-production-swiyh5bc4q-de.a.run.app/';
function LoginAPI(user) {
  // let state = {
  //   redirect: false,
  //   email: "",
  //   password: "",
  //   isLogin: false,
  //   loggedIn: false,
  //   returnedEmail: "",
  //   returnedFirstName: "",
  //   returnedLastName: "",
  //   returnedCompanyName: "",
  //   returnedCompanyCode: " ",
  //   LoginToken: " ",
  // }
  APIKit.post(APIUrl + "login", {
    username: user.username,
    password: user.password,
  }).then(
    res => {
      if (res.data != null) {
        console.log("=================RESDATA:" + res.data);
        // store the token in the localstorage
        // window.localStorage.setItem("token", res.data.token);
        // this.setState({
        //   loggedIn: true,
        //   returnedEmail: res.data.email,
        //   returnedFirstName: res.data.first_name,
        //   returnedLastName: res.data.last_name,
        //   returnedCompanyName: res.data.company_name,
        //   returnedCompanyCode: res.data.company_code,
        //   LoginToken: res.data.token,
        // })
        console.log(this.state.LoginToken);
      } else {
        console.log("failed to log in");
      }
    }
  ).catch(error => {
    console.error(error.response);

  })
}