import React, { useState } from 'react'
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

import { CreateUserAPI, UpdateUserInfoByUserIdAPI, UpdateAdminPermissionByIdAPI } from '../../../api/user';
import firebase from '../../../firebase/firebase';
import jwt_decode from 'jwt-decode'
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import vi from "date-fns/locale/vi";
import { format } from 'date-fns';

const AddAdminModal = ({ show, handleClose }) => {
    const history = useHistory();

    const [addAdminFullname, setAddAdminFullname] = useState("");
    const [addAdminUsername, setAddAdminUsername] = useState("");
    const [addAdminPassword, setAddAdminPassword] = useState("");
    const [addAdminEmail, setAddAdminEmail] = useState("");
    const [addAdminAddress, setAddAdminAddress] = useState("");
    const [addAdminPhoneNumber, setAddAdminPhoneNumber] = useState("");
    const [addAdminBirthday, setAddAdminBirthday] = useState("");
    const [addAdminAvatarUrl, setAddAdminAvatarUrl] = useState("");
    const [addAdminCanManageLearner, setAddAdminCanManageLearner] = useState(false);
    const [addAdminCanManageExpert, setAddAdminCanManageExpert] = useState(false);
    const [addAdminCanManageModerator, setAddAdminCanManageModerator] = useState(false);
    const [addAdminCanManageAdmin, setAddAdminCanManageAdmin] = useState(false);
    const [addMessage, setAddMessage] = useState(null);

    const uploadToStorage = async (imageURL, updateAdminUUID) => {
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
        document.getElementById('addAdminAvtUrlInput').click();
        document.getElementById('addAdminAvtUrlInput').onchange = (e) => {
            var img = document.getElementById("addAdminAvt");
            const fileSize = e.target.files[0].size;
            const fileType = e.target.files[0].type;
            if (fileSize <= 300000 && (fileType == "image/jpeg" || fileType == "image/png" || fileType == "image/jpg")) {
                // create blob url
                var blobUrl = URL.createObjectURL(e.target.files[0]);
                // use blob url to preview avatar
                img.src = blobUrl;
                setAddAdminAvatarUrl(blobUrl);
            } else {
                setAddMessage(<CAlert color="danger">Hệ thống chỉ chấp nhận file hình ảnh JPEG, JPG, PNG và dung lượng không quá 300KB</CAlert>);
            }
        }
    }

    const onSubmitAddForm = async (e) => {
        e.preventDefault();

        const userInput = {
            "username": addAdminUsername,
            "password": addAdminPassword,
            "email": addAdminEmail,
            "role_name": "Admin"
        };

        const addAdminResult = await CreateUserAPI(userInput);
        console.log(addAdminResult, userInput);

        if (addAdminResult.success === true) {
            const newAdminToken = addAdminResult.data.token;
            const newAdminID = (jwt_decode(newAdminToken)).claims.id;
            //check if uploaded file is blob file from local
            const isBlob = addAdminAvatarUrl.includes("blob:");
            let newAvtSrc = addAdminAvatarUrl;
            if (isBlob) {
                //upload local image to Firebase Storage
                newAvtSrc = await uploadToStorage(addAdminAvatarUrl, newAdminID);
            } else {
                //do nothing
            }
            const additionalData = {
                "fullname": addAdminFullname,
                "address": addAdminAddress,
                "phone_number": addAdminPhoneNumber,
                "birthday": ((addAdminBirthday == "" || addAdminBirthday == null) ? null : format(addAdminBirthday, 'yyyy-MM-dd')),
                "avatar_url": newAvtSrc
            }
            const permissionInput = {
                "can_manage_learner": addAdminCanManageLearner,
                "can_manage_expert": addAdminCanManageExpert,
                "can_manage_moderator": addAdminCanManageModerator,
                "can_manage_admin": addAdminCanManageAdmin
            }

            const updateAdminAvt = await UpdateUserInfoByUserIdAPI(newAdminID, additionalData);
            const permissionUpdateResult = await UpdateAdminPermissionByIdAPI(newAdminID, permissionInput);
            console.log(newAdminID, additionalData)
            if (updateAdminAvt === true && permissionUpdateResult === true) {
                setAddMessage(<CAlert color="success">Thêm mới thành công!</CAlert>);
                history.push("/manage-admin");
            } else {
                setAddMessage(<CAlert color="danger">Thêm mới thành công! Tuy nhiên phần thông tin cập nhật đã gặp sự cố. Hãy sử dụng chức năng Cập nhật để cập nhật lại thông tin.</CAlert>);
            }
        } else {
            setAddMessage(<CAlert color="danger">Thêm mới thất bại!</CAlert>);
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
                    <CModalTitle>Thêm mới Quản Trị Viên</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="admin-fullname-input">Họ và tên:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput id="admin-fullname-input" name="admin-fullname-input" onChange={({ target }) => setAddAdminFullname(target.value)} />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="admin-username-input">Tên tài khoản:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput id="admin-username-input" name="admin-username-input" onChange={({ target }) => setAddAdminUsername(target.value)} required={true} />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="admin-password-input">Mật khẩu:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="password" id="admin-password-input" name="admin-password-input" onChange={({ target }) => setAddAdminPassword(target.value)} required={true} />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="admin-email-input">Email:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="email" id="admin-email-input" name="admin-email-input" autoComplete="email" onChange={({ target }) => setAddAdminEmail(target.value)} required={true} />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="admin-birthday-input">Ngày sinh:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            {addAdminBirthday != "" ?
                                <DatePicker
                                    className="form-control"
                                    locale="vi"
                                    id="admin-birthday-input"
                                    name="admin-birthday-input"
                                    placeholderText="Ngày-Tháng-Năm"
                                    selected={addAdminBirthday}
                                    onChange={date => setAddAdminBirthday(date)}
                                    dateFormat="dd-MM-yyyy"
                                    value={addAdminBirthday}
                                />
                                :
                                <DatePicker
                                    className="form-control"
                                    locale="vi"
                                    id="admin-birthday-input"
                                    name="admin-birthday-input"
                                    placeholderText="Ngày-Tháng-Năm"
                                    onChange={date => setAddAdminBirthday(date)}
                                    dateFormat="dd-MM-yyyy" />
                            }

                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="admin-address-input">Địa chỉ:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="tel" id="admin-address-input" name="admin-address-input" onChange={({ target }) => setAddAdminAddress(target.value)} />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="admin-phone-input">Số điện thoại:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="tel" id="admin-phone-input" name="admin-phone-input" onChange={({ target }) => setAddAdminPhoneNumber(target.value)} />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="add-admin-permission">Quyền hạn:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CLabel htmlFor="add-admin-can-manage-learner-input"
                                className="w-100 permission-input-checkbox">
                                <CInputCheckbox
                                    id="add-admin-can-manage-learner-input"
                                    name="add-admin-can-manage-learner-input"
                                    checked={addAdminCanManageLearner}
                                    onChange={({ target }) => setAddAdminCanManageLearner(target.checked)} />
                                Quản lý Học Viên
                                </CLabel>
                            <CLabel htmlFor="add-admin-can-manage-expert-input"
                                className="w-100 permission-input-checkbox">
                                <CInputCheckbox
                                    id="add-admin-can-manage-expert-input"
                                    name="add-admin-can-manage-expert-input"
                                    checked={addAdminCanManageExpert}
                                    onChange={({ target }) => setAddAdminCanManageExpert(target.checked)} />
                                Quản lý Chuyên Gia
                                </CLabel>
                            <CLabel htmlFor="add-admin-can-manage-moderator-input"
                                className="w-100 permission-input-checkbox">
                                <CInputCheckbox
                                    id="add-admin-can-manage-moderator-input"
                                    name="add-admin-can-manage-moderator-input"
                                    checked={addAdminCanManageModerator}
                                    onChange={({ target }) => setAddAdminCanManageModerator(target.checked)}
                                />
                                Quản lý Điều Hành Viên
                                </CLabel>
                            <CLabel htmlFor="add-admin-can-manage-admin-input"
                                className="w-100 permission-input-checkbox">
                                <CInputCheckbox
                                    id="add-admin-can-manage-admin-input"
                                    name="add-admin-can-manage-admin-input"
                                    checked={addAdminCanManageAdmin}
                                    onChange={({ target }) => setAddAdminCanManageAdmin(target.checked)}
                                />
                                Quản lý Quản Trị Viên
                                </CLabel>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CLabel col md="4" htmlFor="admin-avatar-url">Ảnh đại diện:</CLabel>
                        <CCol xs="12" md="8">
                            <img id="addAdminAvt" className="mr-2" src={addAdminAvatarUrl} width="80" height="80" />
                            <CButton
                                color="info"
                                className="rounded-circle"
                                onClick={avtUrlUploadOnclick}
                            ><CIcon name="cil-pencil"></CIcon></CButton>
                            <CInputFile class="d-none" id="addAdminAvtUrlInput" name="admin-avatar-url" />
                        </CCol>
                    </CFormGroup>
                    {addMessage}
                </CModalBody>
                <CModalFooter>
                    <CButton color="primary" type="submit">
                        Thêm
                </CButton>
                    <CButton color="secondary" onClick={handleClose()}>
                        Hủy
                </CButton>
                </CModalFooter>
            </CForm>
        </CModal>
    );
}

export default AddAdminModal