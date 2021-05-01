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
import UpdateModeratorModal from '../manage-moderator/UpdateModeratorModal'
import AddModeratorModal from '../manage-moderator/AddModeratorModal'
import SuspendModeratorModal from '../manage-moderator/SuspendModeratorModal'
import UnsuspendModeratorModal from '../manage-moderator/UnsuspendModeratorModal'

import { format, parseISO } from 'date-fns';

import { usePromiseTracker, trackPromise } from "react-promise-tracker";

import { GetModeratorInfoListAPI } from '../../../api/user';

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
    { key: 'action', label: '', _style: { width: '6%' } }]

const ManageModerator = () => {
    const [addModeratorModalShow, setAddModeratorModalShow] = useState(false);
    const [suspendModeratorModalShow, setSuspendModeratorModalShow] = useState(false);
    const [unsuspendModeratorModalShow, setUnsuspendModeratorModalShow] = useState(false);
    const [updateModeratorModalShow, setUpdateModeratorModalShow] = useState(false);
    const [moderatorInfoList, setModeratorInfoList] = useState(null);
    const [selectedModeratorUsername, setSelectedModeratorUsername] = useState(null);
    const [refreshDataFlag, setRefreshDataFlag] = useState(false);

    const { promiseInProgress } = usePromiseTracker();

    useEffect(async () => {
        const moderatorInfoList = await trackPromise(GetModeratorInfoListAPI());
        setModeratorInfoList(moderatorInfoList);
    }, [refreshDataFlag])

    const updateModeratorOnclick = (moderatorUsername) => {
        //open the update moderator modal
        setUpdateModeratorModalShow(true);
        //set params
        setSelectedModeratorUsername(moderatorUsername);
    }

    const suspendModeratorOnclick = (moderatorUsername) => {
        //open the suspend moderator modal
        setSuspendModeratorModalShow(true);
        //set params
        setSelectedModeratorUsername(moderatorUsername);
    }

    const unsuspendModeratorOnclick = (moderatorUsername) => {
        //open the unsuspend moderator modal
        setUnsuspendModeratorModalShow(true);
        //set params
        setSelectedModeratorUsername(moderatorUsername);
    }

    const hideUpdateModal = () => {
        setUpdateModeratorModalShow(false);
    }

    const hideAddModal = () => {
        setAddModeratorModalShow(false);
    }

    const hideSuspendModal = () => {
        setSuspendModeratorModalShow(false);
    }

    const hideUnsuspendModal = () => {
        setUnsuspendModeratorModalShow(false);
    }

    //check permission
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const canManageModerator = userInfo.admin_details.can_manage_moderator;
    if (canManageModerator) {
        return (
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <h3 className="m-0">Danh sách Điều Hành Viên</h3>
                            <CButton color="primary" className="mt-2 d-flex align-items-center" onClick={() => setAddModeratorModalShow(true)}>
                                <CIcon name="cilPlus" size="sm" className="mr-1"></CIcon>Thêm mới Điều Hành Viên</CButton>
                        </CCardHeader>
                        <CCardBody className="pt-0 pb-0">
                            <CDataTable
                                addTableClasses="text-break"
                                items={moderatorInfoList}
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
                                                        <CIcon name="cil-pencil" onClick={() => updateModeratorOnclick(item.username)}>
                                                        </CIcon>
                                                    </button>
                                                    {item.is_suspended ?
                                                        <button type="button" className="table-action-button" data-toggle="tooltip" title="Mở Khóa">
                                                            <CIcon name="cil-lock-unlocked" onClick={() => unsuspendModeratorOnclick(item.username)}>
                                                            </CIcon>
                                                        </button>
                                                        : <button type="button" className="table-action-button" data-toggle="tooltip" title="Khóa">
                                                            <CIcon name="cil-lock-locked" onClick={() => suspendModeratorOnclick(item.username)}>
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
                {/*POPUP ADD MODERATOR*/}
                {addModeratorModalShow ?
                    <AddModeratorModal
                        show={addModeratorModalShow}
                        handleClose={() => hideAddModal}
                        refreshDataFlag={refreshDataFlag}
                        setRefreshDataFlag={setRefreshDataFlag} />
                    : null}
                {/*POPUP UPDATE MODERATOR*/}
                {(updateModeratorModalShow && selectedModeratorUsername != null) ?
                    <UpdateModeratorModal
                        selectedModeratorUsername={selectedModeratorUsername}
                        show={updateModeratorModalShow}
                        handleClose={() => hideUpdateModal}
                        refreshDataFlag={refreshDataFlag}
                        setRefreshDataFlag={setRefreshDataFlag}
                    />
                    : null}
                {/*POPUP SUSPEND MODERATOR*/}
                {suspendModeratorModalShow && selectedModeratorUsername ?
                    <SuspendModeratorModal
                        selectedModeratorUsername={selectedModeratorUsername}
                        show={suspendModeratorModalShow}
                        handleClose={() => hideSuspendModal}
                        refreshDataFlag={refreshDataFlag}
                        setRefreshDataFlag={setRefreshDataFlag}
                    /> : null}
                {/*POPUP UNSUSPEND MODERATOR*/}
                {unsuspendModeratorModalShow && selectedModeratorUsername ?
                    <UnsuspendModeratorModal
                        selectedModeratorUsername={selectedModeratorUsername}
                        show={unsuspendModeratorModalShow}
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

export default ManageModerator