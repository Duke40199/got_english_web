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

const AddLearnerModal = ({ show, handleClose, refreshDataFlag, setRefreshDataFlag }) => {
    const [addLearnerFullname, setAddLearnerFullname] = useState("");
    const [addLearnerUsername, setAddLearnerUsername] = useState("");
    const [addLearnerPassword, setAddLearnerPassword] = useState("");
    const [addLearnerEmail, setAddLearnerEmail] = useState("");
    const [addLearnerAddress, setAddLearnerAddress] = useState("");
    const [addLearnerPhoneNumber, setAddLearnerPhoneNumber] = useState("");
    const [addLearnerBirthday, setAddLearnerBirthday] = useState("");
    const [addLearnerAvatarUrl, setAddLearnerAvatarUrl] = useState("");
    const [addMessage, setAddMessage] = useState(null);

    const uploadToStorage = async (imageURL, updateLearnerUUID) => {
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
        const imagesRef = storageRef.child('uploads/' + updateLearnerUUID);
        const snapshot = await imagesRef.put(blob);
        const remoteUri = await snapshot.ref.getDownloadURL();

        // when we're done sending it, close and release the blob
        blob = null;

        return remoteUri;
    }

    const avtUrlUploadOnclick = () => {
        document.getElementById('addLearnerAvtUrlInput').click();
        document.getElementById('addLearnerAvtUrlInput').onchange = (e) => {
            var img = document.getElementById("addLearnerAvt");
            const fileSize = e.target.files[0].size;
            const fileType = e.target.files[0].type;
            if (fileSize <= 300000 && (fileType == "image/jpeg" || fileType == "image/png" || fileType == "image/jpg")) {
                // create blob url
                var blobUrl = URL.createObjectURL(e.target.files[0]);
                // use blob url to preview avatar
                img.src = blobUrl;
                setAddLearnerAvatarUrl(blobUrl);
            } else {
                setAddMessage(<CAlert color="danger">Hệ thống chỉ chấp nhận file hình ảnh JPEG, JPG, PNG và dung lượng không quá 300KB</CAlert>);
            }
        }
    }

    const onSubmitAddForm = async (e) => {
        e.preventDefault();

        const userInput = {
            "username": addLearnerUsername,
            "password": addLearnerPassword,
            "email": addLearnerEmail,
            "role_name": "Learner"
        };

        const addLearnerResult = await CreateUserAPI(userInput);
        console.log(addLearnerResult, userInput);

        if (addLearnerResult.success === true) {
            const newLearnerToken = addLearnerResult.data.token;
            const newLearnerID = (jwt_decode(newLearnerToken)).claims.id;
            //check if uploaded file is blob file from local
            const isBlob = addLearnerAvatarUrl.includes("blob:");
            let newAvtSrc = addLearnerAvatarUrl;
            if (isBlob) {
                //upload local image to Firebase Storage
                newAvtSrc = await uploadToStorage(addLearnerAvatarUrl, newLearnerID);
            } else {
                //do nothing
            }
            const additionalData = {
                "fullname": addLearnerFullname,
                "address": addLearnerAddress,
                "phone_number": addLearnerPhoneNumber,
                "birthday": ((addLearnerBirthday == "" || addLearnerBirthday == null) ? null : format(addLearnerBirthday, 'yyyy-MM-dd')),
                "avatar_url": newAvtSrc
            }

            const updateLearnerAvt = await UpdateUserInfoByUserIdAPI(newLearnerID, additionalData);
            console.log(newLearnerID, additionalData)
            if (updateLearnerAvt === true) {
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
                    <CModalTitle>Thêm mới Học Viên</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="learner-fullname-input">Họ và tên:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput id="learner-fullname-input" name="learner-fullname-input" onChange={({ target }) => setAddLearnerFullname(target.value)} />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="learner-username-input">Tên tài khoản:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput id="learner-username-input" name="learner-username-input" onChange={({ target }) => setAddLearnerUsername(target.value)} required={true} />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="learner-password-input">Mật khẩu:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="password" id="learner-password-input" name="learner-password-input" onChange={({ target }) => setAddLearnerPassword(target.value)} required={true} />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="learner-email-input">Email:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="email" id="learner-email-input" name="learner-email-input" autoComplete="email" onChange={({ target }) => setAddLearnerEmail(target.value)} required={true} />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="learner-birthday-input">Ngày sinh:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            {(addLearnerBirthday == "" || addLearnerBirthday == null) ?
                                <DatePicker
                                    className="form-control"
                                    locale="vi"
                                    id="learner-birthday-input"
                                    name="learner-birthday-input"
                                    placeholderText="Ngày-Tháng-Năm"
                                    onChange={date => setAddLearnerBirthday(date)}
                                    dateFormat="dd-MM-yyyy" />
                                :

                                <DatePicker
                                    className="form-control"
                                    locale="vi"
                                    id="learner-birthday-input"
                                    name="learner-birthday-input"
                                    placeholderText="Ngày-Tháng-Năm"
                                    selected={addLearnerBirthday}
                                    onChange={date => setAddLearnerBirthday(date)}
                                    dateFormat="dd-MM-yyyy"
                                    value={addLearnerBirthday}
                                />
                            }

                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="learner-address-input">Địa chỉ:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="tel" id="learner-address-input" name="learner-address-input" onChange={({ target }) => setAddLearnerAddress(target.value)} />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="learner-phone-input">Số điện thoại:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="tel" id="learner-phone-input" name="learner-phone-input" onChange={({ target }) => setAddLearnerPhoneNumber(target.value)} />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CLabel col md="4" htmlFor="learner-avatar-url">Ảnh đại diện:</CLabel>
                        <CCol xs="12" md="8">
                            <img id="addLearnerAvt" className="mr-2" src={addLearnerAvatarUrl} width="80" height="80" />
                            <CButton
                                color="info"
                                className="rounded-circle"
                                onClick={avtUrlUploadOnclick}
                            ><CIcon name="cil-pencil"></CIcon></CButton>
                            <CInputFile class="d-none" id="addLearnerAvtUrlInput" name="learner-avatar-url" />
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

export default AddLearnerModal