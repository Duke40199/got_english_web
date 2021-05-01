import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CForm,
    CInputFile,
    CInput,
    CRow,
    CLabel,
    CAlert,
    CInvalidFeedback
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { UpdateUserInfoByUserIdAPI } from '../../../api/user';
import { GetMyProfileAPI } from '../../../api/login'
import firebase from '../../../firebase/firebase';

import { usePromiseTracker, trackPromise } from "react-promise-tracker";

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import vi from "date-fns/locale/vi";
import { format, parseISO } from 'date-fns';

import AccountValidator from '../../../reusable/AccountValidator';

const MyProfile = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const history = useHistory();

    const [fullname, setFullname] = useState(userInfo.fullname);
    const [username, setUsername] = useState(userInfo.username);
    const [password, setPassword] = useState("");
    const [email] = useState(userInfo.email);
    const [address, setAddress] = useState(userInfo.address);
    const [phoneNumber, setPhoneNumber] = useState(userInfo.phone_number);
    const [birthday, setBirthday] = useState((userInfo.birthday == "" || userInfo.birthday == null) ? "" : parseISO(userInfo.birthday));
    const [avtSrc, setAvtSrc] = useState((userInfo.avatar_url == "" || userInfo.avatar_url == null) ? "" : userInfo.avatar_url);
    const [fieldErrorMessages, setFieldErrorMessages] = useState({});
    const [updateMessage, setUpdateMessage] = useState(null);

    const { promiseInProgress } = usePromiseTracker();

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
        const imagesRef = storageRef.child('uploads/' + userInfo.id);
        const snapshot = await imagesRef.put(blob);
        const remoteUri = await snapshot.ref.getDownloadURL();

        // when we're done sending it, close and release the blob
        blob = null;

        return remoteUri;
    }

    const avtUrlUploadOnclick = () => {
        document.getElementById('avtUrlInput').click();
        document.getElementById('avtUrlInput').onchange = (e) => {
            const img = document.getElementById("myProfileAvt");
            const fileSize = e.target.files[0].size;
            const fileType = e.target.files[0].type;
            if (fileSize <= 300000 && (fileType == "image/jpeg" || fileType == "image/png" || fileType == "image/jpg")) {
                // create blob url
                const blobUrl = URL.createObjectURL(e.target.files[0]);
                // use blob url to preview avatar
                img.src = blobUrl;
                setAvtSrc(blobUrl);
            } else {
                setUpdateMessage(<CAlert color="danger">Hệ thống chỉ chấp nhận file hình ảnh JPEG, JPG, PNG và dung lượng không quá 300KB</CAlert>);
            }
        }
    }

    const onSubmitUpdateForm = async (e) => {
        e.preventDefault();

        const userInput = {
            "fullname": (fullname != null) ? fullname : null,
            "username": username,
            "password": (password !== "") ? password : null,
            "email": email,
            "address": (address != null) ? address : null,
            "phone_number": (phoneNumber != null) ? phoneNumber : null
        }

        const formValidate = AccountValidator(userInput);
        const noErrors = Object.keys(formValidate).length === 0;

        if (noErrors) {
            let updateProfileData = {};
            let newAvtSrc = "";

            //check if uploaded file is blob file from local
            if (avtSrc != null) {
                const isBlob = avtSrc.includes("blob:");
                newAvtSrc = avtSrc;
                if (isBlob) {
                    //upload local image to Firebase Storage
                    newAvtSrc = await trackPromise(uploadToStorage(avtSrc));
                } else {
                    //do nothing
                }
            }

            if (password === "") {
                updateProfileData = {
                    "fullname": fullname,
                    "username": username,
                    "address": address,
                    "phone_number": phoneNumber,
                    "birthday": ((birthday != "" && birthday != null) ? format(birthday, 'yyyy-MM-dd') : ""),
                    "avatar_url": newAvtSrc,
                }
            } else {
                updateProfileData = {
                    "fullname": fullname,
                    "username": username,
                    "password": password,
                    "address": address,
                    "phone_number": phoneNumber,
                    "birthday": ((birthday != "" && birthday != null) ? format(birthday, 'yyyy-MM-dd') : ""),
                    "avatar_url": newAvtSrc,
                }
            }

            const updateResult = await trackPromise(UpdateUserInfoByUserIdAPI(userInfo.id, updateProfileData));

            if (updateResult === true) {
                setUpdateMessage(<CAlert color="success">Cập nhật thành công!</CAlert>);
                if (userInfo.username != username) {
                    alert("Cập nhật thông tin thành công! Tuy nhiên, bạn đã thay đổi Tên tài khoản nên cần phải đăng nhập lại.");
                    localStorage.clear();
                    history.push("/");
                } else {
                    //refresh data
                    const newUserInfo = await trackPromise(GetMyProfileAPI());
                    localStorage.setItem("userInfo", JSON.stringify(newUserInfo));
                    history.push("/my-profile");
                }
            } else {
                setUpdateMessage(<CAlert color="danger">Cập nhật thất bại!</CAlert>);
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
        <CCol>
            {updateMessage}
            <CCard>
                <CCardBody>
                    <CForm onSubmit={onSubmitUpdateForm}>
                        <CRow>
                            <CCol sm="4" className="text-center">
                                <div className="rounded-circle d-inline-block overflow-hidden border-2 border-dark position-relative" width="auto">
                                    <img id="myProfileAvt" src={(userInfo.avatar_url == "" || userInfo.avatar_url == null) ? "/avatars/default_avt.png" : userInfo.avatar_url} width="250" height="250" />
                                    <CButton
                                        onClick={avtUrlUploadOnclick}
                                        color="info"
                                        className="rounded-circle upload-avt-button position-absolute"
                                        width="150">
                                        <CIcon name="cil-pencil"></CIcon>
                                    </CButton>
                                </div>
                                <CInputFile
                                    className="d-none"
                                    id="avtUrlInput"
                                    name="input-avatar-url"
                                />
                            </CCol>
                            <CCol sm="7">
                                <CRow>
                                    <CCol>
                                        <CLabel htmlFor="uuid">UUID:</CLabel>
                                        <p>{userInfo.id}</p>
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol>
                                        <CLabel htmlFor="address">Họ và tên:</CLabel>
                                        <CInput value={fullname} onChange={({ target }) => setFullname(target.value)} />
                                        {fieldErrorMessages.fullname != null ? <CInvalidFeedback
                                            className="d-block"
                                        >
                                            {fieldErrorMessages.fullname}
                                        </CInvalidFeedback>
                                            : null}
                                    </CCol>
                                </CRow>
                                <CRow className="mt-2">
                                    <CCol>
                                        <CLabel className="required" htmlFor="username">Tên tài khoản:</CLabel>
                                        <CInput value={username} onChange={({ target }) => setUsername(target.value)} required />
                                        {fieldErrorMessages.username != null ? <CInvalidFeedback
                                            className="d-block"
                                        >
                                            {fieldErrorMessages.username}
                                        </CInvalidFeedback>
                                            : null}
                                    </CCol>
                                    <CCol>
                                        <CLabel htmlFor="password">Mật khẩu:</CLabel>
                                        <CInput type="password" value={password} onChange={({ target }) => setPassword(target.value)} placeholder="[Không thay đổi]" />
                                        {fieldErrorMessages.password != null ? <CInvalidFeedback
                                            className="d-block"
                                        >
                                            {fieldErrorMessages.password}
                                        </CInvalidFeedback>
                                            : null}
                                    </CCol>
                                </CRow>
                                <CRow className="mt-2">
                                    <CCol>
                                        <CLabel htmlFor="phone_number">Số điện thoại:</CLabel>
                                        <CInput type="text" value={phoneNumber} onChange={({ target }) => setPhoneNumber(target.value)} />
                                        {fieldErrorMessages.phone_number != null ? <CInvalidFeedback
                                            className="d-block"
                                        >
                                            {fieldErrorMessages.phone_number}
                                        </CInvalidFeedback>
                                            : null}
                                    </CCol>
                                    <CCol>
                                        <CLabel htmlFor="email">Email:</CLabel>
                                        <CInput value={email} readOnly />
                                        {fieldErrorMessages.email != null ? <CInvalidFeedback
                                            className="d-block"
                                        >
                                            {fieldErrorMessages.email}
                                        </CInvalidFeedback>
                                            : null}
                                    </CCol>
                                </CRow>
                                <CRow className="mt-2">
                                    <CCol>
                                        <CLabel htmlFor="birthday">Ngày sinh:</CLabel>
                                        {
                                            birthday != "" ?
                                                <DatePicker
                                                    className="form-control"
                                                    locale="vi"
                                                    selected={birthday}
                                                    placeholderText="Ngày-Tháng-Năm"
                                                    onChange={date => setBirthday(date)}
                                                    dateFormat="dd-MM-yyyy"
                                                    maxDate={new Date()}
                                                    value={birthday}
                                                />
                                                :
                                                <DatePicker
                                                    className="form-control"
                                                    locale="vi"
                                                    placeholderText="Ngày-Tháng-Năm"
                                                    onChange={date => setBirthday(date)}
                                                    maxDate={new Date()}
                                                    dateFormat="dd-MM-yyyy"
                                                />
                                        }
                                    </CCol>
                                    <CCol>
                                        <CLabel htmlFor="address">Địa chỉ:</CLabel>
                                        <CInput value={address} onChange={({ target }) => setAddress(target.value)} />
                                        {fieldErrorMessages.address != null ? <CInvalidFeedback
                                            className="d-block"
                                        >
                                            {fieldErrorMessages.address}
                                        </CInvalidFeedback>
                                            : null}
                                    </CCol>
                                </CRow>
                                <CRow className="mt-2">
                                    <CCol>
                                        <CLabel htmlFor="createdAt">Tài khoản được tạo lúc:</CLabel>
                                        <p>{format(parseISO(userInfo.created_at), 'dd-MM-yyyy HH:mm:ss')}</p>
                                    </CCol>
                                    <CCol>
                                        <CLabel htmlFor="updatedAt">Lần cập nhật gần nhất lúc:</CLabel>
                                        <p>{format(parseISO(userInfo.updated_at), 'dd-MM-yyyy HH:mm:ss')}</p>
                                    </CCol>
                                </CRow>
                                <CRow className="mt-2 text-center">
                                    <CCol>
                                        <CButton className="mr-2" color="success" type="submit" disabled={promiseInProgress}>Cập nhật</CButton>
                                        <CButton color="secondary" onClick={() => history.push("/")}>Trở về Trang Chủ</CButton >
                                    </CCol>
                                </CRow>
                            </CCol>
                        </CRow>
                    </CForm>
                </CCardBody>
            </CCard>
        </CCol>

    )
}

export default MyProfile