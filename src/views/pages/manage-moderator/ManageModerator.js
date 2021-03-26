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
import UpdateModeratorModal from '../manage-moderator/UpdateModeratorModal'

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import vi from "date-fns/locale/vi";
import { format, parseISO } from 'date-fns';

import { usePromiseTracker, trackPromise } from "react-promise-tracker";

import { GetModeratorInfoListAPI } from '../../../api/user';

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

const ManageModerator = () => {
    const [addModeratorModal, setAddModeratorModalState] = useState(false);
    const [banModeratorModal, setBanModeratorModalState] = useState(false);
    const [updateModeratorModalShow, setUpdateModeratorModalShow] = useState(false);
    const [moderatorBirthday, setModeratorBirthday] = useState(null);
    const [moderatorInfoList, setModeratorInfoList] = useState(null);
    const [selectedModeratorUsername, setSelectedModeratorUsername] = useState(null);

    const { promiseInProgress } = usePromiseTracker();

    useEffect(async () => {
        const moderatorInfoList = await trackPromise(GetModeratorInfoListAPI());
        setModeratorInfoList(moderatorInfoList);
    }, [])

    const updateModeratorOnclick = (moderatorUsername) => {
        //open the update moderator modal
        setUpdateModeratorModalShow(true);
        //set params
        setSelectedModeratorUsername(moderatorUsername);
    }

    const hideModal = () => {
        setUpdateModeratorModalShow(false);
    }

    registerLocale("vi", vi);

    return (
        <CRow>
            <CCol>
                <CCard>
                    <CCardHeader align="right">
                        <CButton color="primary" className="mt-2 d-flex align-items-center" onClick={() => setAddModeratorModalState(!addModeratorModal)}>
                            <CIcon name="cilPlus" size="sm" className="mr-1"></CIcon>Thêm mới Điều Hành Viên</CButton>
                    </CCardHeader>
                    <CCardBody className="pt-0 pb-0">
                        <CDataTable
                            items={moderatorInfoList}
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
                                        {item.birthday != "" ? format(parseISO(item.birthday), "dd/MM/yyyy") : ""}
                                    </td>),
                                'action':
                                    (item, index) => {
                                        return (
                                            <td className="py-1">

                                                <button type="button" class="table-update-button mr-2" data-toggle="tooltip" title="Cập nhật">
                                                    <CIcon name="cil-pencil" onClick={() => updateModeratorOnclick(item.username)}>
                                                    </CIcon>
                                                </button>
                                                <button type="button" class="table-ban-button" data-toggle="tooltip" title="Khóa">
                                                    <CIcon name="cil-lock-locked" onClick={() => { setBanModeratorModalState(!banModeratorModal) }}>
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
            {/*POPUP ADD MODERATOR*/}
            <CModal
                show={addModeratorModal}
                onClose={() => setAddModeratorModalState(!addModeratorModal)}
                color="primary"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Thêm mới Quản Trị Viên</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="moderator-id-input">Tên tài khoản</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput id="moderator-id-input" name="moderator-id-input" required={true} />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="moderator-password-input">Mật khẩu</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput type="password" id="moderator-password-input" name="moderator-password-input" required={true} />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="moderator-email-input">Email</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput type="email" id="moderator-email-input" name="moderator-email-input" autoComplete="email" required={true} />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="moderator-birthday-input">Ngày sinh</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <DatePicker
                                    className="form-control"
                                    locale="vi"
                                    id="moderator-birthday-input"
                                    name="moderator-birthday-input"
                                    selected={moderatorBirthday}
                                    placeholderText="Ngày/Tháng/Năm"
                                    onChange={date => setModeratorBirthday(date)}
                                    required={true}
                                    dateFormat="dd/MM/yyyy" />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="moderator-occupation-input">Công việc</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput type="text" id="moderator-occupation-input" name="moderator-occupation-input" />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="moderator-phone-input">Số điện thoại</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput type="tel" id="moderator-phone-input" name="moderator-phone-input" />
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
                    <CButton color="primary" onClick={() => setAddModeratorModalState(!addModeratorModal)}>
                        Thêm
                </CButton>{' '}
                    <CButton color="secondary" onClick={() => setAddModeratorModalState(!addModeratorModal)}>
                        Hủy
                </CButton>
                </CModalFooter>
            </CModal>
            {/*POPUP BAN MODERATOR*/}
            <CModal
                show={banModeratorModal}
                onClose={() => setBanModeratorModalState(!banModeratorModal)}
                color="danger"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Khóa Quản Trị Viên</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    Bạn chắn chắn muốn khóa Quản Trị Viên này chứ?
                </CModalBody>
                <CModalFooter>
                    <CButton color="danger" onClick={() => setBanModeratorModalState(!banModeratorModal)}>
                        Khóa
                </CButton>{' '}
                    <CButton color="secondary" onClick={() => setBanModeratorModalState(!banModeratorModal)}>
                        Hủy
                </CButton>
                </CModalFooter>
            </CModal>
            {/*POPUP UPDATE MODERATOR*/}
            <UpdateModeratorModal
                selectedModeratorUsername={selectedModeratorUsername}
                show={updateModeratorModalShow}
                handleClose={() => hideModal}
            />

        </CRow >
    );
}

export default ManageModerator