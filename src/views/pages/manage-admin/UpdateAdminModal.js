import React, { useState, useEffect } from 'react'

import {
    CCol,
    CRow,
    CInput,
    CButton,
    CModal,
    CModalHeader,
    CModalBody,
    CModalFooter,
    CModalTitle,
    CLabel,
    CFormGroup,
    CInputFile,
    CForm
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import vi from "date-fns/locale/vi";
import { format } from 'date-fns';

import { GetUserInfoAPI } from '../../../api/user';

const UpdateAdminModal = ({ selectedAdminUsername, show, handleClose }) => {

    const [updateAdminUUID, setUpdateAdminUUID] = useState("");
    const [updateAdminFullname, setUpdateAdminFullname] = useState("");
    const [updateAdminUsername, setUpdateAdminUsername] = useState("");
    const [updateAdminPassword, setUpdateAdminPassword] = useState("");
    const [updateAdminEmail, setUpdateAdminEmail] = useState("");
    const [updateAdminAddress, setUpdateAdminAddress] = useState("");
    const [updateAdminPhoneNumber, setUpdateAdminPhoneNumber] = useState("");
    const [updateAdminBirthday, setUpdateAdminBirthday] = useState("");
    const [updateAdminAvatarUrl, setUpdateAdminAvatarUrl] = useState("");

    const avtUrlUploadOnclick = () => {
        document.getElementById('updateAdminAvtUrlInput').click();
        document.getElementById('updateAdminAvtUrlInput').onchange = (e) => {
            var img = document.getElementById("updateAdminAvt");
            // create blob url
            var blobUrl = URL.createObjectURL(e.target.files[0]);
            // use blob url to preview avatar
            setUpdateAdminAvatarUrl(blobUrl);
            img.onload = () => {
                // delete blob url when the avatar loaded successfully
                URL.revokeObjectURL(blobUrl);
            }
        }
    }

    //this useEffect will be executed every time the modal show
    useEffect(async () => {
        if (selectedAdminUsername != null) {
            const selectedAdminInfo = await GetUserInfoAPI(selectedAdminUsername);
            setUpdateAdminUUID(selectedAdminInfo.id);
            setUpdateAdminFullname(selectedAdminInfo.fullname);
            setUpdateAdminUsername(selectedAdminInfo.username);
            setUpdateAdminEmail(selectedAdminInfo.email);
            setUpdateAdminAddress(selectedAdminInfo.address);
            setUpdateAdminPhoneNumber(selectedAdminInfo.phone_number);
            setUpdateAdminBirthday(selectedAdminInfo.birthday);
            setUpdateAdminAvatarUrl(selectedAdminInfo.avatar_url);
        }
    }, [show]);

    registerLocale("vi", vi);

    return (
        <CModal
            show={show}
            onClose={handleClose()}
            closeOnBackdrop={false}
            color="success"
        >
            <CModalHeader closeButton>
                <CModalTitle>Cập nhật Quản Trị Viên</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="admin-uuid-input">UUID:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <p name="admin-id-static">{updateAdminUUID}</p>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="update-admin-fullname-input">Họ và tên:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="text" id="update-admin-fullname-input" name="username" value={updateAdminFullname} required={true} onChange={({ target }) => setUpdateAdminFullname(target.value)} />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="update-admin-username-input">Tên đăng nhập:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="text" id="update-admin-username-input" name="username" value={updateAdminUsername} required={true} onChange={({ target }) => setUpdateAdminUsername(target.value)} />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="update-admin-password-input">Mật khẩu</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="password" id="update-admin-password-input" name="update-admin-password-input" value={updateAdminPassword} required={true} onChange={({ target }) => setUpdateAdminPassword(target.value)} />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="update-admin-email-input">Email</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="email" id="update-admin-email-input" name="update-admin-email-input" autoComplete="email" value={updateAdminEmail} required={true} onChange={({ target }) => setUpdateAdminEmail(target.value)} />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="update-admin-birthday-input">Ngày sinh</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <DatePicker
                                className="form-control"
                                locale="vi"
                                id="update-admin-birthday-input"
                                name="update-admin-birthday-input"
                                //selected={updateAdminBirthday}
                                placeholderText="Ngày/Tháng/Năm"
                                onChange={(date) => setUpdateAdminBirthday(format(date, 'dd/MM/yyyy'))}
                                required={true}
                                value={updateAdminBirthday}
                                dateFormat="dd/MM/yyyy" />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="update-admin-address-input">Địa chỉ</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="text" id="update-admin-address-input" name="update-admin-address-input" value={updateAdminAddress} onChange={({ target }) => setUpdateAdminAddress(target.value)} />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="update-admin-phone-input">Số điện thoại</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="tel" id="update-admin-phone-input" name="update-admin-phone-input" value={updateAdminPhoneNumber} onChange={({ target }) => setUpdateAdminPhoneNumber(target.value)} />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CLabel col md="4" htmlFor="update-admin-avatar-url">Ảnh đại diện</CLabel>
                        <CCol xs="12" md="8">
                            <img id="updateAdminAvt" className="mr-2" src={updateAdminAvatarUrl} width="80" height="80" />
                            <CButton
                                color="info"
                                className="rounded-circle"
                                onClick={avtUrlUploadOnclick}
                            ><CIcon name="cil-pencil"></CIcon></CButton>
                            <CInputFile class="d-none" id="updateAdminAvtUrlInput" name="update-admin-avatar-url" />
                        </CCol>
                    </CFormGroup>
                </CForm>
            </CModalBody>
            <CModalFooter>
                <CButton color="success" onClick={handleClose()}>
                    Cập nhật
        </CButton>{' '}
                <CButton color="secondary" onClick={handleClose()}>
                    Hủy
        </CButton>
            </CModalFooter>
        </CModal>
    );
}

export default UpdateAdminModal