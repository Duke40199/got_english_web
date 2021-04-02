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
    CAlert
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { GetUserInfoAPI, UpdateUserInfoByUserIdAPI } from '../../../api/user';
import firebase from '../../../firebase/firebase';

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import vi from "date-fns/locale/vi";
import { format, parseISO } from 'date-fns';

const UpdateLearnerModal = ({ selectedLearnerUsername, show, handleClose }) => {
    const history = useHistory();

    const [updateLearnerUUID, setUpdateLearnerUUID] = useState("");
    const [updateLearnerFullname, setUpdateLearnerFullname] = useState("");
    const [updateLearnerUsername, setUpdateLearnerUsername] = useState("");
    const [updateLearnerPassword, setUpdateLearnerPassword] = useState("");
    const [updateLearnerEmail, setUpdateLearnerEmail] = useState("");
    const [updateLearnerAddress, setUpdateLearnerAddress] = useState("");
    const [updateLearnerPhoneNumber, setUpdateLearnerPhoneNumber] = useState("");
    const [updateLearnerBirthday, setUpdateLearnerBirthday] = useState("");
    const [updateLearnerAvatarUrl, setUpdateLearnerAvatarUrl] = useState("");
    const [updateMessage, setUpdateMessage] = useState(null);

    //this useEffect will be executed every time the modal show
    useEffect(async () => {
        if (selectedLearnerUsername != null) {
            const selectedLearnerInfo = await GetUserInfoAPI(selectedLearnerUsername);
            setUpdateLearnerUUID(selectedLearnerInfo.id);
            setUpdateLearnerFullname(selectedLearnerInfo.fullname);
            setUpdateLearnerUsername(selectedLearnerInfo.username);
            setUpdateLearnerEmail(selectedLearnerInfo.email);
            setUpdateLearnerAddress(selectedLearnerInfo.address);
            setUpdateLearnerPhoneNumber(selectedLearnerInfo.phone_number);
            if (selectedLearnerInfo.birthday == "" || selectedLearnerInfo.birthday == null) {
                setUpdateLearnerBirthday("");
            } else {
                setUpdateLearnerBirthday(parseISO(selectedLearnerInfo.birthday));
            }
            setUpdateLearnerAvatarUrl(selectedLearnerInfo.avatar_url == "" || selectedLearnerInfo == null ? "" : selectedLearnerInfo.avatar_url);
        }
    }, [selectedLearnerUsername]);

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
        const imagesRef = storageRef.child('uploads/' + updateLearnerUUID);
        const snapshot = await imagesRef.put(blob);
        const remoteUri = await snapshot.ref.getDownloadURL();

        // when we're done sending it, close and release the blob
        blob = null;

        return remoteUri;
    }

    const avtUrlUploadOnclick = () => {
        document.getElementById('updateLearnerAvtUrlInput').click();
        document.getElementById('updateLearnerAvtUrlInput').onchange = (e) => {
            var img = document.getElementById("updateLearnerAvt");
            const fileSize = e.target.files[0].size;
            const fileType = e.target.files[0].type;
            if (fileSize <= 300000 && (fileType == "image/jpeg" || fileType == "image/png" || fileType == "image/jpg")) {
                // create blob url
                var blobUrl = URL.createObjectURL(e.target.files[0]);
                // use blob url to preview avatar
                img.src = blobUrl;
                setUpdateLearnerAvatarUrl(blobUrl);
            } else {
                setUpdateMessage(<CAlert color="danger">Hệ thống chỉ chấp nhận file hình ảnh JPEG, JPG, PNG và dung lượng không quá 300KB</CAlert>);
            }
        }
    }

    const onSubmitUpdateForm = async (e) => {
        e.preventDefault();

        let userInput = {};

        //check if uploaded file is blob file from local
        const isBlob = updateLearnerAvatarUrl.includes("blob:");
        let newAvtSrc = updateLearnerAvatarUrl;
        if (isBlob) {
            //upload local image to Firebase Storage
            newAvtSrc = await uploadToStorage(updateLearnerAvatarUrl);
        } else {
            //do nothing
        }

        if (updateLearnerPassword === "") {
            userInput = {
                "fullname": updateLearnerFullname,
                "username": updateLearnerUsername,
                "email": updateLearnerEmail,
                "address": updateLearnerAddress,
                "phone_number": updateLearnerPhoneNumber,
                "birthday": ((updateLearnerBirthday == "" || updateLearnerBirthday == null) ? null : format(updateLearnerBirthday, 'yyyy-MM-dd')),
                "avatar_url": newAvtSrc,
            }
        } else {
            userInput = {
                "fullname": updateLearnerFullname,
                "username": updateLearnerUsername,
                "password": updateLearnerPassword,
                "email": updateLearnerEmail,
                "address": updateLearnerAddress,
                "phone_number": updateLearnerPhoneNumber,
                "birthday": ((updateLearnerBirthday == "" || updateLearnerBirthday == null) ? null : format(updateLearnerBirthday, 'yyyy-MM-dd')),
                "avatar_url": newAvtSrc,
            }
        }

        const updateResult = await UpdateUserInfoByUserIdAPI(updateLearnerUUID, userInput);
        console.log(updateResult, userInput);

        if (updateResult === true) {
            setUpdateMessage(<CAlert color="success">Cập nhật thành công!</CAlert>);
            history.push("/manage-learner");
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
                    <CModalTitle>Cập nhật Học Viên</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="learner-uuid-input">UUID:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <p name="learner-id-static">{updateLearnerUUID}</p>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="update-learner-fullname-input">Họ và tên:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="text" id="update-learner-fullname-input" name="fullname" value={updateLearnerFullname} onChange={({ target }) => setUpdateLearnerFullname(target.value)} />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="update-learner-username-input">Tên tài khoản:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="text" id="update-learner-username-input" name="username" value={updateLearnerUsername} required={true} onChange={({ target }) => setUpdateLearnerUsername(target.value)} />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="update-learner-password-input">Mật khẩu:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="password" id="update-learner-password-input" name="update-learner-password-input" placeholder="[Không thay đổi]" value={updateLearnerPassword} onChange={({ target }) => setUpdateLearnerPassword(target.value)} />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="update-learner-email-input">Email:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="email" id="update-learner-email-input" name="update-learner-email-input" autoComplete="email" value={updateLearnerEmail} required={true} onChange={({ target }) => setUpdateLearnerEmail(target.value)} />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="update-learner-birthday-input">Ngày sinh:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            {(updateLearnerBirthday == "" || updateLearnerBirthday == null) ?
                                <DatePicker
                                    className="form-control"
                                    locale="vi"
                                    id="update-learner-birthday-input"
                                    name="update-learner-birthday-input"
                                    placeholderText="Ngày-Tháng-Năm"
                                    onChange={date => setUpdateLearnerBirthday(date)}
                                    dateFormat="dd-MM-yyyy"
                                />
                                :
                                <DatePicker
                                    className="form-control"
                                    locale="vi"
                                    id="update-learner-birthday-input"
                                    name="update-learner-birthday-input"
                                    selected={updateLearnerBirthday}
                                    placeholderText="Ngày-Tháng-Năm"
                                    onChange={date => setUpdateLearnerBirthday(date)}
                                    dateFormat="dd-MM-yyyy"
                                    value={updateLearnerBirthday}
                                />
                            }
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="update-learner-address-input">Địa chỉ:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="text" id="update-learner-address-input" name="update-learner-address-input" value={updateLearnerAddress} onChange={({ target }) => setUpdateLearnerAddress(target.value)} />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CCol md="4">
                            <CLabel htmlFor="update-learner-phone-input">Số điện thoại:</CLabel>
                        </CCol>
                        <CCol xs="12" md="8">
                            <CInput type="tel" id="update-learner-phone-input" name="update-learner-phone-input" value={updateLearnerPhoneNumber} onChange={({ target }) => setUpdateLearnerPhoneNumber(target.value)} />
                        </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                        <CLabel col md="4" htmlFor="update-learner-avatar-url">Ảnh đại diện:</CLabel>
                        <CCol xs="12" md="8">
                            <img id="updateLearnerAvt" className="mr-2" src={updateLearnerAvatarUrl} width="80" height="80" />
                            <CButton
                                color="info"
                                className="rounded-circle"
                                onClick={avtUrlUploadOnclick}
                            ><CIcon name="cil-pencil"></CIcon></CButton>
                            <CInputFile class="d-none" id="updateLearnerAvtUrlInput" name="update-learner-avatar-url" />
                        </CCol>
                    </CFormGroup>
                    {updateMessage}
                </CModalBody>
                <CModalFooter>
                    <CButton color="success" type="submit">
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

export default UpdateLearnerModal