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
import UpdateAdminModal from '../manage-admin/UpdateAdminModal'
import AddAdminModal from '../manage-admin/AddAdminModal'
import SuspendAdminModal from '../manage-admin/SuspendAdminModal'
import UnsuspendAdminModal from '../manage-admin/UnsuspendAdminModal'

import { format, parseISO } from 'date-fns';

import { usePromiseTracker, trackPromise } from "react-promise-tracker";

import { GetAdminInfoListAPI } from '../../../api/user';

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

const ManageAdmin = () => {
    const [addAdminModalShow, setAddAdminModalShow] = useState(false);
    const [suspendAdminModalShow, setSuspendAdminModalShow] = useState(false);
    const [unsuspendAdminModalShow, setUnsuspendAdminModalShow] = useState(false);
    const [updateAdminModalShow, setUpdateAdminModalShow] = useState(false);
    const [adminInfoList, setAdminInfoList] = useState(null);
    const [selectedAdminUsername, setSelectedAdminUsername] = useState(null);
    const [refreshDataFlag, setRefreshDataFlag] = useState(false);

    const { promiseInProgress } = usePromiseTracker();

    useEffect(() => {
        async function fetchData() {
            const adminInfoList = await trackPromise(GetAdminInfoListAPI());
            setAdminInfoList(adminInfoList);
        }
        fetchData();
    }, [refreshDataFlag])

    const updateAdminOnclick = (adminUsername) => {
        //open the update admin modal
        setUpdateAdminModalShow(true);
        //set params
        setSelectedAdminUsername(adminUsername);
    }

    const suspendAdminOnclick = (adminUsername) => {
        //open the suspend admin modal
        setSuspendAdminModalShow(true);
        //set params
        setSelectedAdminUsername(adminUsername);
    }

    const unsuspendAdminOnclick = (adminUsername) => {
        //open the unsuspend admin modal
        setUnsuspendAdminModalShow(true);
        //set params
        setSelectedAdminUsername(adminUsername);
    }

    const hideUpdateModal = () => {
        setUpdateAdminModalShow(false);
    }

    const hideAddModal = () => {
        setAddAdminModalShow(false);
    }

    const hideSuspendModal = () => {
        setSuspendAdminModalShow(false);
    }

    const hideUnsuspendModal = () => {
        setUnsuspendAdminModalShow(false);
    }

    //check permission
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const canManageAdmin = userInfo.admin_details.can_manage_admin;
    if (canManageAdmin) {
        return (
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <h3 className="m-0">Danh sách Quản Trị Viên</h3>
                            <CButton color="primary" className="mt-2 d-flex align-items-center" onClick={() => setAddAdminModalShow(true)}>
                                <CIcon name="cilPlus" size="sm" className="mr-1"></CIcon>Thêm mới Quản Trị Viên</CButton>
                        </CCardHeader>
                        <CCardBody className="pt-0 pb-0">
                            <CDataTable
                                addTableClasses="text-break"
                                items={adminInfoList}
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
                                            {(item.birthday === "" || item.birthday == null) ? "" : format(parseISO(item.birthday), "dd-MM-yyyy")}
                                        </td>),
                                    'action':
                                        (item, index) => {
                                            if (item.id === userInfo.id) {
                                                return (
                                                    <td className="py-1"></td>
                                                );
                                            } else {
                                                return (
                                                    <td className="py-1">
                                                        <button type="button" className="table-action-button mr-2" data-toggle="tooltip" title="Cập nhật" >
                                                            <CIcon name="cil-pencil" onClick={() => updateAdminOnclick(item.username)}>
                                                            </CIcon>
                                                        </button>
                                                        {item.is_suspended ?
                                                            <button type="button" className="table-action-button" data-toggle="tooltip" title="Mở Khóa">
                                                                <CIcon name="cil-lock-unlocked" onClick={() => unsuspendAdminOnclick(item.username)}>
                                                                </CIcon>
                                                            </button>
                                                            : <button type="button" className="table-action-button" data-toggle="tooltip" title="Khóa">
                                                                <CIcon name="cil-lock-locked" onClick={() => suspendAdminOnclick(item.username)}>
                                                                </CIcon>
                                                            </button>}
                                                    </td>
                                                )
                                            }
                                        },
                                }}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
                {/*POPUP ADD ADMIN*/}
                {addAdminModalShow ?
                    <AddAdminModal
                        show={addAdminModalShow}
                        handleClose={() => hideAddModal}
                        refreshDataFlag={refreshDataFlag}
                        setRefreshDataFlag={setRefreshDataFlag}
                    />
                    : null}
                {/*POPUP UPDATE ADMIN*/}
                {(updateAdminModalShow && selectedAdminUsername != null) ?
                    <UpdateAdminModal
                        selectedAdminUsername={selectedAdminUsername}
                        show={updateAdminModalShow}
                        handleClose={() => hideUpdateModal}
                        refreshDataFlag={refreshDataFlag}
                        setRefreshDataFlag={setRefreshDataFlag}
                    />
                    : null}
                {/*POPUP SUSPEND ADMIN*/}
                {suspendAdminModalShow && selectedAdminUsername ?
                    <SuspendAdminModal
                        selectedAdminUsername={selectedAdminUsername}
                        show={suspendAdminModalShow}
                        handleClose={() => hideSuspendModal}
                        refreshDataFlag={refreshDataFlag}
                        setRefreshDataFlag={setRefreshDataFlag}
                    /> : null}
                {/*POPUP UNSUSPEND ADMIN*/}
                {unsuspendAdminModalShow && selectedAdminUsername ?
                    <UnsuspendAdminModal
                        selectedAdminUsername={selectedAdminUsername}
                        show={unsuspendAdminModalShow}
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

export default ManageAdmin