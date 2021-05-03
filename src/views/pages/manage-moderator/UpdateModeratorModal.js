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

import { GetUserInfoAPI, UpdateUserInfoByUserIdAPI, UpdateModeratorPermissionByIdAPI } from '../../../api/user';
import firebase from '../../../firebase/firebase';

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import vi from "date-fns/locale/vi";
import { format, parseISO } from 'date-fns';

import { usePromiseTracker, trackPromise } from "react-promise-tracker";

import AccountValidator from '../../../reusable/AccountValidator';

const UpdateModeratorModal = ({ selectedModeratorUsername, show, handleClose, refreshDataFlag, setRefreshDataFlag }) => {
    const [updateModeratorUUID, setUpdateModeratorUUID] = useState("");
    const [updateModeratorFullname, setUpdateModeratorFullname] = useState("");
    const [updateModeratorUsername, setUpdateModeratorUsername] = useState("");
    const [updateModeratorPassword, setUpdateModeratorPassword] = useState("");
    const [updateModeratorEmail, setUpdateModeratorEmail] = useState("");
    const [updateModeratorAddress, setUpdateModeratorAddress] = useState("");
    const [updateModeratorPhoneNumber, setUpdateModeratorPhoneNumber] = useState("");
    const [updateModeratorBirthday, setUpdateModeratorBirthday] = useState("");
    const [updateModeratorAvatarUrl, setUpdateModeratorAvatarUrl] = useState("");
    const [updateModeratorCanManageCoinBundle, setUpdateModeratorCanManageCoinBundle] = useState(false);
    const [updateModeratorCanManagePricing, setUpdateModeratorCanManagePricing] = useState(false);
    const [updateModeratorCanManageApplicationForm, setUpdateModeratorCanManageApplicationForm] = useState(false);
    const [updateModeratorCanManageExchangeRate, setUpdateModeratorCanManageExchangeRate] = useState(false);
    const [updateModeratorCanManageRatingAlgorithm, setUpdateModeratorCanManageRatingAlgorithm] = useState(false);
    const [fieldErrorMessages, setFieldErrorMessages] = useState({});
    const [updateMessage, setUpdateMessage] = useState(null);

    const { promiseInProgress } = usePromiseTracker();

    //this useEffect will be executed every time the modal show
    useEffect(() => {
        async function fetchData() {
            if (selectedModeratorUsername != null) {
                const selectedModeratorInfo = await trackPromise(GetUserInfoAPI(selectedModeratorUsername, 'Moderator'));
                if (selectedModeratorInfo != null) {
                    setUpdateModeratorUUID(selectedModeratorInfo.id);
                    setUpdateModeratorFullname(selectedModeratorInfo.fullname);
                    setUpdateModeratorUsername(selectedModeratorInfo.username);
                    setUpdateModeratorEmail(selectedModeratorInfo.email);
                    setUpdateModeratorAddress(selectedModeratorInfo.address);
                    setUpdateModeratorPhoneNumber(selectedModeratorInfo.phone_number);
                    if (selectedModeratorInfo.birthday === "" || selectedModeratorInfo.birthday == null) {
                        setUpdateModeratorBirthday("");
                    } else {
                        setUpdateModeratorBirthday(parseISO(selectedModeratorInfo.birthday));
                    }
                    setUpdateModeratorAvatarUrl((selectedModeratorInfo.avatar_url === "" || selectedModeratorInfo.avatar_url == null) ? "" : selectedModeratorInfo.avatar_url);
                    setUpdateModeratorCanManageCoinBundle(selectedModeratorInfo.moderator_details.can_manage_coin_bundle);
                    setUpdateModeratorCanManagePricing(selectedModeratorInfo.moderator_details.can_manage_pricing);
                    setUpdateModeratorCanManageApplicationForm(selectedModeratorInfo.moderator_details.can_manage_application_form);
                    setUpdateModeratorCanManageExchangeRate(selectedModeratorInfo.moderator_details.can_manage_exchange_rate);
                    setUpdateModeratorCanManageRatingAlgorithm(selectedModeratorInfo.moderator_details.can_manage_rating_algorithm);
                }
            }
        }
        fetchData();
    }, [selectedModeratorUsername]);

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
        const imagesRef = storageRef.child('uploads/' + updateModeratorUUID);
        const snapshot = await imagesRef.put(blob);
        const remoteUri = await snapshot.ref.getDownloadURL();

        // when we're done sending it, close and release the blob
        blob = null;

        return remoteUri;
    }

    const avtUrlUploadOnclick = () => {
        document.getElementById('updateModeratorAvtUrlInput').click();
        document.getElementById('updateModeratorAvtUrlInput').onchange = (e) => {
            var img = document.getElementById("updateModeratorAvt");
            const fileSize = e.target.files[0].size;
            const fileType = e.target.files[0].type;
            if (fileSize <= 300000 && (fileType === "image/jpeg" || fileType === "image/png" || fileType === "image/jpg")) {
                // create blob url
                var blobUrl = URL.createObjectURL(e.target.files[0]);
                // use blob url to preview avatar
                img.src = blobUrl;
                setUpdateModeratorAvatarUrl(blobUrl);
            } else {
                setUpdateMessage(<CAlert color="danger">Hệ thống chỉ chấp nhận file hình ảnh JPEG, JPG, PNG và dung lượng không quá 300KB</CAlert>);
            }
        }
    }

    const onSubmitUpdateForm = async (e) => {
        e.preventDefault();

        const userInput = {
            "fullname": (updateModeratorFullname != null) ? updateModeratorFullname : null,
            "username": updateModeratorUsername,
            "password": (updateModeratorPassword !== "") ? updateModeratorPassword : null,
            "email": updateModeratorEmail,
            "address": (updateModeratorAddress != null) ? updateModeratorAddress : null,
            "phone_number": (updateModeratorPhoneNumber != null) ? updateModeratorPhoneNumber : null
        }

        const formValidate = AccountValidator(userInput);
        const noErrors = Object.keys(formValidate).length === 0;

        if (noErrors) {
            let updateModeratorData = {};
            let permissionInput = {};
            let newAvtSrc = "";

            //check if uploaded file is blob file from local
            if (updateModeratorAvatarUrl != null) {
                const isBlob = updateModeratorAvatarUrl.includes("blob:");
                newAvtSrc = updateModeratorAvatarUrl;
                if (isBlob) {
                    //upload local image to Firebase Storage
                    newAvtSrc = await trackPromise(uploadToStorage(updateModeratorAvatarUrl));
                } else {
                    //do nothing
                }
            }

            if (updateModeratorPassword === "") {
                updateModeratorData = {
                    "fullname": updateModeratorFullname,
                    "username": updateModeratorUsername,
                    "address": updateModeratorAddress,
                    "phone_number": updateModeratorPhoneNumber,
                    "birthday": ((updateModeratorBirthday !== "" && updateModeratorBirthday != null) ? format(updateModeratorBirthday, 'yyyy-MM-dd') : ""),
                    "avatar_url": newAvtSrc,

                }
                permissionInput = {
                    "can_manage_coin_bundle": updateModeratorCanManageCoinBundle,
                    "can_manage_pricing": updateModeratorCanManagePricing,
                    "can_manage_application_form": updateModeratorCanManageApplicationForm,
                    "can_manage_exchange_rate": updateModeratorCanManageExchangeRate,
                    "can_manage_rating_algorithm": updateModeratorCanManageRatingAlgorithm
                }
            } else {
                updateModeratorData = {
                    "fullname": updateModeratorFullname,
                    "username": updateModeratorUsername,
                    "password": updateModeratorPassword,
                    "address": updateModeratorAddress,
                    "phone_number": updateModeratorPhoneNumber,
                    "birthday": ((updateModeratorBirthday !== "" && updateModeratorBirthday != null) ? format(updateModeratorBirthday, 'yyyy-MM-dd') : ""),
                    "avatar_url": newAvtSrc,
                }
                permissionInput = {
                    "can_manage_coin_bundle": updateModeratorCanManageCoinBundle,
                    "can_manage_pricing": updateModeratorCanManagePricing,
                    "can_manage_application_form": updateModeratorCanManageApplicationForm,
                    "can_manage_exchange_rate": updateModeratorCanManageExchangeRate,
                    "can_manage_rating_algorithm": updateModeratorCanManageRatingAlgorithm
                }
            }

            const updateResult = await trackPromise(UpdateUserInfoByUserIdAPI(updateModeratorUUID, updateModeratorData));
            const permissionUpdateResult = await trackPromise(UpdateModeratorPermissionByIdAPI(updateModeratorUUID, permissionInput));

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
                    <CModalTitle>Cập nhật Điều Hành Viên</CModalTitle>
                </CModalHeader>
                <CModalBody>
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
                            <CInput type="text" id="update-moderator-fullname-input" name="fullname" value={updateModeratorFullname} onChange={({ target }) => setUpdateModeratorFullname(target.value)} />
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
                            <CLabel className="required" htmlFor="update-moderator-username-input">Tên tài khoản:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="text" id="update-moderator-username-input" name="username" value={updateModeratorUsername} required onChange={({ target }) => setUpdateModeratorUsername(target.value)} />
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
                            <CLabel htmlFor="update-moderator-password-input">Mật khẩu:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="password" id="update-moderator-password-input" name="update-moderator-password-input" value={updateModeratorPassword} placeholder="[Không thay đổi]" onChange={({ target }) => setUpdateModeratorPassword(target.value)} />
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
                            <CLabel htmlFor="update-moderator-email-input">Email:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="email" id="update-moderator-email-input" name="update-moderator-email-input" autoComplete="email" value={updateModeratorEmail} required={true} readOnly />
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
                            <CLabel htmlFor="update-moderator-birthday-input">Ngày sinh:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            {(updateModeratorBirthday === "" || updateModeratorBirthday == null) ?
                                <DatePicker
                                    className="form-control"
                                    locale="vi"
                                    id="update-moderator-birthday-input"
                                    name="update-moderator-birthday-input"
                                    placeholderText="Ngày-Tháng-Năm"
                                    onChange={date => setUpdateModeratorBirthday(date)}
                                    dateFormat="dd-MM-yyyy"
                                    maxDate={new Date()}
                                />
                                :
                                <DatePicker
                                    className="form-control"
                                    locale="vi"
                                    id="update-moderator-birthday-input"
                                    name="update-moderator-birthday-input"
                                    selected={updateModeratorBirthday}
                                    placeholderText="Ngày-Tháng-Năm"
                                    onChange={date => setUpdateModeratorBirthday(date)}
                                    dateFormat="dd-MM-yyyy"
                                    value={updateModeratorBirthday}
                                    maxDate={new Date()}
                                />
                            }
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="update-moderator-address-input">Địa chỉ:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="text" id="update-moderator-address-input" name="update-moderator-address-input" value={updateModeratorAddress} onChange={({ target }) => setUpdateModeratorAddress(target.value)} />
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
                            <CLabel htmlFor="update-moderator-phone-input">Số điện thoại:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="tel" id="update-moderator-phone-input" name="update-moderator-phone-input" value={updateModeratorPhoneNumber} onChange={({ target }) => setUpdateModeratorPhoneNumber(target.value)} />
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
                            <CLabel htmlFor="update-moderator-permission">Quyền hạn:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CLabel htmlFor="update-moderator-can-manage-coin-bundle-input"
                                className="w-100 permission-input-checkbox">
                                <CInputCheckbox
                                    id="update-moderator-can-manage-coin-bundle-input"
                                    name="update-moderator-can-manage-coin-bundle-input"
                                    checked={updateModeratorCanManageCoinBundle}
                                    onChange={({ target }) => setUpdateModeratorCanManageCoinBundle(target.checked)} />
                                Quản lý Gói Coin
                                </CLabel>
                            <CLabel htmlFor="update-moderator-can-manage-pricing-input"
                                className="w-100 permission-input-checkbox">
                                <CInputCheckbox
                                    id="update-moderator-can-manage-pricing-input"
                                    name="update-moderator-can-manage-pricing-input"
                                    checked={updateModeratorCanManagePricing}
                                    onChange={({ target }) => setUpdateModeratorCanManagePricing(target.checked)} />
                                Quản lý Đơn Giá
                                </CLabel>
                            <CLabel htmlFor="update-moderator-can-manage-application-form-input"
                                className="w-100 permission-input-checkbox">
                                <CInputCheckbox
                                    id="update-moderator-can-manage-application-form-input"
                                    name="update-moderator-can-manage-application-form-input"
                                    checked={updateModeratorCanManageApplicationForm}
                                    onChange={({ target }) => setUpdateModeratorCanManageApplicationForm(target.checked)}
                                />
                                Quản lý Hồ sơ Ứng Viên
                                </CLabel>
                            <CLabel htmlFor="update-moderator-can-manage-exchange-rate-input"
                                className="w-100 permission-input-checkbox">
                                <CInputCheckbox
                                    id="update-moderator-can-manage-exchange-rate-input"
                                    name="update-moderator-can-manage-exchange-rate-input"
                                    checked={updateModeratorCanManageExchangeRate}
                                    onChange={({ target }) => setUpdateModeratorCanManageExchangeRate(target.checked)}
                                />
                                Quản lý Chiết Khấu
                                </CLabel>
                            <CLabel htmlFor="update-moderator-can-manage-rating-algorithm-input"
                                className="w-100 permission-input-checkbox">
                                <CInputCheckbox
                                    id="update-moderator-can-manage-rating-algorithm-input"
                                    name="update-moderator-can-manage-rating-algorithm-input"
                                    checked={updateModeratorCanManageRatingAlgorithm}
                                    onChange={({ target }) => setUpdateModeratorCanManageRatingAlgorithm(target.checked)}
                                />
                                Quản lý Thuật toán Đánh Giá
                                </CLabel>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CLabel col md="4" htmlFor="update-moderator-avatar-url">Ảnh đại diện:</CLabel>
                        <CCol xs="12" md="8">
                            <img id="updateModeratorAvt" className="mr-2" alt="Moderator Avatar" src={(updateModeratorAvatarUrl === "" || updateModeratorAvatarUrl == null) ? "/avatars/default_avt.png" : updateModeratorAvatarUrl} width="80" height="80" />
                            <CButton
                                color="info"
                                className="rounded-circle"
                                onClick={avtUrlUploadOnclick}
                            ><CIcon name="cil-pencil"></CIcon></CButton>
                            <CInputFile className="d-none" id="updateModeratorAvtUrlInput" name="update-moderator-avatar-url" />
                        </CCol>
                    </CFormGroup>
                    {updateMessage}
                </CModalBody>
                <CModalFooter>
                    <CButton color="success" type="submit" disabled={promiseInProgress}>
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

export default UpdateModeratorModal