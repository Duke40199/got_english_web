import React, { useState, useEffect } from 'react'

import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CRow,
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
    CForm
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import UpdateAdminModal from '../manage-admin/UpdateAdminModal'

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import vi from "date-fns/locale/vi";

import { usePromiseTracker, trackPromise } from "react-promise-tracker";

import usersData from '../../users/UsersData'
import { GetAdminInfoListAPI } from '../../../api/user';

const getBadge = status => {
    switch (status) {
        case 'Hoạt động': return 'success'
        case 'Đã khóa': return 'danger'
        default: return 'primary'
    }
}
const fields = [
    { key: 'username', label: 'Tên đăng nhập' },
    { key: 'email', label: 'Địa chỉ Email' },
    { key: 'birthday', label: 'Ngày sinh' },
    { key: 'address', label: 'Địa chỉ', _style: { width: '30%' } },
    { key: 'phone_number', label: 'Số điện thoại' },
    //{ key: 'status', label: 'Trạng thái' },
    { key: 'action', label: '' }]

const ManageAdmin = () => {
    const [addAdminModal, setAddAdminModalState] = useState(false);
    const [banAdminModal, setBanAdminModalState] = useState(false);
    const [updateAdminModalShow, setUpdateAdminModalShow] = useState(false);
    const [adminBirthday, setAdminBirthday] = useState(null);
    const [adminInfoList, setAdminInfoList] = useState(null);
    const [selectedAdminUsername, setSelectedAdminUsername] = useState(null);

    const { promiseInProgress } = usePromiseTracker();

    useEffect(async () => {
        const adminInfoList = await trackPromise(GetAdminInfoListAPI());
        setAdminInfoList(adminInfoList);
    }, [])

    const updateAdminOnclick = (adminUsername) => {
        //open the update admin modal
        setUpdateAdminModalShow(true);
        //set params
        setSelectedAdminUsername(adminUsername);
    }

    const hideModal = () => {
        setUpdateAdminModalShow(false);
    }

    registerLocale("vi", vi);

    return (
        <CRow>
            <CCol>
                <CCard>
                    <CCardHeader align="right">
                        <CButton color="primary" className="mt-2 d-flex align-items-center" onClick={() => setAddAdminModalState(!addAdminModal)}>
                            <CIcon name="cilPlus" size="sm" className="mr-1"></CIcon>Thêm mới Quản Trị Viên</CButton>
                    </CCardHeader>
                    <CCardBody className="pt-0 pb-0">
                        <CDataTable
                            items={adminInfoList}
                            fields={fields}
                            hover
                            striped
                            bordered
                            size="sm"
                            itemsPerPage={20}
                            pagination
                            loading={promiseInProgress}
                            noItemsView={{ noResults: 'Không có kết quả tìm kiếm trùng khớp', noItems: 'Không có dữ liệu' }}
                            tableFilter={
                                {
                                    label: "Tìm kiếm:",
                                    placeholder: " ",
                                }
                            }
                            scopedSlots={{
                                // 'status':
                                //     (item) => (
                                //         <td>
                                //             <CBadge color={getBadge(item.status)}>
                                //                 {item.status}
                                //             </CBadge>
                                //         </td>
                                //     ),
                                'action':
                                    (item, index) => {
                                        return (
                                            <td className="py-1"><CButton
                                                color="success"
                                                size="sm"
                                                className="mr-2"
                                                onClick={() => updateAdminOnclick(item.username)}>Cập nhật</CButton>
                                                <CButton
                                                    color="danger"
                                                    size="sm"
                                                    onClick={() => { setBanAdminModalState(!banAdminModal) }} >Khóa</CButton>
                                            </td>
                                        )
                                    },
                            }}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
            {/*POPUP ADD ADMIN*/}
            <CModal
                show={addAdminModal}
                onClose={() => setAddAdminModalState(!addAdminModal)}
                color="primary"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Thêm mới Quản Trị Viên</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="admin-id-input">Tên tài khoản</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput id="admin-id-input" name="admin-id-input" required={true} />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="admin-password-input">Mật khẩu</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput type="password" id="admin-password-input" name="admin-password-input" required={true} />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="admin-email-input">Email</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput type="email" id="admin-email-input" name="admin-email-input" autoComplete="email" required={true} />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="admin-birthday-input">Ngày sinh</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <DatePicker
                                    className="form-control"
                                    locale="vi"
                                    id="admin-birthday-input"
                                    name="admin-birthday-input"
                                    selected={adminBirthday}
                                    placeholderText="Ngày/Tháng/Năm"
                                    onChange={date => setAdminBirthday(date)}
                                    required={true}
                                    dateFormat="dd/MM/yyyy" />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="admin-occupation-input">Công việc</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput type="text" id="admin-occupation-input" name="admin-occupation-input" />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="admin-phone-input">Số điện thoại</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput type="tel" id="admin-phone-input" name="admin-phone-input" />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CLabel col md="3" htmlFor="file-input">Ảnh đại diện</CLabel>
                            <CCol xs="12" md="9">
                                <CInputFile id="file-input" name="file-input" />
                            </CCol>
                        </CFormGroup>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="primary" onClick={() => setAddAdminModalState(!addAdminModal)}>
                        Thêm
                </CButton>{' '}
                    <CButton color="secondary" onClick={() => setAddAdminModalState(!addAdminModal)}>
                        Hủy
                </CButton>
                </CModalFooter>
            </CModal>
            {/*POPUP BAN ADMIN*/}
            <CModal
                show={banAdminModal}
                onClose={() => setBanAdminModalState(!banAdminModal)}
                color="danger"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Khóa Quản Trị Viên</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    Bạn chắn chắn muốn khóa Quản Trị Viên này chứ?
                </CModalBody>
                <CModalFooter>
                    <CButton color="danger" onClick={() => setBanAdminModalState(!banAdminModal)}>
                        Khóa
                </CButton>{' '}
                    <CButton color="secondary" onClick={() => setBanAdminModalState(!banAdminModal)}>
                        Hủy
                </CButton>
                </CModalFooter>
            </CModal>
            {/*POPUP UPDATE ADMIN*/}
            {/* <CModal
                show={updateAdminModal}
                onClose={() => setUpdateAdminModalState(!updateAdminModal)}
                color="success"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Cập nhật Quản Trị Viên</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                        <CFormGroup row>
                            <CCol md="4">
                                <CLabel htmlFor="admin-uuid-input">UUID:</CLabel>
                            </CCol>
                            <CCol xs="12" md="8">
                                <p name="admin-id-static">{updateAdminInfo.id}</p>
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="4">
                                <CLabel htmlFor="update-admin-username-input">Tên đăng nhập:</CLabel>
                            </CCol>
                            <CCol xs="12" md="8">
                                <CInput type="text" id="update-admin-username-input" name="username" value={updateAdminInfo.username} required={true} onChange={({ target }) => handleInputChange(target.name, target.value)} />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="4">
                                <CLabel htmlFor="update-admin-password-input">Mật khẩu</CLabel>
                            </CCol>
                            <CCol xs="12" md="8">
                                <CInput type="password" id="update-admin-password-input" name="update-admin-password-input" defaultValue="" required={true} />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="4">
                                <CLabel htmlFor="update-admin-email-input">Email</CLabel>
                            </CCol>
                            <CCol xs="12" md="8">
                                <CInput type="email" id="update-admin-email-input" name="update-admin-email-input" autoComplete="email" defaultValue={updateAdminInfo.email} required={true} />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="4">
                                <CLabel htmlFor="update-admin-birthday-input">Ngày sinh</CLabel>
                            </CCol>
                            <CCol xs="12" md="8">
                                <DatePicker
                                    className="form-control"
                                    locale="vi"
                                    id="update-admin-birthday-input"
                                    name="update-admin-birthday-input"
                                    selected={adminBirthday}
                                    placeholderText="Ngày/Tháng/Năm"
                                    onChange={date => setAdminBirthday(date)}
                                    required={true}
                                    value={updateAdminInfo.birthday}
                                    dateFormat="dd/MM/yyyy" />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="4">
                                <CLabel htmlFor="update-admin-address-input">Địa chỉ</CLabel>
                            </CCol>
                            <CCol xs="12" md="8">
                                <CInput type="text" id="update-admin-address-input" name="update-admin-address-input" defaultValue={updateAdminInfo.address} />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="4">
                                <CLabel htmlFor="update-admin-phone-input">Số điện thoại</CLabel>
                            </CCol>
                            <CCol xs="12" md="8">
                                <CInput type="tel" id="update-admin-phone-input" name="update-admin-phone-input" defaultValue={updateAdminInfo.phone_number} />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CLabel col md="4" htmlFor="update-admin-avatar-url">Ảnh đại diện</CLabel>
                            <CCol xs="12" md="8">
                                <CInputFile id="update-admin-avatar-url" name="update-admin-avatar-url" />
                            </CCol>
                        </CFormGroup>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="success" onClick={() => setUpdateAdminModalState(!updateAdminModal)}>
                        Cập nhật
                </CButton>{' '}
                    <CButton color="secondary" onClick={() => setUpdateAdminModalState(!updateAdminModal)}>
                        Hủy
                </CButton>
                </CModalFooter>
            </CModal> */}
            <UpdateAdminModal
                selectedAdminUsername={selectedAdminUsername}
                show={updateAdminModalShow}
                handleClose={() => hideModal}
            />

        </CRow >
    );
}

export default ManageAdmin