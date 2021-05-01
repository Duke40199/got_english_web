import React, { useState, useEffect } from 'react'

import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CRow,
    CButton,
    CBadge,
    CAlert
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import UpdateLearnerModal from '../manage-learner/UpdateLearnerModal';
import AddLearnerModal from '../manage-learner/AddLearnerModal';
import SuspendLearnerModal from '../manage-learner/SuspendLearnerModal';
import UnsuspendLearnerModal from '../manage-learner/UnsuspendLearnerModal';

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
    const [suspendLearnerModalShow, setSuspendLearnerModalShow] = useState(false);
    const [unsuspendLearnerModalShow, setUnsuspendLearnerModalShow] = useState(false);
    const [updateLearnerModalShow, setUpdateLearnerModalShow] = useState(false);
    const [learnerInfoList, setLearnerInfoList] = useState(null);
    const [selectedLearnerUsername, setSelectedLearnerUsername] = useState(null);
    const [refreshDataFlag, setRefreshDataFlag] = useState(false);

    const { promiseInProgress } = usePromiseTracker();

    useEffect(async () => {
        const learnerInfoList = await trackPromise(GetLearnerInfoListAPI());
        setLearnerInfoList(learnerInfoList);
    }, [refreshDataFlag])

    const updateLearnerOnclick = (learnerUsername) => {
        //open the update learner modal
        setUpdateLearnerModalShow(true);
        //set params
        setSelectedLearnerUsername(learnerUsername);
    }

    const suspendLearnerOnclick = (moderatorUsername) => {
        //open the suspend moderator modal
        setSuspendLearnerModalShow(true);
        //set params
        setSelectedLearnerUsername(moderatorUsername);
    }

    const unsuspendLearnerOnclick = (moderatorUsername) => {
        //open the unsuspend moderator modal
        setUnsuspendLearnerModalShow(true);
        //set params
        setSelectedLearnerUsername(moderatorUsername);
    }

    const hideUpdateModal = () => {
        setUpdateLearnerModalShow(false);
    }

    const hideAddModal = () => {
        setAddLearnerModalShow(false);
    }

    const hideSuspendModal = () => {
        setSuspendLearnerModalShow(false);
    }

    const hideUnsuspendModal = () => {
        setUnsuspendLearnerModalShow(false);
    }

    //check permission
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const canManageLearner = userInfo.admin_details.can_manage_learner;
    if (canManageLearner) {
        return (
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                        <h3 className="m-0">Danh sách Học Viên</h3>
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
                                itemsPerPage={10}
                                pagination
                                loading={promiseInProgress}
                                noItemsView={{ noResults: 'Không có kết quả tìm kiếm trùng khớp', noItems: 'Không có dữ liệu' }}
                                tableFilter={
                                    {
                                        label: "Tìm kiếm:",
                                        placeholder: "nhập thông tin tài khoản bất kỳ...",
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

                                                    <button type="button" className="table-action-button mr-2" data-toggle="tooltip" title="Cập nhật">
                                                        <CIcon name="cil-pencil" onClick={() => updateLearnerOnclick(item.username)}>
                                                        </CIcon>
                                                    </button>
                                                    {item.is_suspended ?
                                                        <button type="button" className="table-action-button" data-toggle="tooltip" title="Mở Khóa">
                                                            <CIcon name="cil-lock-unlocked" onClick={() => unsuspendLearnerOnclick(item.username)}>
                                                            </CIcon>
                                                        </button>
                                                        : <button type="button" className="table-action-button" data-toggle="tooltip" title="Khóa">
                                                            <CIcon name="cil-lock-locked" onClick={() => suspendLearnerOnclick(item.username)}>
                                                            </CIcon>
                                                        </button>}
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
                        handleClose={() => hideAddModal}
                        refreshDataFlag={refreshDataFlag}
                        setRefreshDataFlag={setRefreshDataFlag} />
                    : null}
                {/*POPUP UPDATE LEARNER*/}
                {(updateLearnerModalShow && selectedLearnerUsername != null) ?
                    <UpdateLearnerModal
                        selectedLearnerUsername={selectedLearnerUsername}
                        show={updateLearnerModalShow}
                        handleClose={() => hideUpdateModal}
                        refreshDataFlag={refreshDataFlag}
                        setRefreshDataFlag={setRefreshDataFlag}
                    />
                    : null}
                {/*POPUP SUSPEND LEARNER*/}
                {suspendLearnerModalShow && selectedLearnerUsername ?
                    <SuspendLearnerModal
                        selectedLearnerUsername={selectedLearnerUsername}
                        show={suspendLearnerModalShow}
                        handleClose={() => hideSuspendModal}
                        refreshDataFlag={refreshDataFlag}
                        setRefreshDataFlag={setRefreshDataFlag}
                    /> : null}
                {/*POPUP UNSUSPEND LEARNER*/}
                {unsuspendLearnerModalShow && selectedLearnerUsername ?
                    <UnsuspendLearnerModal
                        selectedLearnerUsername={selectedLearnerUsername}
                        show={unsuspendLearnerModalShow}
                        handleClose={() => hideUnsuspendModal}
                        refreshDataFlag={refreshDataFlag}
                        setRefreshDataFlag={setRefreshDataFlag}
                    /> : null}
            </CRow >
        );
    } else {
        return (
            <CAlert color="danger">Bạn không có quyền sử dụng chức năng này!</CAlert>
        );
    }

}

export default ManageLearner