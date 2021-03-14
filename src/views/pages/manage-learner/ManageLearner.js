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

const ManageLearner = () => {
    const [addLearnerModal, setAddLearnerModalState] = useState(false);
    const [banLearnerModal, setBanLearnerModalState] = useState(false);
    const [updateLearnerModal, setUpdateLearnerModalState] = useState(false);
    const [learnerBirthday, setLearnerBirthday] = useState(null);

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
                        <CButton color="primary" className="mt-2 d-flex align-items-center" onClick={() => setAddLearnerModalState(!addLearnerModal)}>
                            <CIcon name="cilPlus" size="sm" className="mr-1"></CIcon>Thêm mới Học Viên</CButton>
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
                                                onClick={() => { setUpdateLearnerModalState(!updateLearnerModal) }}>Cập nhật</CButton>
                                                <CButton
                                                    color="danger"
                                                    size="sm"
                                                    onClick={() => { setBanLearnerModalState(!banLearnerModal) }} >Khóa</CButton>
                                            </td>
                                        )
                                    },
                            }}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
            {/*POPUP ADD LEARNER*/}
            <CModal
                show={addLearnerModal}
                onClose={() => setAddLearnerModalState(!addLearnerModal)}
                color="primary"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Thêm mới Học Viên</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="learner-id-input">Tên tài khoản</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput id="learner-id-input" name="learner-id-input" required={true} />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="learner-password-input">Mật khẩu</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput type="password" id="learner-password-input" name="learner-password-input" required={true} />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="learner-email-input">Email</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput type="email" id="learner-email-input" name="learner-email-input" autoComplete="email" required={true} />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="learner-birthday-input">Ngày sinh</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <DatePicker
                                    className="form-control"
                                    locale="vi"
                                    id="learner-birthday-input"
                                    name="learner-birthday-input"
                                    selected={learnerBirthday}
                                    placeholderText="Ngày/Tháng/Năm"
                                    onChange={date => setLearnerBirthday(date)}
                                    required={true}
                                    dateFormat="dd/MM/yyyy" />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="learner-occupation-input">Công việc</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput type="text" id="learner-occupation-input" name="learner-occupation-input" />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="learner-phone-input">Số điện thoại</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput type="tel" id="learner-phone-input" name="learner-phone-input" />
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
                    <CButton color="primary" onClick={() => setAddLearnerModalState(!addLearnerModal)}>
                        Thêm
                </CButton>{' '}
                    <CButton color="secondary" onClick={() => setAddLearnerModalState(!addLearnerModal)}>
                        Hủy
                </CButton>
                </CModalFooter>
            </CModal>
            {/*POPUP BAN LEARNER*/}
            <CModal
                show={banLearnerModal}
                onClose={() => setBanLearnerModalState(!banLearnerModal)}
                color="danger"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Khóa Học Viên</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    Bạn chắn chắn muốn khóa Học Viên này chứ?
                </CModalBody>
                <CModalFooter>
                    <CButton color="danger" onClick={() => setBanLearnerModalState(!banLearnerModal)}>
                        Khóa
                </CButton>{' '}
                    <CButton color="secondary" onClick={() => setBanLearnerModalState(!banLearnerModal)}>
                        Hủy
                </CButton>
                </CModalFooter>
            </CModal>
            {/*POPUP UPDATE LEARNER*/}
            <CModal
                show={updateLearnerModal}
                onClose={() => setUpdateLearnerModalState(!updateLearnerModal)}
                color="success"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Cập nhật Học Viên</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="learner-id-input">Tên tài khoản</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <p className="learner-id-static">johndoe123</p>
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="learner-password-input">Mật khẩu</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput type="password" id="learner-password-input" name="learner-password-input" value="12345678" required={true} />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="learner-email-input">Email</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput type="email" id="learner-email-input" name="learner-email-input" autoComplete="email" value="john.doe@gmail.com" required={true} />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="learner-birthday-input">Ngày sinh</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <DatePicker
                                    className="form-control"
                                    locale="vi"
                                    id="learner-birthday-input"
                                    name="learner-birthday-input"
                                    selected={learnerBirthday}
                                    placeholderText="Ngày/Tháng/Năm"
                                    onChange={date => setLearnerBirthday(date)}
                                    required={true}
                                    value="02/03/1999"
                                    dateFormat="dd/MM/yyyy" />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="learner-occupation-input">Công việc</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput type="text" id="learner-occupation-input" name="learner-occupation-input" value="Gia sư" />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="learner-phone-input">Số điện thoại</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput type="tel" id="learner-phone-input" name="learner-phone-input" value="0902301399" />
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
                    <CButton color="success" onClick={() => setUpdateLearnerModalState(!updateLearnerModal)}>
                        Cập nhật
                </CButton>{' '}
                    <CButton color="secondary" onClick={() => setUpdateLearnerModalState(!updateLearnerModal)}>
                        Hủy
                </CButton>
                </CModalFooter>
            </CModal>
        </CRow >
    );
}

export default ManageLearner