import React, { useState } from 'react'

import {
    CBadge,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CRow,
    CInput,
    CInputGroup,
    CInputGroupAppend,
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

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import vi from "date-fns/locale/vi";

import usersData from '../../users/UsersData'

const getBadge = status => {
    switch (status) {
        case 'Hoạt động': return 'success'
        case 'Đã khóa': return 'danger'
        default: return 'primary'
    }
}
const fields = [
    { key: 'fullname', label: 'Họ và Tên' },
    { key: 'email', label: 'Địa chỉ Email' },
    { key: 'birthday', label: 'Ngày sinh' },
    { key: 'occupation', label: 'Công việc' },
    { key: 'phone', label: 'Số điện thoại' },
    { key: 'status', label: 'Trạng thái' },
    { key: 'action', label: '' }]



const ManageAdmin = () => {
    const [addAdminModal, setAddAdminModalState] = useState(false);
    const [banAdminModal, setBanAdminModalState] = useState(false);
    const [updateAdminModal, setUpdateAdminModalState] = useState(false);
    const [adminBirthday, setAdminBirthday] = useState(null);

    registerLocale("vi", vi);

    return (
        <CRow>
            <CCol>
                <CCard>
                    <CCardHeader align="right">
                        <CInputGroup>
                            <CInput type="text" name="searchUserName" placeholder="Nhập tên: v.d Nguyen Van A,..." />
                            <CInputGroupAppend>
                                <CButton type="button" color="primary">Tìm kiếm</CButton>
                            </CInputGroupAppend>
                        </CInputGroup>
                        <CButton color="primary" className="mt-2 d-flex align-items-center" onClick={() => setAddAdminModalState(!addAdminModal)}>
                            <CIcon name="cilPlus" size="sm" className="mr-1"></CIcon>Thêm mới Quản Trị Viên</CButton>
                    </CCardHeader>
                    <CCardBody>
                        <CDataTable
                            items={usersData}
                            fields={fields}
                            hover
                            striped
                            bordered
                            size="sm"
                            itemsPerPage={20}
                            pagination
                            scopedSlots={{
                                'status':
                                    (item) => (
                                        <td>
                                            <CBadge color={getBadge(item.status)}>
                                                {item.status}
                                            </CBadge>
                                        </td>
                                    ),
                                'action':
                                    (item, index) => {
                                        return (
                                            <td className="py-1"><CButton
                                                color="success"
                                                size="sm"
                                                className="mr-2"
                                                onClick={() => { setUpdateAdminModalState(!updateAdminModal) }}>Cập nhật</CButton>
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
            <CModal
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
                            <CCol md="3">
                                <CLabel htmlFor="admin-id-input">Tên tài khoản</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <p className="admin-id-static">johndoe123</p>
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="admin-password-input">Mật khẩu</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput type="password" id="admin-password-input" name="admin-password-input" value="12345678" required={true} />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="admin-email-input">Email</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput type="email" id="admin-email-input" name="admin-email-input" autoComplete="email" value="john.doe@gmail.com" required={true} />
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
                                    value="02/03/1999"
                                    dateFormat="dd/MM/yyyy" />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="admin-occupation-input">Công việc</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput type="text" id="admin-occupation-input" name="admin-occupation-input" value="Gia sư" />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="admin-phone-input">Số điện thoại</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput type="tel" id="admin-phone-input" name="admin-phone-input" value="0902301399" />
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
                    <CButton color="success" onClick={() => setUpdateAdminModalState(!updateAdminModal)}>
                        Cập nhật
                </CButton>{' '}
                    <CButton color="secondary" onClick={() => setUpdateAdminModalState(!updateAdminModal)}>
                        Hủy
                </CButton>
                </CModalFooter>
            </CModal>
        </CRow >
    );
}

export default ManageAdmin