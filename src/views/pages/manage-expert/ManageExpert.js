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
    { key: 'rating', label: 'Đánh giá' },
    { key: 'action', label: '' }]



const ManageExpert = () => {
    const [addExpertModal, setAddExpertModalState] = useState(false);
    const [banExpertModal, setBanExpertModalState] = useState(false);
    const [expertBirthday, setExpertBirthday] = useState(null);

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
                        <CButton color="primary" className="mt-2 d-flex align-items-center" onClick={() => setAddExpertModalState(!addExpertModal)}>
                            <CIcon name="cilPlus" size="sm" className="mr-1"></CIcon>Thêm mới Chuyên Gia</CButton>
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
                            scopedSlots={
                                {
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
                                                <td className="py-1">
                                                    <CButton
                                                        color="danger"
                                                        size="sm"
                                                        onClick={() => { setBanExpertModalState(!banExpertModal) }} >Khóa</CButton>
                                                </td>
                                            )
                                        },
                                    'rating':
                                        (item, index) => {
                                            return (
                                                <td className="py-1"><CButton
                                                    color="warning"
                                                    size="sm"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        window.location.href = '/manage-expert/view-expert-feedback';
                                                    }}
                                                >{item.rating.toFixed(1)}</CButton>
                                                </td>
                                            )
                                        },
                                }
                            }
                        />
                    </CCardBody>
                </CCard>
            </CCol>
            {/*POPUP ADD EXPERT*/}
            <CModal
                show={addExpertModal}
                onClose={() => setAddExpertModalState(!addExpertModal)}
                color="primary"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Thêm mới Chuyên Gia</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="expert-id-input">Tên tài khoản</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput id="expert-id-input" name="expert-id-input" required={true} />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="expert-password-input">Mật khẩu</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput type="password" id="expert-password-input" name="expert-password-input" required={true} />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="expert-email-input">Email</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput type="email" id="expert-email-input" name="expert-email-input" autoComplete="email" required={true} />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="expert-birthday-input">Ngày sinh</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <DatePicker
                                    className="form-control"
                                    locale="vi"
                                    id="expert-birthday-input"
                                    name="expert-birthday-input"
                                    selected={expertBirthday}
                                    placeholderText="Ngày/Tháng/Năm"
                                    onChange={date => setExpertBirthday(date)}
                                    required={true}
                                    dateFormat="dd/MM/yyyy" />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="expert-occupation-input">Công việc</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput type="text" id="expert-occupation-input" name="expert-occupation-input" />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="expert-phone-input">Số điện thoại</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput type="tel" id="expert-phone-input" name="expert-phone-input" />
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
                    <CButton color="primary" onClick={() => setAddExpertModalState(!addExpertModal)}>
                        Thêm
                </CButton>{' '}
                    <CButton color="secondary" onClick={() => setAddExpertModalState(!addExpertModal)}>
                        Hủy
                </CButton>
                </CModalFooter>
            </CModal>
            {/*POPUP BAN Expert*/}
            <CModal
                show={banExpertModal}
                onClose={() => setBanExpertModalState(!banExpertModal)}
                color="danger"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Khóa Chuyên Gia</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    Bạn chắn chắn muốn khóa Chuyên Gia này chứ?
                </CModalBody>
                <CModalFooter>
                    <CButton color="danger" onClick={() => setBanExpertModalState(!banExpertModal)}>
                        Khóa
                </CButton>{' '}
                    <CButton color="secondary" onClick={() => setBanExpertModalState(!banExpertModal)}>
                        Hủy
                </CButton>
                </CModalFooter>
            </CModal>
        </CRow >
    );
}

export default ManageExpert