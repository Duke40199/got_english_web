import React, { useState, useEffect } from 'react'

import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CRow,
    CButton,
    CModal,
    CModalHeader,
    CModalBody,
    CModalFooter,
    CModalTitle,
    CBadge,
    CAlert
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import UpdateExpertModal from '../manage-expert/UpdateExpertModal';
import AddExpertModal from '../manage-expert/AddExpertModal';

import { format, parseISO } from 'date-fns';

import { usePromiseTracker, trackPromise } from "react-promise-tracker";

import { GetExpertInfoListAPI } from '../../../api/user';

import usersData from '../../users/UsersData'

const getBadge = isSuspended => {
    switch (isSuspended) {
        case false: return 'success'
        case true: return 'danger'
        default: return 'success'
    }
}

const fields = [
    { key: 'fullname', label: 'Họ và tên', _style: { width: '12%' } },
    { key: 'username', label: 'Tên tài khoản', _style: { width: '12%' } },
    { key: 'email', label: 'Địa chỉ Email', _style: { width: '18%' } },
    { key: 'birthday', label: 'Ngày sinh', _style: { width: '10%' } },
    { key: 'address', label: 'Địa chỉ', _style: { width: '16%' } },
    { key: 'phone_number', label: 'Số điện thoại', _style: { width: '10%' } },
    { key: 'is_suspended', label: '', _style: { width: '8%' } },
    { key: 'average_rating', label: 'Đánh giá', _style: { width: '8%' } },
    { key: 'action', label: '', _style: { width: '6%' } }]



const ManageExpert = () => {
    const [addExpertModalShow, setAddExpertModalShow] = useState(false);
    const [banExpertModal, setBanExpertModalState] = useState(false);
    const [updateExpertModalShow, setUpdateExpertModalShow] = useState(false);
    const [expertInfoList, setExpertInfoList] = useState(null);
    const [selectedExpertUsername, setSelectedExpertUsername] = useState(null);

    const { promiseInProgress } = usePromiseTracker();

    useEffect(async () => {
        const expertInfoList = await trackPromise(GetExpertInfoListAPI());
        setExpertInfoList(expertInfoList);
    }, [updateExpertModalShow, addExpertModalShow])

    const updateExpertOnclick = (expertUsername) => {
        //open the update expert modal
        setUpdateExpertModalShow(true);
        //set params
        setSelectedExpertUsername(expertUsername);
    }

    const hideUpdateModal = () => {
        setUpdateExpertModalShow(false);
    }

    const hideAddModal = () => {
        setAddExpertModalShow(false);
    }

    //check permission
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const canManageExpert = userInfo.admin_details.can_manage_expert;
    if (canManageExpert) {
        return (
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader align="right">
                            <CButton color="primary" className="mt-2 d-flex align-items-center" onClick={() => setAddExpertModalShow(true)}>
                                <CIcon name="cilPlus" size="sm" className="mr-1"></CIcon>Thêm mới Chuyên Gia</CButton>
                        </CCardHeader>
                        <CCardBody className="pt-0 pb-0">
                            <CDataTable
                                addTableClasses="text-break"
                                items={expertInfoList}
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
                                    'fullname':
                                        (item) => (
                                            <td>
                                                {item.fullname == null ? "" : item.fullname}
                                            </td>
                                        ),
                                    'address':
                                        (item) => (
                                            <td>
                                                {item.address == null ? "" : item.address}
                                            </td>
                                        ),
                                    'phone_number':
                                        (item) => (
                                            <td>
                                                {item.phone_number == null ? "" : item.phone_number}
                                            </td>
                                        ),
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
                                            {(item.birthday == "" || item.birthday == null) ? "" : format(parseISO(item.birthday), "dd-MM-yyyy")}
                                        </td>),
                                    'average_rating':
                                        (item, index) => {
                                            return (
                                                <td className="py-1"><CButton
                                                    color="warning"
                                                    size="sm"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        window.location.href = '/manage-expert/view-expert-feedback';
                                                    }}
                                                >{item.expert_details.average_rating.toFixed(1)}</CButton>
                                                </td>
                                            )
                                        },
                                    'action':
                                        (item, index) => {
                                            return (
                                                <td className="py-1">

                                                    <button type="button" className="table-update-button mr-2" data-toggle="tooltip" title="Cập nhật">
                                                        <CIcon name="cil-pencil" onClick={() => updateExpertOnclick(item.username)}>
                                                        </CIcon>
                                                    </button>
                                                    <button type="button" className="table-ban-button" data-toggle="tooltip" title="Khóa">
                                                        <CIcon name="cil-lock-locked" onClick={() => { setBanExpertModalState(!banExpertModal) }}>
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
                {/*POPUP ADD EXPERT*/}
                {addExpertModalShow ?
                    <AddExpertModal
                        show={addExpertModalShow}
                        handleClose={() => hideAddModal} />
                    : null}
                {/*POPUP BAN EXPERT*/}
                <CModal
                    show={banExpertModal}
                    onClose={() => setBanExpertModalState(!banExpertModal)}
                    color="danger"
                >
                    <CModalHeader closeButton>
                        <CModalTitle>Khóa Học Viên</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        Bạn chắn chắn muốn khóa Học Viên này chứ?
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
                {/*POPUP UPDATE EXPERT*/}
                {(updateExpertModalShow && selectedExpertUsername != null) ?
                    <UpdateExpertModal
                        selectedExpertUsername={selectedExpertUsername}
                        show={updateExpertModalShow}
                        handleClose={() => hideUpdateModal}
                    />
                    : null}

            </CRow >
        );
    } else {
        return (
            <CAlert color="danger">Bạn không có quyền sử dụng chức năng này!</CAlert>
        );
    }
}

export default ManageExpert