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
    CModal,
    CModalFooter,
    CModalBody,
    CModalHeader,
    CModalTitle,
    CAlert
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { UpdateUserInfoByUserIdAPI, GetUserInfoAPI } from '../../../api/user';
import firebase from '../../../firebase/firebase';

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import vi from "date-fns/locale/vi";
import { format, parseISO } from 'date-fns';


const MyProfile = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const history = useHistory();

    const [fullname, setFullname] = useState(userInfo.fullname);
    const [username, setUsername] = useState(userInfo.username);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(userInfo.email);
    const [address, setAddress] = useState(userInfo.address);
    const [phoneNumber, setPhoneNumber] = useState(userInfo.phone_number);
    const [birthday, setBirthday] = useState(parseISO(userInfo.birthday));
    const [avtSrc, setAvtSrc] = useState(userInfo.avatar_url);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [updateMessage, setUpdateMessage] = useState(null);

    const getFileBlob = (url, cb) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.responseType = "blob";
        xhr.addEventListener('load', function () {
            cb(xhr.response);
        });
        xhr.send();
    };

    const uploadToStorage = (imageURL) => {
        const storageRef = firebase.storage().ref();
        const imagesRef = storageRef.child('uploads/' + userInfo.id);

        getFileBlob(imageURL, blob => {
            imagesRef.put(blob).then(function (snapshot) {
                console.log('Uploaded a blob!');
            });

        });

        return imagesRef.getDownloadURL();
    }

    const avtUrlUploadOnclick = () => {
        document.getElementById('avtUrlInput').click();
        document.getElementById('avtUrlInput').onchange = (e) => {
            const img = document.getElementById("myProfileAvt");
            const fileSize = e.target.files[0].size;
            const fileType = e.target.files[0].type;
            console.log(fileSize, fileType);
            if (fileSize <= 300000 && (fileType == "image/jpeg" || fileType == "image/png" || fileType == "image/jpg")) {
                // create blob url
                const blobUrl = URL.createObjectURL(e.target.files[0]);
                // use blob url to preview avatar
                img.src = blobUrl;
                setAvtSrc(blobUrl);
                img.onchange = () => {
                    // delete blob url when the avatar loaded successfully
                    URL.revokeObjectURL(blobUrl);
                }
            } else {
                setUpdateMessage(<CAlert color="danger">Hệ thống chỉ chấp nhận file hình ảnh JPEG, JPG, PNG và dung lượng không quá 300KB</CAlert>);
            }
        }
    }

    const onSubmitUpdateForm = async (e) => {
        e.preventDefault();

        let userInput = {};

        //upload local image to Firebase Storage
        const newAvtSrc = await uploadToStorage(avtSrc);
        console.log(newAvtSrc);

        if (password === "") {
            userInput = {
                "fullname": fullname,
                "username": username,
                "email": email,
                "address": address,
                "phone_number": phoneNumber,
                "birthday": format(birthday, 'yyyy/MM/dd'),
                "avatar_url": newAvtSrc,
            }
        } else {
            userInput = {
                "fullname": fullname,
                "username": username,
                "password": password,
                "email": email,
                "address": address,
                "phone_number": phoneNumber,
                "birthday": format(birthday, 'yyyy/MM/dd'),
                "avatar_url": newAvtSrc,
            }
        }

        console.log(userInput);

        const updateResult = await UpdateUserInfoByUserIdAPI(userInfo.id, userInput);

        if (updateResult === true) {
            setUpdateMessage(<CAlert color="success">Cập nhật thành công!</CAlert>);
            const newUserInfo = await GetUserInfoAPI(username);
            localStorage.setItem("userInfo", JSON.stringify(newUserInfo));
            history.push("/my-profile");
        } else {
            setUpdateMessage(<CAlert color="danger">Cập nhật thất bại!</CAlert>);
        }

        setConfirmModalOpen(false);
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
                                    <img id="myProfileAvt" src={userInfo.avatar_url != "" ? userInfo.avatar_url : "/avatars/default_avt.png"} width="250" height="250" />
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
                                    </CCol>
                                </CRow>
                                <CRow className="mt-2">
                                    <CCol>
                                        <CLabel htmlFor="username">Tên đăng nhập:</CLabel>
                                        <CInput value={username} onChange={({ target }) => setUsername(target.value)} />
                                    </CCol>
                                    <CCol>
                                        <CLabel htmlFor="password">Mật khẩu:</CLabel>
                                        <CInput type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
                                    </CCol>
                                </CRow>
                                <CRow className="mt-2">
                                    <CCol>
                                        <CLabel htmlFor="phone_number">Số điện thoại:</CLabel>
                                        <CInput value={phoneNumber} onChange={({ target }) => setPhoneNumber(target.value)} />
                                    </CCol>
                                    <CCol>
                                        <CLabel htmlFor="email">Email:</CLabel>
                                        <CInput value={email} onChange={({ target }) => setEmail(target.value)} />
                                    </CCol>
                                </CRow>
                                <CRow className="mt-2">
                                    <CCol>
                                        <CLabel htmlFor="birthday">Ngày sinh:</CLabel>
                                        <DatePicker
                                            ignoreReadonly
                                            maxDate="-1y"
                                            className="form-control"
                                            locale="vi"
                                            selected={birthday}
                                            placeholderText="Ngày-Tháng-Năm"
                                            onChange={date => setBirthday(date)}
                                            required={true}
                                            value={birthday}
                                            dateFormat="dd-MM-yyyy" />
                                    </CCol>
                                    <CCol>
                                        <CLabel htmlFor="address">Địa chỉ:</CLabel>
                                        <CInput value={address} onChange={({ target }) => setAddress(target.value)} />
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
                                        <CButton className="mr-2" color="success" onClick={() => setConfirmModalOpen(true)}>Cập nhật</CButton>
                                        <CButton color="secondary" onClick={() => history.push("/")}>Trở về Trang Chủ</CButton >
                                    </CCol>
                                </CRow>
                            </CCol>
                        </CRow>
                        <CModal
                            show={confirmModalOpen}
                            onClose={() => setConfirmModalOpen(false)}
                            closeOnBackdrop={false}
                            color="success">
                            <CModalHeader closeButton>
                                <CModalTitle>Xác nhận cập nhật</CModalTitle>
                            </CModalHeader>
                            <CModalBody>
                                <strong>Thông tin sau khi cập nhật:</strong>
                                <CRow>
                                    <CCol sm="4">
                                        <CLabel>Họ và tên:</CLabel>
                                    </CCol>
                                    <CCol>{fullname}</CCol>
                                </CRow>
                                <CRow>
                                    <CCol sm="4">
                                        <CLabel>Tên đăng nhập:</CLabel>
                                    </CCol>
                                    <CCol>{username}</CCol>
                                </CRow>
                                <CRow>
                                    <CCol sm="4">
                                        <CLabel>Mật khẩu:</CLabel>
                                    </CCol>
                                    <CCol>{password == "" ? "[Không thay đổi]" : password}</CCol>
                                </CRow>
                                <CRow>
                                    <CCol sm="4">
                                        <CLabel>Email:</CLabel>
                                    </CCol>
                                    <CCol>{email}</CCol>
                                </CRow>
                                <CRow>
                                    <CCol sm="4">
                                        <CLabel>Ngày sinh:</CLabel>
                                    </CCol>
                                    <CCol>{format(birthday, 'dd-MM-yyyy')}</CCol>
                                </CRow>
                                <CRow>
                                    <CCol sm="4">
                                        <CLabel>Điện thoại:</CLabel>
                                    </CCol>
                                    <CCol>{phoneNumber}</CCol>
                                </CRow>
                                <CRow>
                                    <CCol sm="4">
                                        <CLabel>Địa chỉ:</CLabel>
                                    </CCol>
                                    <CCol>{address}</CCol>
                                </CRow>
                                <CRow>
                                    <CCol sm="4">
                                        <CLabel>Ảnh đại diện:</CLabel>
                                    </CCol>
                                    <CCol><img src={avtSrc} width="80" height="80" /></CCol>
                                </CRow>
                            </CModalBody>
                            <CModalFooter>
                                <CButton type="submit" color="success">
                                    Xác nhận
                            </CButton>
                                <CButton color="secondary" onClick={() => setConfirmModalOpen(false)}>
                                    Hủy
                            </CButton>
                            </CModalFooter>
                        </CModal>
                    </CForm>
                </CCardBody>
            </CCard>
        </CCol>

    )
}

export default MyProfile