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
    CAlert
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { CreateUserAPI, UpdateUserInfoByUserIdAPI } from '../../../api/user';
import firebase from '../../../firebase/firebase';
import jwt_decode from 'jwt-decode'
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import vi from "date-fns/locale/vi";
import { format } from 'date-fns';

const AddExpertModal = ({ show, handleClose, refreshDataFlag, setRefreshDataFlag }) => {
    const history = useHistory();

    const [addExpertFullname, setAddExpertFullname] = useState("");
    const [addExpertUsername, setAddExpertUsername] = useState("");
    const [addExpertPassword, setAddExpertPassword] = useState("");
    const [addExpertEmail, setAddExpertEmail] = useState("");
    const [addExpertAddress, setAddExpertAddress] = useState("");
    const [addExpertPhoneNumber, setAddExpertPhoneNumber] = useState("");
    const [addExpertBirthday, setAddExpertBirthday] = useState("");
    const [addExpertAvatarUrl, setAddExpertAvatarUrl] = useState("");
    const [addMessage, setAddMessage] = useState(null);

    const uploadToStorage = async (imageURL, updateExpertUUID) => {
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
        document.getElementById('addExpertAvtUrlInput').click();
        document.getElementById('addExpertAvtUrlInput').onchange = (e) => {
            var img = document.getElementById("addExpertAvt");
            const fileSize = e.target.files[0].size;
            const fileType = e.target.files[0].type;
            if (fileSize <= 300000 && (fileType == "image/jpeg" || fileType == "image/png" || fileType == "image/jpg")) {
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
            "username": addExpertUsername,
            "password": addExpertPassword,
            "email": addExpertEmail,
            "role_name": "Expert"
        };

        const addExpertResult = await CreateUserAPI(userInput);
        console.log(addExpertResult, userInput);

        if (addExpertResult.success === true) {
            const newExpertToken = addExpertResult.data.token;
            const newExpertID = (jwt_decode(newExpertToken)).claims.id;
            //check if uploaded file is blob file from local
            const isBlob = addExpertAvatarUrl.includes("blob:");
            let newAvtSrc = addExpertAvatarUrl;
            if (isBlob) {
                //upload local image to Firebase Storage
                newAvtSrc = await uploadToStorage(addExpertAvatarUrl, newExpertID);
            } else {
                //do nothing
            }
            const additionalData = {
                "fullname": addExpertFullname,
                "address": addExpertAddress,
                "phone_number": addExpertPhoneNumber,
                "birthday": ((addExpertBirthday == "" || addExpertBirthday == null) ? null : format(addExpertBirthday, 'yyyy-MM-dd')),
                "avatar_url": newAvtSrc
            }

            const updateExpertAvt = await UpdateUserInfoByUserIdAPI(newExpertID, additionalData);
            console.log(newExpertID, additionalData)
            if (updateExpertAvt === true) {
                setAddMessage(<CAlert color="success">Thêm mới thành công!</CAlert>);
                setRefreshDataFlag(!refreshDataFlag);
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
                    <CModalTitle>Thêm mới Chuyên Gia</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="expert-fullname-input">Họ và tên:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput id="expert-fullname-input" name="expert-fullname-input" onChange={({ target }) => setAddExpertFullname(target.value)} />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="expert-username-input">Tên tài khoản:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput id="expert-username-input" name="expert-username-input" onChange={({ target }) => setAddExpertUsername(target.value)} required={true} />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="expert-password-input">Mật khẩu:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="password" id="expert-password-input" name="expert-password-input" onChange={({ target }) => setAddExpertPassword(target.value)} required={true} />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="expert-email-input">Email:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="email" id="expert-email-input" name="expert-email-input" autoComplete="email" onChange={({ target }) => setAddExpertEmail(target.value)} required={true} />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="expert-birthday-input">Ngày sinh:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            {(addExpertBirthday == "" || addExpertBirthday == null) ?
                                <DatePicker
                                    className="form-control"
                                    locale="vi"
                                    id="expert-birthday-input"
                                    name="expert-birthday-input"
                                    placeholderText="Ngày-Tháng-Năm"
                                    onChange={date => setAddExpertBirthday(date)}
                                    dateFormat="dd-MM-yyyy" />
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
                                />
                            }

                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="expert-address-input">Địa chỉ:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="tel" id="expert-address-input" name="expert-address-input" onChange={({ target }) => setAddExpertAddress(target.value)} />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="expert-phone-input">Số điện thoại:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="tel" id="expert-phone-input" name="expert-phone-input" onChange={({ target }) => setAddExpertPhoneNumber(target.value)} />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CLabel col md="4" htmlFor="expert-avatar-url">Ảnh đại diện:</CLabel>
                        <CCol xs="12" md="8">
                            <img id="addExpertAvt" className="mr-2" src={addExpertAvatarUrl} width="80" height="80" />
                            <CButton
                                color="info"
                                className="rounded-circle"
                                onClick={avtUrlUploadOnclick}
                            ><CIcon name="cil-pencil"></CIcon></CButton>
                            <CInputFile class="d-none" id="addExpertAvtUrlInput" name="expert-avatar-url" />
                        </CCol>
                    </CFormGroup>
                    {addMessage}
                </CModalBody>
                <CModalFooter>
                    <CButton color="primary" type="submit">
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