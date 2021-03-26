import React, { useState, useEffect } from 'react'

import {
    CCol,
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

const UpdateModeratorModal = ({ selectedModeratorUsername, show, handleClose }) => {

    const [updateModeratorUUID, setUpdateModeratorUUID] = useState("");
    const [updateModeratorFullname, setUpdateModeratorFullname] = useState("");
    const [updateModeratorUsername, setUpdateModeratorUsername] = useState("");
    const [updateModeratorPassword, setUpdateModeratorPassword] = useState("");
    const [updateModeratorEmail, setUpdateModeratorEmail] = useState("");
    const [updateModeratorAddress, setUpdateModeratorAddress] = useState("");
    const [updateModeratorPhoneNumber, setUpdateModeratorPhoneNumber] = useState("");
    const [updateModeratorBirthday, setUpdateModeratorBirthday] = useState("");
    const [updateModeratorAvatarUrl, setUpdateModeratorAvatarUrl] = useState("");

    const avtUrlUploadOnclick = () => {
        document.getElementById('updateModeratorAvtUrlInput').click();
        document.getElementById('updateModeratorAvtUrlInput').onchange = (e) => {
            var img = document.getElementById("updateModeratorAvt");
            // create blob url
            var blobUrl = URL.createObjectURL(e.target.files[0]);
            // use blob url to preview avatar
            setUpdateModeratorAvatarUrl(blobUrl);
            img.onload = () => {
                // delete blob url when the avatar loaded successfully
                URL.revokeObjectURL(blobUrl);
            }
        }
    }

    //this useEffect will be executed every time the modal show
    useEffect(async () => {
        if (selectedModeratorUsername != null) {
            const selectedModeratorInfo = await GetUserInfoAPI(selectedModeratorUsername);
            setUpdateModeratorUUID(selectedModeratorInfo.id);
            setUpdateModeratorFullname(selectedModeratorInfo.fullname);
            setUpdateModeratorUsername(selectedModeratorInfo.username);
            setUpdateModeratorEmail(selectedModeratorInfo.email);
            setUpdateModeratorAddress(selectedModeratorInfo.address);
            setUpdateModeratorPhoneNumber(selectedModeratorInfo.phone_number);
            setUpdateModeratorBirthday(selectedModeratorInfo.birthday);
            setUpdateModeratorAvatarUrl(selectedModeratorInfo.avatar_url);
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
                <CModalTitle>Cập nhật Điều Hành Viên</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="moderator-uuid-input">UUID:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <p name="moderator-id-static">{updateModeratorUUID}</p>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="update-moderator-fullname-input">Họ và tên:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="text" id="update-moderator-fullname-input" name="username" value={updateModeratorFullname} required={true} onChange={({ target }) => setUpdateModeratorFullname(target.value)} />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="update-moderator-username-input">Tên đăng nhập:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="text" id="update-moderator-username-input" name="username" value={updateModeratorUsername} required={true} onChange={({ target }) => setUpdateModeratorUsername(target.value)} />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="update-moderator-password-input">Mật khẩu</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="password" id="update-moderator-password-input" name="update-moderator-password-input" value={updateModeratorPassword} required={true} onChange={({ target }) => setUpdateModeratorPassword(target.value)} />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="update-moderator-email-input">Email</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="email" id="update-moderator-email-input" name="update-moderator-email-input" autoComplete="email" value={updateModeratorEmail} required={true} onChange={({ target }) => setUpdateModeratorEmail(target.value)} />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="update-moderator-birthday-input">Ngày sinh</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <DatePicker
                                className="form-control"
                                locale="vi"
                                id="update-moderator-birthday-input"
                                name="update-moderator-birthday-input"
                                //selected={updateModeratorBirthday}
                                placeholderText="Ngày/Tháng/Năm"
                                onChange={(date) => setUpdateModeratorBirthday(format(date, 'dd/MM/yyyy'))}
                                required={true}
                                value={updateModeratorBirthday}
                                dateFormat="dd/MM/yyyy" />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="update-moderator-address-input">Địa chỉ</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="text" id="update-moderator-address-input" name="update-moderator-address-input" value={updateModeratorAddress} onChange={({ target }) => setUpdateModeratorAddress(target.value)} />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="update-moderator-phone-input">Số điện thoại</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="tel" id="update-moderator-phone-input" name="update-moderator-phone-input" value={updateModeratorPhoneNumber} onChange={({ target }) => setUpdateModeratorPhoneNumber(target.value)} />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CLabel col md="4" htmlFor="update-moderator-avatar-url">Ảnh đại diện</CLabel>
                        <CCol xs="12" md="8">
                            <img id="updateModeratorAvt" className="mr-2" src={updateModeratorAvatarUrl} width="80" height="80" />
                            <CButton
                                color="info"
                                className="rounded-circle"
                                onClick={avtUrlUploadOnclick}
                            ><CIcon name="cil-pencil"></CIcon></CButton>
                            <CInputFile class="d-none" id="updateModeratorAvtUrlInput" name="update-moderator-avatar-url" />
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

export default UpdateModeratorModal