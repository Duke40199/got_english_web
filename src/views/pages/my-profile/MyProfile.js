import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CForm,
    CInputFile,
    CInput,
    CRow,
    CLabel
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import vi from "date-fns/locale/vi";



const MyProfile = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const history = useHistory();
    const [avtSrc, setAvtSrc] = useState(userInfo.avatar_url);

    const avtUrlUploadOnclick = () => {
        document.getElementById('avtUrlInput').click();
        document.getElementById('avtUrlInput').onchange = (e) => {
            var img = document.getElementById("myProfileAvt");
            // create blob url
            var blobUrl = URL.createObjectURL(e.target.files[0]);
            // use blob url to preview avatar
            setAvtSrc(blobUrl);
            img.onload = () => {
                // delete blob url when the avatar loaded successfully
                URL.revokeObjectURL(blobUrl);
            }
        }
    }

    return (
        <CCard>
            <CCardBody>
                <CForm>
                    <CRow>
                        <CCol sm="4" className="text-center">
                            <div className="rounded-circle d-inline-block overflow-hidden border-2 border-dark position-relative" width="auto">
                                <img id="myProfileAvt" src={avtSrc} width="250" height="250" />
                                <CButton
                                    onClick={avtUrlUploadOnclick}
                                    color="info"
                                    className="rounded-circle upload-avt-button position-absolute"
                                    width="150">
                                    <CIcon name="cil-pencil"></CIcon>
                                </CButton>
                            </div>
                            <CInputFile
                                className="d-none"
                                id="avtUrlInput"
                                name="input-avatar-url"
                            />
                        </CCol>
                        <CCol sm="7">
                            <CRow>
                                <CCol>
                                    <CLabel htmlFor="uuid">UUID:</CLabel>
                                    <CInput value={userInfo.id} readOnly />
                                </CCol>
                            </CRow>
                            <CRow className="mt-2">
                                <CCol>
                                    <CLabel htmlFor="username">Tên đăng nhập:</CLabel>
                                    <CInput value={userInfo.username} />
                                </CCol>
                                <CCol>
                                    <CLabel htmlFor="phone_number">Số điện thoại:</CLabel>
                                    <CInput value={userInfo.phone_number} />
                                </CCol>
                            </CRow>
                            <CRow className="mt-2">
                                <CCol>
                                    <CLabel htmlFor="email">Email:</CLabel>
                                    <CInput value={userInfo.email} />
                                </CCol>
                                <CCol>
                                    <CLabel htmlFor="birthday">Ngày sinh:</CLabel>
                                    <CInput value={userInfo.birthday} />
                                </CCol>
                            </CRow>
                            <CRow className="mt-2">
                                <CCol>
                                    <CLabel htmlFor="address">Địa chỉ:</CLabel>
                                    <CInput value={userInfo.address} />
                                </CCol>
                            </CRow>
                            <CRow className="mt-2">
                                <CCol>
                                    <CLabel htmlFor="birthday">Ngày đăng ký:</CLabel>
                                    <CInput value={userInfo.created_at} readOnly />
                                </CCol>
                                <CCol>
                                    <CLabel htmlFor="birthday">Lần cập nhật gần nhất lúc:</CLabel>
                                    <CInput value={userInfo.updated_at} readOnly />
                                </CCol>
                            </CRow>
                            <CRow className="mt-4 text-center">
                                <CCol>
                                    <CButton className="mr-2" color="success">Cập nhật</CButton>
                                    <CButton color="secondary" onClick={() => history.push("/")}>Trở về Trang Chủ</CButton >
                                </CCol>
                            </CRow>
                        </CCol>
                    </CRow>
                </CForm>
            </CCardBody>
        </CCard>
    )
}

export default MyProfile