import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
    CCard,
    CCardBody,
    CCol,
    CForm,
    CInput,
    CInputGroup,
    CInputGroupPrepend,
    CInputGroupText,
    CRow,
    CContainer,
    CButton,
    CAlert
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { sendResetPasswordEmail } from '../../../firebase/firebase'

import { usePromiseTracker, trackPromise } from "react-promise-tracker";

const RecoverPassword = () => {
    const history = useHistory();

    const [email, setEmail] = useState("");
    const [resetResult, setResetResult] = useState(null);

    const { promiseInProgress } = usePromiseTracker();

    const onSubmitForm = async (e) => {
        e.preventDefault();

        const result = await trackPromise(sendResetPasswordEmail(email));
        if (result === true) {
            setEmail("");
            setResetResult(<CAlert color="success">Một email khôi phục mật khẩu đã gửi đến địa chỉ mail của bạn.</CAlert>);
        } else {
            setResetResult(<CAlert color="danger">Gửi email thất bại! Xin thử lại sau...</CAlert>);
        }
    }

    return (
        <div className="c-app c-default-layout flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md="8">
                        <CCard>
                            <CCardBody>
                                <CForm onSubmit={onSubmitForm}>
                                    <h1>Quên mật khẩu</h1>
                                    <p className="text-muted">Xin hãy cung cấp email tài khoản của bạn</p>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupPrepend>
                                            <CInputGroupText>
                                                <CIcon name="cil-envelope-closed" />
                                            </CInputGroupText>
                                        </CInputGroupPrepend>
                                        <CInput type="email"
                                            placeholder="Email"
                                            required
                                            value={email}
                                            onChange={({ target }) => setEmail(target.value)}
                                        />
                                    </CInputGroup>
                                    {promiseInProgress ?
                                        <div className="spinner-border text-primary mb-3">
                                        </div> :
                                        (resetResult != null && resetResult !== "") ? resetResult : null
                                    }
                                    <CRow>
                                        <CCol xs="6">
                                            <CButton color="primary" className="px-4" type="Submit" >Nhận email khôi phục</CButton>
                                        </CCol>
                                        <CCol xs="6" className="text-right">
                                            <CButton color="link" className="px-0" onClick={() => history.push("/login")}>Đăng nhập</CButton>
                                        </CCol>
                                    </CRow>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    );
}

export default RecoverPassword