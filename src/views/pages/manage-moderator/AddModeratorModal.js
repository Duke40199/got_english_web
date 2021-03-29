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

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import vi from "date-fns/locale/vi";
import { format } from 'date-fns';

const AddModeratorModal = ({ show, handleClose }) => {
    const history = useHistory();

    const [addModeratorFullname, setAddModeratorFullname] = useState("");
    const [addModeratorUsername, setAddModeratorUsername] = useState("");
    const [addModeratorPassword, setAddModeratorPassword] = useState("");
    const [addModeratorEmail, setAddModeratorEmail] = useState("");
    const [addModeratorAddress, setAddModeratorAddress] = useState("");
    const [addModeratorPhoneNumber, setAddModeratorPhoneNumber] = useState("");
    const [addModeratorBirthday, setAddModeratorBirthday] = useState("");
    const [addModeratorAvatarUrl, setAddModeratorAvatarUrl] = useState("");
    const [addMessage, setAddMessage] = useState(null);

    const uploadToStorage = async (imageURL, updateModeratorUUID) => {
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
        document.getElementById('addModeratorAvtUrlInput').click();
        document.getElementById('addModeratorAvtUrlInput').onchange = (e) => {
            var img = document.getElementById("addModeratorAvt");
            const fileSize = e.target.files[0].size;
            const fileType = e.target.files[0].type;
            if (fileSize <= 300000 && (fileType == "image/jpeg" || fileType == "image/png" || fileType == "image/jpg")) {
                // create blob url
                var blobUrl = URL.createObjectURL(e.target.files[0]);
                // use blob url to preview avatar
                img.src = blobUrl;
                setAddModeratorAvatarUrl(blobUrl);
            } else {
                setAddMessage(<CAlert color="danger">Hệ thống chỉ chấp nhận file hình ảnh JPEG, JPG, PNG và dung lượng không quá 300KB</CAlert>);
            }
        }
    }

    const onSubmitAddForm = async (e) => {
        e.preventDefault();

        const userInput = {
            "username": addModeratorUsername,
            "password": addModeratorPassword,
            "email": addModeratorEmail,
            "role_name": "Moderator"
        };

        const addModeratorResult = await CreateUserAPI(userInput);
        console.log(addModeratorResult, userInput);

        if (addModeratorResult != null) {
            const newModeratorID = addModeratorResult.data;
            //check if uploaded file is blob file from local
            const isBlob = addModeratorAvatarUrl.includes("blob:");
            let newAvtSrc = addModeratorAvatarUrl;
            if (isBlob) {
                //upload local image to Firebase Storage
                newAvtSrc = await uploadToStorage(addModeratorAvatarUrl, newModeratorID);
            } else {
                //do nothing
            }
            const additionalData = {
                "fullname": addModeratorFullname,
                "address": addModeratorAddress,
                "phone_number": addModeratorPhoneNumber,
                "birthday": ((addModeratorBirthday != "" && addModeratorBirthday != null) ? format(addModeratorBirthday, 'yyyy-MM-dd') : null),
                "avatar_url": newAvtSrc
            }

            const updateModeratorAvt = await UpdateUserInfoByUserIdAPI(newModeratorID, additionalData);
            console.log(newModeratorID, additionalData)
            if (updateModeratorAvt === true) {
                setAddMessage(<CAlert color="success">Thêm mới thành công!</CAlert>);
                history.push("/manage-moderator");
            } else {
                setAddMessage(<CAlert color="danger">Quá trình upload avatar thất bại!</CAlert>);
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
                    {addMessage}
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="moderator-fullname-input">Họ và tên:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput id="moderator-fullname-input" name="moderator-fullname-input" onChange={({ target }) => setAddModeratorFullname(target.value)} />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="moderator-username-input">Tên tài khoản:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput id="moderator-username-input" name="moderator-username-input" onChange={({ target }) => setAddModeratorUsername(target.value)} required={true} />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="moderator-password-input">Mật khẩu:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="password" id="moderator-password-input" name="moderator-password-input" onChange={({ target }) => setAddModeratorPassword(target.value)} required={true} />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="moderator-email-input">Email:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="email" id="moderator-email-input" name="moderator-email-input" autoComplete="email" onChange={({ target }) => setAddModeratorEmail(target.value)} required={true} />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="moderator-birthday-input">Ngày sinh:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            {addModeratorBirthday != "" ?
                                <DatePicker
                                    className="form-control"
                                    locale="vi"
                                    id="moderator-birthday-input"
                                    name="moderator-birthday-input"
                                    placeholderText="Ngày-Tháng-Năm"
                                    selected={addModeratorBirthday}
                                    onChange={date => setAddModeratorBirthday(date)}
                                    dateFormat="dd-MM-yyyy"
                                    value={addModeratorBirthday}
                                />
                                :
                                <DatePicker
                                    className="form-control"
                                    locale="vi"
                                    id="moderator-birthday-input"
                                    name="moderator-birthday-input"
                                    placeholderText="Ngày-Tháng-Năm"
                                    onChange={date => setAddModeratorBirthday(date)}
                                    dateFormat="dd-MM-yyyy" />
                            }

                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="moderator-address-input">Địa chỉ:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="tel" id="moderator-address-input" name="moderator-address-input" onChange={({ target }) => setAddModeratorAddress(target.value)} />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="moderator-phone-input">Số điện thoại:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="tel" id="moderator-phone-input" name="moderator-phone-input" onChange={({ target }) => setAddModeratorPhoneNumber(target.value)} />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CLabel col md="4" htmlFor="moderator-avatar-url">Ảnh đại diện:</CLabel>
                        <CCol xs="12" md="8">
                            <img id="addModeratorAvt" className="mr-2" src={addModeratorAvatarUrl} width="80" height="80" />
                            <CButton
                                color="info"
                                className="rounded-circle"
                                onClick={avtUrlUploadOnclick}
                            ><CIcon name="cil-pencil"></CIcon></CButton>
                            <CInputFile class="d-none" id="addModeratorAvtUrlInput" name="moderator-avatar-url" />
                        </CCol>
                    </CFormGroup>

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
    )
}

export default AddModeratorModal