import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

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
    CForm,
    CAlert,
    CInputCheckbox
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { GetUserInfoAPI, UpdateExpertPermissionByIdAPI, UpdateUserInfoByUserIdAPI } from '../../../api/user';
import firebase from '../../../firebase/firebase';

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import vi from "date-fns/locale/vi";
import { format, parseISO } from 'date-fns';

const UpdateExpertModal = ({ selectedExpertUsername, show, handleClose, refreshDataFlag, setRefreshDataFlag }) => {
    const history = useHistory();

    const [updateExpertUUID, setUpdateExpertUUID] = useState("");
    const [updateExpertFullname, setUpdateExpertFullname] = useState("");
    const [updateExpertUsername, setUpdateExpertUsername] = useState("");
    const [updateExpertPassword, setUpdateExpertPassword] = useState("");
    const [updateExpertEmail, setUpdateExpertEmail] = useState("");
    const [updateExpertAddress, setUpdateExpertAddress] = useState("");
    const [updateExpertPhoneNumber, setUpdateExpertPhoneNumber] = useState("");
    const [updateExpertBirthday, setUpdateExpertBirthday] = useState("");
    const [updateExpertAvatarUrl, setUpdateExpertAvatarUrl] = useState("");
    const [updateExpertCanChat, setUpdateExpertCanChat] = useState(false);
    const [updateExpertCanJoinTranslationSession, setUpdateExpertCanJoinTranslationSession] = useState(false);
    const [updateExpertCanJoinLiveCallSession, setUpdateExpertCanJoinLiveCallSession] = useState(false);
    const [updateMessage, setUpdateMessage] = useState(null);

    //this useEffect will be executed every time the modal show
    useEffect(async () => {
        if (selectedExpertUsername != null) {
            const selectedExpertInfo = await GetUserInfoAPI(selectedExpertUsername);
            setUpdateExpertUUID(selectedExpertInfo.id);
            setUpdateExpertFullname(selectedExpertInfo.fullname);
            setUpdateExpertUsername(selectedExpertInfo.username);
            setUpdateExpertEmail(selectedExpertInfo.email);
            setUpdateExpertAddress(selectedExpertInfo.address);
            setUpdateExpertPhoneNumber(selectedExpertInfo.phone_number);
            if (selectedExpertInfo.birthday == "" || selectedExpertInfo.birthday == null) {
                setUpdateExpertBirthday("");
            } else {
                setUpdateExpertBirthday(parseISO(selectedExpertInfo.birthday));
            }
            setUpdateExpertAvatarUrl((selectedExpertInfo.avatar_url == "" || selectedExpertInfo.avatar_url == null) ? "" : selectedExpertInfo.avatar_url);
            setUpdateExpertCanChat(selectedExpertInfo.expert_details.can_chat);
            setUpdateExpertCanJoinTranslationSession(selectedExpertInfo.expert_details.can_join_translation_session);
            setUpdateExpertCanJoinLiveCallSession(selectedExpertInfo.expert_details.can_join_live_call_session);
        }
    }, [selectedExpertUsername]);

    const uploadToStorage = async (imageURL) => {
        let blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response); // when BlobModule finishes reading, resolve with the blob
            };
            xhr.onerror = function () {
                reject(new TypeError('Network request failed')); // error occurred, rejecting
            };
            xhr.responseType = 'blob'; // use BlobModule's UriHandler
            xhr.open('GET', imageURL, true); // fetch the blob from uri in async mode
            xhr.send(null); // no initial data
        });

        const storageRef = firebase.storage().ref();
        const imagesRef = storageRef.child('uploads/' + updateExpertUUID);
        const snapshot = await imagesRef.put(blob);
        const remoteUri = await snapshot.ref.getDownloadURL();

        // when we're done sending it, close and release the blob
        blob = null;

        return remoteUri;
    }

    const avtUrlUploadOnclick = () => {
        document.getElementById('updateExpertAvtUrlInput').click();
        document.getElementById('updateExpertAvtUrlInput').onchange = (e) => {
            var img = document.getElementById("updateExpertAvt");
            const fileSize = e.target.files[0].size;
            const fileType = e.target.files[0].type;
            if (fileSize <= 300000 && (fileType == "image/jpeg" || fileType == "image/png" || fileType == "image/jpg")) {
                // create blob url
                var blobUrl = URL.createObjectURL(e.target.files[0]);
                // use blob url to preview avatar
                img.src = blobUrl;
                setUpdateExpertAvatarUrl(blobUrl);
            } else {
                setUpdateMessage(<CAlert color="danger">Hệ thống chỉ chấp nhận file hình ảnh JPEG, JPG, PNG và dung lượng không quá 300KB</CAlert>);
            }
        }
    }

    const onSubmitUpdateForm = async (e) => {
        e.preventDefault();

        let userInput = {};
        let permissionInput = {};

        //check if uploaded file is blob file from local
        const isBlob = updateExpertAvatarUrl.includes("blob:");
        let newAvtSrc = updateExpertAvatarUrl;
        if (isBlob) {
            //upload local image to Firebase Storage
            newAvtSrc = await uploadToStorage(updateExpertAvatarUrl);
        } else {
            //do nothing
        }

        if (updateExpertPassword === "") {
            userInput = {
                "fullname": updateExpertFullname,
                "username": updateExpertUsername,
                "address": updateExpertAddress,
                "phone_number": updateExpertPhoneNumber,
                "birthday": ((updateExpertBirthday == "" || updateExpertBirthday == null) ? null : format(updateExpertBirthday, 'yyyy-MM-dd')),
                "avatar_url": newAvtSrc,
            }
            permissionInput = {
                "can_chat": updateExpertCanChat,
                "can_join_live_call_session": updateExpertCanJoinLiveCallSession,
                "can_join_translation_session": updateExpertCanJoinTranslationSession
            }
        } else {
            userInput = {
                "fullname": updateExpertFullname,
                "username": updateExpertUsername,
                "password": updateExpertPassword,
                "address": updateExpertAddress,
                "phone_number": updateExpertPhoneNumber,
                "birthday": ((updateExpertBirthday == "" || updateExpertBirthday == null) ? null : format(updateExpertBirthday, 'yyyy-MM-dd')),
                "avatar_url": newAvtSrc,
            }
            permissionInput = {
                "can_chat": updateExpertCanChat,
                "can_join_live_call_session": updateExpertCanJoinLiveCallSession,
                "can_join_translation_session": updateExpertCanJoinTranslationSession
            }
        }

        console.log(userInput);

        const updateResult = await UpdateUserInfoByUserIdAPI(updateExpertUUID, userInput);
        const permissionUpdateResult = await UpdateExpertPermissionByIdAPI(updateExpertUUID, permissionInput);

        if (updateResult === true && permissionUpdateResult === true) {
            setUpdateMessage(<CAlert color="success">Cập nhật thành công!</CAlert>);
            setRefreshDataFlag(!refreshDataFlag);
        } else {
            setUpdateMessage(<CAlert color="danger">Cập nhật thất bại!</CAlert>);
        }
    }

    registerLocale("vi", vi);

    return (
        <CModal
            show={show}
            onClose={handleClose()}
            closeOnBackdrop={false}
            color="success"
        >
            <CForm onSubmit={onSubmitUpdateForm} method="post" encType="multipart/form-data" className="form-horizontal">
                <CModalHeader closeButton>
                    <CModalTitle>Cập nhật Chuyên Gia</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="expert-uuid-input">UUID:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <p name="expert-id-static">{updateExpertUUID}</p>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="update-expert-fullname-input">Họ và tên:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="text" id="update-expert-fullname-input" name="fullname" value={updateExpertFullname} onChange={({ target }) => setUpdateExpertFullname(target.value)} />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="update-expert-username-input">Tên tài khoản:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="text" id="update-expert-username-input" name="username" value={updateExpertUsername} required={true} onChange={({ target }) => setUpdateExpertUsername(target.value)} />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="update-expert-password-input">Mật khẩu:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="password" id="update-expert-password-input" name="update-expert-password-input" placeholder="[Không thay đổi]" value={updateExpertPassword} onChange={({ target }) => setUpdateExpertPassword(target.value)} />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="update-expert-email-input">Email:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="email" id="update-expert-email-input" name="update-expert-email-input" autoComplete="email" value={updateExpertEmail} required={true} readOnly />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="update-expert-birthday-input">Ngày sinh:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            {(updateExpertBirthday == "" || updateExpertBirthday == null) ?
                                <DatePicker
                                    className="form-control"
                                    locale="vi"
                                    id="update-expert-birthday-input"
                                    name="update-expert-birthday-input"
                                    placeholderText="Ngày-Tháng-Năm"
                                    onChange={date => setUpdateExpertBirthday(date)}
                                    dateFormat="dd-MM-yyyy"
                                />
                                :
                                <DatePicker
                                    className="form-control"
                                    locale="vi"
                                    id="update-expert-birthday-input"
                                    name="update-expert-birthday-input"
                                    selected={updateExpertBirthday}
                                    placeholderText="Ngày-Tháng-Năm"
                                    onChange={date => setUpdateExpertBirthday(date)}
                                    dateFormat="dd-MM-yyyy"
                                    value={updateExpertBirthday}
                                />
                            }
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="update-expert-address-input">Địa chỉ:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="text" id="update-expert-address-input" name="update-expert-address-input" value={updateExpertAddress} onChange={({ target }) => setUpdateExpertAddress(target.value)} />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="update-expert-phone-input">Số điện thoại:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="tel" id="update-expert-phone-input" name="update-expert-phone-input" value={updateExpertPhoneNumber} onChange={({ target }) => setUpdateExpertPhoneNumber(target.value)} />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="update-expert-permission">Quyền hạn:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CLabel htmlFor="update-expert-can-chat"
                                className="w-100 permission-input-checkbox">
                                <CInputCheckbox
                                    id="update-expert-can-chat"
                                    name="update-expert-can-chat"
                                    checked={updateExpertCanChat}
                                    onChange={({ target }) => setUpdateExpertCanChat(target.checked)} />
                                Tham gia Phiên Nhắn Tin
                                </CLabel>
                            <CLabel htmlFor="update-expert-can-join-live-call-session"
                                className="w-100 permission-input-checkbox">
                                <CInputCheckbox
                                    id="update-expert-can-join-live-call-session"
                                    name="update-expert-can-join-live-call-session"
                                    checked={updateExpertCanJoinLiveCallSession}
                                    onChange={({ target }) => setUpdateExpertCanJoinLiveCallSession(target.checked)} />
                                Tham gia Phiên Gọi Trực Tuyến
                                </CLabel>
                            <CLabel htmlFor="update-expert-can-join-translation-session"
                                className="w-100 permission-input-checkbox">
                                <CInputCheckbox
                                    id="update-expert-can-join-translation-session"
                                    name="update-expert-can-join-translation-session"
                                    checked={updateExpertCanJoinTranslationSession}
                                    onChange={({ target }) => setUpdateExpertCanJoinTranslationSession(target.checked)}
                                />
                                Tham gia Phòng Phiên Dịch
                                </CLabel>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CLabel col md="4" htmlFor="update-expert-avatar-url">Ảnh đại diện:</CLabel>
                        <CCol xs="12" md="8">
                            <img id="updateExpertAvt" className="mr-2" src={updateExpertAvatarUrl} width="80" height="80" />
                            <CButton
                                color="info"
                                className="rounded-circle"
                                onClick={avtUrlUploadOnclick}
                            ><CIcon name="cil-pencil"></CIcon></CButton>
                            <CInputFile class="d-none" id="updateExpertAvtUrlInput" name="update-expert-avatar-url" />
                        </CCol>
                    </CFormGroup>
                    {updateMessage}
                </CModalBody>
                <CModalFooter>
                    <CButton color="success" type="submit">
                        Cập nhật
                        </CButton>
                    <CButton color="secondary" onClick={handleClose()}>
                        Đóng
                        </CButton>
                </CModalFooter>
            </CForm>
        </CModal>
    );
}

export default UpdateExpertModal