import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { LoginAPI, GetMyProfileAPI } from '../../../api/login'
import jwt_decode from 'jwt-decode'
import util from 'util';
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
import { signInWithEmailAndPasswordHandler } from 'src/firebase/firebase'

const Login = () => {
  //initial state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();
  const [error, setError] = useState();
  const history = useHistory();

  const onPressLogin = async e => {
    e.preventDefault();

    const idToken = await signInWithEmailAndPasswordHandler(email, password);
    const loginResult = await LoginAPI(idToken);

    if (loginResult.userData != null) {
      //role check
      const role = (jwt_decode(loginResult.userData.token)).claims.role_name;
      if (role === "Admin" || role === "Moderator") {
        // set the state of the user
        setUser(loginResult.userData);
        // store the user in localStorage
        localStorage.setItem("user", JSON.stringify(loginResult.userData));
        // get logged in user detail info then store it into localStorage
        const userInfo = await GetMyProfileAPI();
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        // reload the page
        history.go(0);
      } else {
        setError("Tài khoản của bạn không có quyền truy cập hệ thống này!");
      }
    } else {
      setError(loginResult.errorMessage);
    }
  };

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCard>
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
                    <CInput type="email"
                      placeholder="Email"
                      required
                      onChange={({ target }) => setEmail(target.value)}
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
                      required
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
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
