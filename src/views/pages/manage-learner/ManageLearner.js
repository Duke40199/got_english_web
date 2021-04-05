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
import UpdateLearnerModal from '../manage-learner/UpdateLearnerModal';
import AddLearnerModal from '../manage-learner/AddLearnerModal';

import { format, parseISO } from 'date-fns';

import { usePromiseTracker, trackPromise } from "react-promise-tracker";

import { GetLearnerInfoListAPI } from '../../../api/user';

const getBadge = isSuspended => {
    switch (isSuspended) {
        case false: return 'success'
        case true: return 'danger'
        default: return 'success'
    }
}

const fields = [
    { key: 'fullname', label: 'Họ và tên', _style: { width: '14%' } },
    { key: 'username', label: 'Tên tài khoản', _style: { width: '12%' } },
    { key: 'email', label: 'Địa chỉ Email', _style: { width: '20%' } },
    { key: 'birthday', label: 'Ngày sinh', _style: { width: '10%' } },
    { key: 'address', label: 'Địa chỉ', _style: { width: '20%' } },
    { key: 'phone_number', label: 'Số điện thoại', _style: { width: '10%' } },
    { key: 'is_suspended', label: '', _style: { width: '8%' } },
    //{ key: 'status', label: 'Trạng thái' },
    { key: 'action', label: '', _style: { width: '6%' } }]

const ManageLearner = () => {
    const [addLearnerModalShow, setAddLearnerModalShow] = useState(false);
    const [banLearnerModal, setBanLearnerModalState] = useState(false);
    const [updateLearnerModalShow, setUpdateLearnerModalShow] = useState(false);
    const [learnerInfoList, setLearnerInfoList] = useState(null);
    const [selectedLearnerUsername, setSelectedLearnerUsername] = useState(null);

    const { promiseInProgress } = usePromiseTracker();

    useEffect(async () => {
        const learnerInfoList = await trackPromise(GetLearnerInfoListAPI());
        setLearnerInfoList(learnerInfoList);
    }, [updateLearnerModalShow, addLearnerModalShow])

    const updateLearnerOnclick = (learnerUsername) => {
        //open the update learner modal
        setUpdateLearnerModalShow(true);
        //set params
        setSelectedLearnerUsername(learnerUsername);
    }

    const hideUpdateModal = () => {
        setUpdateLearnerModalShow(false);
    }

    const hideAddModal = () => {
        setAddLearnerModalShow(false);
    }

    //check permission
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const canManageLearner = userInfo.admin_details.can_manage_learner;
    if (canManageLearner) {
        return (
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader align="right">
                            <CButton color="primary" className="mt-2 d-flex align-items-center" onClick={() => setAddLearnerModalShow(true)}>
                                <CIcon name="cilPlus" size="sm" className="mr-1"></CIcon>Thêm mới Học Viên</CButton>
                        </CCardHeader>
                        <CCardBody className="pt-0 pb-0">
                            <CDataTable
                                addTableClasses="text-break"
                                items={learnerInfoList}
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
                                    'action':
                                        (item, index) => {
                                            return (
                                                <td className="py-1">

                                                    <button type="button" className="table-update-button mr-2" data-toggle="tooltip" title="Cập nhật">
                                                        <CIcon name="cil-pencil" onClick={() => updateLearnerOnclick(item.username)}>
                                                        </CIcon>
                                                    </button>
                                                    <button type="button" className="table-ban-button" data-toggle="tooltip" title="Khóa">
                                                        <CIcon name="cil-lock-locked" onClick={() => { setBanLearnerModalState(!banLearnerModal) }}>
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
                {/*POPUP ADD LEARNER*/}
                {addLearnerModalShow ?
                    <AddLearnerModal
                        show={addLearnerModalShow}
                        handleClose={() => hideAddModal} />
                    : null}
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
                {(updateLearnerModalShow && selectedLearnerUsername != null) ?
                    <UpdateLearnerModal
                        selectedLearnerUsername={selectedLearnerUsername}
                        show={updateLearnerModalShow}
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

export default ManageLearner