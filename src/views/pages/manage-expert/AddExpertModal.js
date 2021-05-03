import React, { useState } from 'react'

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
    CInputCheckbox,
    CInvalidFeedback
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { CreateUserAPI, UpdateUserInfoByUserIdAPI, UpdateExpertPermissionByIdAPI } from '../../../api/user';
import firebase from '../../../firebase/firebase';
import jwt_decode from 'jwt-decode'
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import vi from "date-fns/locale/vi";
import { format } from 'date-fns';

import AccountValidator from '../../../reusable/AccountValidator';

import { usePromiseTracker, trackPromise } from "react-promise-tracker";

const AddExpertModal = ({ show, handleClose, refreshDataFlag, setRefreshDataFlag }) => {
    const [addExpertFullname, setAddExpertFullname] = useState("");
    const [addExpertUsername, setAddExpertUsername] = useState("");
    const [addExpertPassword, setAddExpertPassword] = useState("");
    const [addExpertEmail, setAddExpertEmail] = useState("");
    const [addExpertAddress, setAddExpertAddress] = useState("");
    const [addExpertPhoneNumber, setAddExpertPhoneNumber] = useState("");
    const [addExpertBirthday, setAddExpertBirthday] = useState("");
    const [addExpertAvatarUrl, setAddExpertAvatarUrl] = useState("");
    const [addExpertCanChat, setAddExpertCanChat] = useState(false);
    const [addExpertCanJoinTranslationSession, setAddExpertCanJoinTranslationSession] = useState(false);
    const [addExpertCanJoinLiveCallSession, setAddExpertCanJoinLiveCallSession] = useState(false);
    const [fieldErrorMessages, setFieldErrorMessages] = useState({});
    const [addMessage, setAddMessage] = useState(null);

    const { promiseInProgress } = usePromiseTracker();

    const uploadToStorage = async (imageURL, addExpertUUID) => {
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
        const imagesRef = storageRef.child('uploads/' + addExpertUUID);
        const snapshot = await imagesRef.put(blob);
        const remoteUri = await snapshot.ref.getDownloadURL();

        // when we're done sending it, close and release the blob
        blob = null;

        return remoteUri;
    }

    const avtUrlUploadOnclick = () => {
        document.getElementById('addExpertAvtUrlInput').click();
        document.getElementById('addExpertAvtUrlInput').onchange = (e) => {
            var img = document.getElementById("addExpertAvt");
            const fileSize = e.target.files[0].size;
            const fileType = e.target.files[0].type;
            if (fileSize <= 300000 && (fileType === "image/jpeg" || fileType === "image/png" || fileType === "image/jpg")) {
                // create blob url
                var blobUrl = URL.createObjectURL(e.target.files[0]);
                // use blob url to preview avatar
                img.src = blobUrl;
                setAddExpertAvatarUrl(blobUrl);
            } else {
                setAddMessage(<CAlert color="danger">Hệ thống chỉ chấp nhận file hình ảnh JPEG, JPG, PNG và dung lượng không quá 300KB</CAlert>);
            }
        }
    }

    const onSubmitAddForm = async (e) => {
        e.preventDefault();

        const userInput = {
            "fullname": addExpertFullname,
            "username": addExpertUsername,
            "password": addExpertPassword,
            "email": addExpertEmail,
            "address": addExpertAddress,
            "phone_number": addExpertPhoneNumber
        }

        const formValidate = AccountValidator(userInput);
        const noErrors = Object.keys(formValidate).length === 0;

        if (noErrors) {
            const addExpertData = {
                "username": addExpertUsername,
                "password": addExpertPassword,
                "email": addExpertEmail,
                "role_name": "Expert"
            };

            const addExpertResult = await trackPromise(CreateUserAPI(addExpertData));

            if (addExpertResult != null) {
                if (addExpertResult.success === true) {
                    const newExpertToken = addExpertResult.data.token;
                    const newExpertID = (jwt_decode(newExpertToken)).claims.id;
                    let newAvtSrc = ""
                    //check if uploaded file is blob file from local
                    if (addExpertAvatarUrl != null) {
                        const isBlob = addExpertAvatarUrl.includes("blob:");
                        newAvtSrc = addExpertAvatarUrl;
                        if (isBlob) {
                            //upload local image to Firebase Storage
                            newAvtSrc = await trackPromise(uploadToStorage(addExpertAvatarUrl, newExpertID));
                        } else {
                            //do nothing
                        }
                    }

                    const additionalData = {
                        "fullname": addExpertFullname,
                        "address": addExpertAddress,
                        "phone_number": addExpertPhoneNumber,
                        "birthday": ((addExpertBirthday === "" || addExpertBirthday == null) ? "" : format(addExpertBirthday, 'yyyy-MM-dd')),
                        "avatar_url": newAvtSrc
                    }
                    const permissionInput = {
                        "can_chat": addExpertCanChat,
                        "can_join_live_call_session": addExpertCanJoinLiveCallSession,
                        "can_join_translation_session": addExpertCanJoinTranslationSession
                    }

                    const addExpertAvt = await trackPromise(UpdateUserInfoByUserIdAPI(newExpertID, additionalData));
                    const permissionAddResult = await trackPromise(UpdateExpertPermissionByIdAPI(newExpertID, permissionInput));

                    if (addExpertAvt === true && permissionAddResult === true) {
                        setAddMessage(<CAlert color="success">Thêm mới thành công!</CAlert>);
                    } else {
                        setAddMessage(<CAlert color="danger">Thêm mới thành công! Tuy nhiên phần thông tin cập nhật đã gặp sự cố. Hãy sử dụng chức năng Cập nhật để cập nhật lại thông tin.</CAlert>);
                    }
                    setRefreshDataFlag(!refreshDataFlag);
                } else {
                    setAddMessage(<CAlert color="danger">{addExpertResult}</CAlert>);
                }
            } else {
                setAddMessage(<CAlert color="danger">{addExpertResult}</CAlert>);
            }
            //clear errors if any
            setFieldErrorMessages({});
        } else {
            setFieldErrorMessages(formValidate);
            setAddMessage(null);
        }
    }

    registerLocale("vi", vi);

    return (
        <CModal
            show={show}
            onClose={handleClose()}
            closeOnBackdrop={false}
            color="primary"
        >
            <CForm onSubmit={onSubmitAddForm} method="post" encType="multipart/form-data" className="form-horizontal">
                <CModalHeader closeButton>
                    <CModalTitle>Thêm mới Chuyên Gia</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="expert-fullname-input">Họ và tên:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput id="expert-fullname-input" name="expert-fullname-input" onChange={({ target }) => setAddExpertFullname(target.value)} />
                            {fieldErrorMessages.fullname != null ? <CInvalidFeedback
                                className="d-block"
                            >
                                {fieldErrorMessages.fullname}
                            </CInvalidFeedback>
                                : null}
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel className="required" htmlFor="expert-username-input">Tên tài khoản:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput id="expert-username-input" name="expert-username-input" onChange={({ target }) => setAddExpertUsername(target.value)} required />
                            {fieldErrorMessages.username != null ? <CInvalidFeedback
                                className="d-block"
                            >
                                {fieldErrorMessages.username}
                            </CInvalidFeedback>
                                : null}
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel className="required" htmlFor="expert-password-input">Mật khẩu:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="password" id="expert-password-input" name="expert-password-input" onChange={({ target }) => setAddExpertPassword(target.value)} required />
                            {fieldErrorMessages.password != null ? <CInvalidFeedback
                                className="d-block"
                            >
                                {fieldErrorMessages.password}
                            </CInvalidFeedback>
                                : null}
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel className="required" htmlFor="expert-email-input">Email:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="email" id="expert-email-input" name="expert-email-input" autoComplete="email" onChange={({ target }) => setAddExpertEmail(target.value)} required />
                            {fieldErrorMessages.email != null ? <CInvalidFeedback
                                className="d-block"
                            >
                                {fieldErrorMessages.email}
                            </CInvalidFeedback>
                                : null}
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="expert-birthday-input">Ngày sinh:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            {(addExpertBirthday === "" || addExpertBirthday == null) ?
                                <DatePicker
                                    className="form-control"
                                    locale="vi"
                                    id="expert-birthday-input"
                                    name="expert-birthday-input"
                                    placeholderText="Ngày-Tháng-Năm"
                                    onChange={date => setAddExpertBirthday(date)}
                                    dateFormat="dd-MM-yyyy"
                                    maxDate={new Date()}
                                />
                                :

                                <DatePicker
                                    className="form-control"
                                    locale="vi"
                                    id="expert-birthday-input"
                                    name="expert-birthday-input"
                                    placeholderText="Ngày-Tháng-Năm"
                                    selected={addExpertBirthday}
                                    onChange={date => setAddExpertBirthday(date)}
                                    dateFormat="dd-MM-yyyy"
                                    value={addExpertBirthday}
                                    maxDate={new Date()}
                                />
                            }

                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="expert-address-input">Địa chỉ:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="text" id="expert-address-input" name="expert-address-input" onChange={({ target }) => setAddExpertAddress(target.value)} />
                            {fieldErrorMessages.address != null ? <CInvalidFeedback
                                className="d-block"
                            >
                                {fieldErrorMessages.address}
                            </CInvalidFeedback>
                                : null}
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="expert-phone-input">Số điện thoại:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="text" id="expert-phone-input" name="expert-phone-input" onChange={({ target }) => setAddExpertPhoneNumber(target.value)} />
                            {fieldErrorMessages.phone_number != null ? <CInvalidFeedback
                                className="d-block"
                            >
                                {fieldErrorMessages.phone_number}
                            </CInvalidFeedback>
                                : null}
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="add-expert-permission">Quyền hạn:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CLabel htmlFor="add-expert-can-chat"
                                className="w-100 permission-input-checkbox">
                                <CInputCheckbox
                                    id="add-expert-can-chat"
                                    name="add-expert-can-chat"
                                    checked={addExpertCanChat}
                                    onChange={({ target }) => setAddExpertCanChat(target.checked)} />
                                Tham gia Phiên Nhắn Tin
                                </CLabel>
                            <CLabel htmlFor="add-expert-can-join-live-call-session"
                                className="w-100 permission-input-checkbox">
                                <CInputCheckbox
                                    id="add-expert-can-join-live-call-session"
                                    name="add-expert-can-join-live-call-session"
                                    checked={addExpertCanJoinLiveCallSession}
                                    onChange={({ target }) => setAddExpertCanJoinLiveCallSession(target.checked)} />
                                Tham gia Phiên Gọi Trực Tuyến
                                </CLabel>
                            <CLabel htmlFor="add-expert-can-join-translation-session"
                                className="w-100 permission-input-checkbox">
                                <CInputCheckbox
                                    id="add-expert-can-join-translation-session"
                                    name="add-expert-can-join-translation-session"
                                    checked={addExpertCanJoinTranslationSession}
                                    onChange={({ target }) => setAddExpertCanJoinTranslationSession(target.checked)}
                                />
                                Tham gia Phòng Phiên Dịch
                                </CLabel>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CLabel col md="4" htmlFor="expert-avatar-url">Ảnh đại diện:</CLabel>
                        <CCol xs="12" md="8">
                            <img id="addExpertAvt" alt="Expert Avatar" className="mr-2" src={addExpertAvatarUrl} width="80" height="80" />
                            <CButton
                                color="info"
                                className="rounded-circle"
                                onClick={avtUrlUploadOnclick}
                            ><CIcon name="cil-pencil"></CIcon></CButton>
                            <CInputFile className="d-none" id="addExpertAvtUrlInput" name="expert-avatar-url" />
                        </CCol>
                    </CFormGroup>
                    {addMessage}
                </CModalBody>
                <CModalFooter>
                    <CButton color="primary" type="submit" disabled={promiseInProgress}>
                        Thêm
                </CButton>
                    <CButton color="secondary" onClick={handleClose()}>
                        Đóng
                </CButton>
                </CModalFooter>
            </CForm>
        </CModal>
    );
}

export default AddExpertModal