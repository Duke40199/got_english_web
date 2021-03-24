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
    CForm,
    CBadge
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import UpdateAdminModal from '../manage-admin/UpdateAdminModal'

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import vi from "date-fns/locale/vi";
import { format } from 'date-fns';

import { usePromiseTracker, trackPromise } from "react-promise-tracker";

import { GetAdminInfoListAPI } from '../../../api/user';

const getBadge = isSuspended => {
    switch (isSuspended) {
        case false: return 'success'
        case true: return 'danger'
        default: return 'primary'
    }
}
const fields = [
    { key: 'fullname', label: 'Họ và tên', _style: { width: '14%' } },
    { key: 'username', label: 'Tên đăng nhập', _style: { width: '11%' } },
    { key: 'email', label: 'Địa chỉ Email', _style: { width: '10%' } },
    { key: 'birthday', label: 'Ngày sinh', _style: { width: '10%' } },
    { key: 'address', label: 'Địa chỉ', _style: { width: '24%' } },
    { key: 'phone_number', label: 'Số điện thoại', _style: { width: '10%' } },
    { key: 'is_suspended', label: '', _style: { width: '8%' } },
    //{ key: 'status', label: 'Trạng thái' },
    { key: 'action', label: '', _style: { width: '5%' } }]

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
                                    placeholder: "nhập dữ liệu...",
                                }
                            }
                            scopedSlots={{
                                'is_suspended':
                                    (item) => (
                                        <td>
                                            <CBadge color={getBadge(item.is_suspended)}>
                                                {item.is_suspended ? "Đã khóa" : "Hoạt động"}
                                            </CBadge>
                                        </td>
                                    ),
                                'birthday':
                                    (item) => (<td>
                                        {format(new Date(item.birthday), "dd/MM/yyyy")}
                                    </td>),
                                'action':
                                    (item, index) => {
                                        return (
                                            <td className="py-1">

                                                <button type="button" class="admin-update-button mr-2" data-toggle="tooltip" title="Cập nhật">
                                                    <CIcon name="cil-pencil" onClick={() => updateAdminOnclick(item.username)}>
                                                    </CIcon>
                                                </button>
                                                <button type="button" class="admin-ban-button" data-toggle="tooltip" title="Khóa">
                                                    <CIcon name="cil-lock-locked" onClick={() => { setBanAdminModalState(!banAdminModal) }}>
                                                    </CIcon>
                                                </button>
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
            <UpdateAdminModal
                selectedAdminUsername={selectedAdminUsername}
                show={updateAdminModalShow}
                handleClose={() => hideModal}
            />

        </CRow >
    );
}

export default ManageAdmin