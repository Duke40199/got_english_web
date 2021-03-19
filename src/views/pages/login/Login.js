import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { LoginAPI } from '../../../api/login';
import { GetUserInfoAPI } from '../../../api/user';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CAlert
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const Login = () => {
  //initial state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();
  const [error, setError] = useState();
  const history = useHistory();

  const onPressLogin = async e => {
    e.preventDefault();

    let userInput = { username, password };
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRegex.test(username)) {
      //input is email
      const email = username
      userInput = { email, password };
    }

    const loginResult = await LoginAPI(userInput);

    if (loginResult.userData != null) {
      // set the state of the user
      setUser(loginResult.userData);
      // store the user in localStorage
      localStorage.setItem("user", JSON.stringify(loginResult.userData));
      // get logged in user detail info then store it into localStorage
      const userInfo = await GetUserInfoAPI(loginResult.userData.username);
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      // refresh but not send any HTTP request
      history.push("/");
    } else {
      setError(loginResult.errorMessage);
    }
  };

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={onPressLogin}>
                    <h1>Đăng nhập</h1>
                    <p className="text-muted">Xin hãy điền thông tin tài khoản</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text"
                        placeholder="Email hoặc Tên Đăng Nhập"
                        required={true}
                        onChange={({ target }) => setUsername(target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password"
                        placeholder="Mật khẩu"
                        required={true}
                        onChange={({ target }) => setPassword(target.value)}
                      />
                    </CInputGroup>
                    {error != null ? <CAlert color="danger">{error}</CAlert> : null}
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary" className="px-4" type="Submit">Đăng Nhập</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">Quên mật khẩu?</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <p>Bạn chưa có tài khoản?</p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>Đăng ký ngay!</CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
