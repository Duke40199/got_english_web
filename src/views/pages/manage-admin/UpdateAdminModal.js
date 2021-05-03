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
    CForm,
    CAlert,
    CInputCheckbox,
    CInvalidFeedback
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { usePromiseTracker, trackPromise } from "react-promise-tracker";

import { GetUserInfoAPI, UpdateUserInfoByUserIdAPI, UpdateAdminPermissionByIdAPI } from '../../../api/user';
import firebase from '../../../firebase/firebase';

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import vi from "date-fns/locale/vi";
import { format, parseISO } from 'date-fns';

import AccountValidator from '../../../reusable/AccountValidator';

const UpdateAdminModal = ({ selectedAdminUsername, show, handleClose, refreshDataFlag, setRefreshDataFlag }) => {
    const [updateAdminUUID, setUpdateAdminUUID] = useState("");
    const [updateAdminFullname, setUpdateAdminFullname] = useState("");
    const [updateAdminUsername, setUpdateAdminUsername] = useState("");
    const [updateAdminPassword, setUpdateAdminPassword] = useState("");
    const [updateAdminEmail, setUpdateAdminEmail] = useState("");
    const [updateAdminAddress, setUpdateAdminAddress] = useState("");
    const [updateAdminPhoneNumber, setUpdateAdminPhoneNumber] = useState("");
    const [updateAdminBirthday, setUpdateAdminBirthday] = useState("");
    const [updateAdminAvatarUrl, setUpdateAdminAvatarUrl] = useState("");
    const [updateAdminCanManageLearner, setUpdateAdminCanManageLearner] = useState(false);
    const [updateAdminCanManageExpert, setUpdateAdminCanManageExpert] = useState(false);
    const [updateAdminCanManageModerator, setUpdateAdminCanManageModerator] = useState(false);
    const [updateAdminCanManageAdmin, setUpdateAdminCanManageAdmin] = useState(false);
    const [fieldErrorMessages, setFieldErrorMessages] = useState({});
    const [updateMessage, setUpdateMessage] = useState(null);

    const { promiseInProgress } = usePromiseTracker();

    //this useEffect will be executed every time the modal show
    useEffect(() => {
        async function fetchData() {
            if (selectedAdminUsername != null) {
                const selectedAdminInfo = await trackPromise(GetUserInfoAPI(selectedAdminUsername, 'Admin'));
                if (selectedAdminInfo != null) {
                    setUpdateAdminUUID(selectedAdminInfo.id);
                    setUpdateAdminFullname(selectedAdminInfo.fullname);
                    setUpdateAdminUsername(selectedAdminInfo.username);
                    setUpdateAdminEmail(selectedAdminInfo.email);
                    setUpdateAdminAddress(selectedAdminInfo.address);
                    setUpdateAdminPhoneNumber(selectedAdminInfo.phone_number);
                    if (selectedAdminInfo.birthday === "" || selectedAdminInfo.birthday == null) {
                        setUpdateAdminBirthday("");
                    } else {
                        setUpdateAdminBirthday(parseISO(selectedAdminInfo.birthday));
                    }
                    setUpdateAdminAvatarUrl((selectedAdminInfo.avatar_url === "" || selectedAdminInfo.avatar_url == null) ? "" : selectedAdminInfo.avatar_url);
                    setUpdateAdminCanManageLearner(selectedAdminInfo.admin_details.can_manage_learner);
                    setUpdateAdminCanManageExpert(selectedAdminInfo.admin_details.can_manage_expert);
                    setUpdateAdminCanManageModerator(selectedAdminInfo.admin_details.can_manage_moderator);
                    setUpdateAdminCanManageAdmin(selectedAdminInfo.admin_details.can_manage_admin);
                }
            }
        }
        fetchData();
    }, [selectedAdminUsername]);

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
        const imagesRef = storageRef.child('uploads/' + updateAdminUUID);
        const snapshot = await imagesRef.put(blob);
        const remoteUri = await snapshot.ref.getDownloadURL();

        // when we're done sending it, close and release the blob
        blob = null;

        return remoteUri;
    }

    const avtUrlUploadOnclick = () => {
        document.getElementById('updateAdminAvtUrlInput').click();
        document.getElementById('updateAdminAvtUrlInput').onchange = (e) => {
            var img = document.getElementById("updateAdminAvt");
            const fileSize = e.target.files[0].size;
            const fileType = e.target.files[0].type;
            if (fileSize <= 300000 && (fileType === "image/jpeg" || fileType === "image/png" || fileType === "image/jpg")) {
                // create blob url
                var blobUrl = URL.createObjectURL(e.target.files[0]);
                // use blob url to preview avatar
                img.src = blobUrl;
                setUpdateAdminAvatarUrl(blobUrl);
            } else {
                setUpdateMessage(<CAlert color="danger">Hệ thống chỉ chấp nhận file hình ảnh JPEG, JPG, PNG và dung lượng không quá 300KB</CAlert>);
            }
        }
    }

    const onSubmitUpdateForm = async (e) => {
        e.preventDefault();

        const userInput = {
            "fullname": (updateAdminFullname != null) ? updateAdminFullname : null,
            "username": updateAdminUsername,
            "password": (updateAdminPassword !== "") ? updateAdminPassword : null,
            "email": updateAdminEmail,
            "address": (updateAdminAddress != null) ? updateAdminAddress : null,
            "phone_number": (updateAdminPhoneNumber != null) ? updateAdminPhoneNumber : null
        }

        const formValidate = AccountValidator(userInput);
        const noErrors = Object.keys(formValidate).length === 0;

        if (noErrors) {
            let updateAdminData = {};
            let permissionInput = {};
            let newAvtSrc = "";

            //check if uploaded file is blob file from local
            if (updateAdminAvatarUrl != null) {
                const isBlob = updateAdminAvatarUrl.includes("blob:");
                newAvtSrc = updateAdminAvatarUrl;
                if (isBlob) {
                    //upload local image to Firebase Storage
                    newAvtSrc = await trackPromise(uploadToStorage(updateAdminAvatarUrl));
                } else {
                    //do nothing
                }
            }

            if (updateAdminPassword === "") {
                updateAdminData = {
                    "fullname": updateAdminFullname,
                    "username": updateAdminUsername,
                    "address": updateAdminAddress,
                    "phone_number": updateAdminPhoneNumber,
                    "birthday": ((updateAdminBirthday !== "" && updateAdminBirthday != null) ? format(updateAdminBirthday, 'yyyy-MM-dd') : ""),
                    "avatar_url": newAvtSrc,

                }
                permissionInput = {
                    "can_manage_learner": updateAdminCanManageLearner,
                    "can_manage_expert": updateAdminCanManageExpert,
                    "can_manage_moderator": updateAdminCanManageModerator,
                    "can_manage_admin": updateAdminCanManageAdmin
                }
            } else {
                updateAdminData = {
                    "fullname": updateAdminFullname,
                    "username": updateAdminUsername,
                    "password": updateAdminPassword,
                    "address": updateAdminAddress,
                    "phone_number": updateAdminPhoneNumber,
                    "birthday": ((updateAdminBirthday !== "" && updateAdminBirthday != null) ? format(updateAdminBirthday, 'yyyy-MM-dd') : ""),
                    "avatar_url": newAvtSrc,
                }
                permissionInput = {
                    "can_manage_learner": updateAdminCanManageLearner,
                    "can_manage_expert": updateAdminCanManageExpert,
                    "can_manage_moderator": updateAdminCanManageModerator,
                    "can_manage_admin": updateAdminCanManageAdmin
                }
            }

            const updateResult = await trackPromise(UpdateUserInfoByUserIdAPI(updateAdminUUID, updateAdminData));
            const permissionUpdateResult = await trackPromise(UpdateAdminPermissionByIdAPI(updateAdminUUID, permissionInput));

            if (updateResult === true && permissionUpdateResult === true) {
                setUpdateMessage(<CAlert color="success">Cập nhật thành công!</CAlert>);
                setRefreshDataFlag(!refreshDataFlag);
            } else {
                setUpdateMessage(<CAlert color="danger">{updateResult}</CAlert>);
            }
            //clear errors if any
            setFieldErrorMessages({});
        } else {
            setFieldErrorMessages(formValidate);
            setUpdateMessage(null);
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
                    <CModalTitle>Cập nhật Quản Trị Viên</CModalTitle>
                </CModalHeader>
                <CModalBody>
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
                            <CInput type="text" id="update-admin-fullname-input" name="fullname" value={updateAdminFullname} onChange={({ target }) => setUpdateAdminFullname(target.value)} />
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
                            <CLabel className="required" htmlFor="update-admin-username-input">Tên tài khoản:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="text" id="update-admin-username-input" name="username" value={updateAdminUsername} required={true} onChange={({ target }) => setUpdateAdminUsername(target.value)} />
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
                            <CLabel htmlFor="update-admin-password-input">Mật khẩu:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="password" id="update-admin-password-input" name="update-admin-password-input" value={updateAdminPassword} placeholder="[Không thay đổi]" onChange={({ target }) => setUpdateAdminPassword(target.value)} />
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
                            <CLabel htmlFor="update-admin-email-input">Email:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="email" id="update-admin-email-input" name="update-admin-email-input" autoComplete="email" value={updateAdminEmail} required readOnly />
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
                            <CLabel htmlFor="update-admin-birthday-input">Ngày sinh:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            {(updateAdminBirthday === "" || updateAdminBirthday == null) ?
                                <DatePicker
                                    className="form-control"
                                    locale="vi"
                                    id="update-admin-birthday-input"
                                    name="update-admin-birthday-input"
                                    placeholderText="Ngày-Tháng-Năm"
                                    onChange={date => setUpdateAdminBirthday(date)}
                                    dateFormat="dd-MM-yyyy"
                                    maxDate={new Date()}
                                />
                                :
                                <DatePicker
                                    className="form-control"
                                    locale="vi"
                                    id="update-admin-birthday-input"
                                    name="update-admin-birthday-input"
                                    selected={updateAdminBirthday}
                                    placeholderText="Ngày-Tháng-Năm"
                                    onChange={date => setUpdateAdminBirthday(date)}
                                    dateFormat="dd-MM-yyyy"
                                    value={updateAdminBirthday}
                                    maxDate={new Date()}
                                />
                            }
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="update-admin-address-input">Địa chỉ:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="text" id="update-admin-address-input" name="update-admin-address-input" value={updateAdminAddress} onChange={({ target }) => setUpdateAdminAddress(target.value)} />
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
                            <CLabel htmlFor="update-admin-phone-input">Số điện thoại:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="text" id="update-admin-phone-input" name="update-admin-phone-input" value={updateAdminPhoneNumber} onChange={({ target }) => setUpdateAdminPhoneNumber(target.value)} />
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
                            <CLabel htmlFor="update-admin-permission">Quyền hạn:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CLabel htmlFor="update-admin-can-manage-learner-input"
                                className="w-100 permission-input-checkbox">
                                <CInputCheckbox
                                    id="update-admin-can-manage-learner-input"
                                    name="update-admin-can-manage-learner-input"
                                    checked={updateAdminCanManageLearner}
                                    onChange={({ target }) => setUpdateAdminCanManageLearner(target.checked)} />
                                Quản lý Học Viên
                                </CLabel>
                            <CLabel htmlFor="update-admin-can-manage-expert-input"
                                className="w-100 permission-input-checkbox">
                                <CInputCheckbox
                                    id="update-admin-can-manage-expert-input"
                                    name="update-admin-can-manage-expert-input"
                                    checked={updateAdminCanManageExpert}
                                    onChange={({ target }) => setUpdateAdminCanManageExpert(target.checked)} />
                                Quản lý Chuyên Gia
                                </CLabel>
                            <CLabel htmlFor="update-admin-can-manage-moderator-input"
                                className="w-100 permission-input-checkbox">
                                <CInputCheckbox
                                    id="update-admin-can-manage-moderator-input"
                                    name="update-admin-can-manage-moderator-input"
                                    checked={updateAdminCanManageModerator}
                                    onChange={({ target }) => setUpdateAdminCanManageModerator(target.checked)}
                                />
                                Quản lý Điều Hành Viên
                                </CLabel>
                            <CLabel htmlFor="update-admin-can-manage-admin-input"
                                className="w-100 permission-input-checkbox">
                                <CInputCheckbox
                                    id="update-admin-can-manage-admin-input"
                                    name="update-admin-can-manage-admin-input"
                                    checked={updateAdminCanManageAdmin}
                                    onChange={({ target }) => setUpdateAdminCanManageAdmin(target.checked)}
                                />
                                Quản lý Quản Trị Viên
                                </CLabel>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CLabel col md="4" htmlFor="update-admin-avatar-url">Ảnh đại diện:</CLabel>
                        <CCol xs="12" md="8">
                            <img id="updateAdminAvt" className="mr-2" alt="Admin Avatar" src={(updateAdminAvatarUrl === "" || updateAdminAvatarUrl == null) ? "/avatars/default_avt.png" : updateAdminAvatarUrl} width="80" height="80" />
                            <CButton
                                color="info"
                                className="rounded-circle"
                                onClick={avtUrlUploadOnclick}
                            ><CIcon name="cil-pencil"></CIcon></CButton>
                            <CInputFile className="d-none" id="updateAdminAvtUrlInput" name="update-admin-avatar-url" />
                        </CCol>
                    </CFormGroup>
                    {updateMessage}
                </CModalBody>
                <CModalFooter>
                    <CButton color="success" type="submit" disabled={promiseInProgress}>
                        Cập nhật
                        </CButton>
                    <CButton color="secondary" onClick={handleClose()}>
                        Hủy
                        </CButton>
                </CModalFooter>
            </CForm>
        </CModal>
    );
}

export default UpdateAdminModal