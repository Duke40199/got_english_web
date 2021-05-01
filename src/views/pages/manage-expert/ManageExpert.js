import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

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
import UpdateExpertModal from '../manage-expert/UpdateExpertModal';
import AddExpertModal from '../manage-expert/AddExpertModal';
import SuspendExpertModal from '../manage-expert/SuspendExpertModal';
import UnsuspendExpertModal from '../manage-expert/UnsuspendExpertModal';

import { format, parseISO } from 'date-fns';

import { usePromiseTracker, trackPromise } from "react-promise-tracker";

import { GetExpertInfoListAPI } from '../../../api/user';

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
    const history = useHistory();

    const [addExpertModalShow, setAddExpertModalShow] = useState(false);
    const [suspendExpertModalShow, setSuspendExpertModalShow] = useState(false);
    const [unsuspendExpertModalShow, setUnsuspendExpertModalShow] = useState(false);
    const [updateExpertModalShow, setUpdateExpertModalShow] = useState(false);
    const [expertInfoList, setExpertInfoList] = useState(null);
    const [selectedExpertUsername, setSelectedExpertUsername] = useState(null);
    const [refreshDataFlag, setRefreshDataFlag] = useState(false);

    const { promiseInProgress } = usePromiseTracker();

    useEffect(async () => {
        const expertInfoList = await trackPromise(GetExpertInfoListAPI());
        setExpertInfoList(expertInfoList);
    }, [refreshDataFlag])

    const updateExpertOnclick = (expertUsername) => {
        //open the update expert modal
        setUpdateExpertModalShow(true);
        //set params
        setSelectedExpertUsername(expertUsername);
    }

    const suspendExpertOnclick = (moderatorUsername) => {
        //open the suspend moderator modal
        setSuspendExpertModalShow(true);
        //set params
        setSelectedExpertUsername(moderatorUsername);
    }

    const unsuspendExpertOnclick = (moderatorUsername) => {
        //open the unsuspend moderator modal
        setUnsuspendExpertModalShow(true);
        //set params
        setSelectedExpertUsername(moderatorUsername);
    }

    const hideUpdateModal = () => {
        setUpdateExpertModalShow(false);
    }

    const hideAddModal = () => {
        setAddExpertModalShow(false);
    }

    const hideSuspendModal = () => {
        setSuspendExpertModalShow(false);
    }

    const hideUnsuspendModal = () => {
        setUnsuspendExpertModalShow(false);
    }

    //check permission
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const canManageExpert = userInfo.admin_details.can_manage_expert;
    if (canManageExpert) {
        return (
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <h3 className="m-0">Danh sách Chuyên Gia</h3>
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
                                    'average_rating':
                                        (item, index) => {
                                            return (
                                                <td className="py-1"><CButton
                                                    color="warning"
                                                    size="sm"
                                                    onClick={() => {
                                                        history.push("/manage-expert/view-expert-feedback?expertId=" + item.expert_details.id);
                                                    }}
                                                >{item.expert_details.average_rating.toFixed(1)}</CButton>
                                                </td>
                                            )
                                        },
                                    'action':
                                        (item, index) => {
                                            return (
                                                <td className="py-1">

                                                    <button type="button" className="table-action-button mr-2" data-toggle="tooltip" title="Cập nhật">
                                                        <CIcon name="cil-pencil" onClick={() => updateExpertOnclick(item.username)}>
                                                        </CIcon>
                                                    </button>
                                                    {item.is_suspended ?
                                                        <button type="button" className="table-action-button" data-toggle="tooltip" title="Mở Khóa">
                                                            <CIcon name="cil-lock-unlocked" onClick={() => unsuspendExpertOnclick(item.username)}>
                                                            </CIcon>
                                                        </button>
                                                        : <button type="button" className="table-action-button" data-toggle="tooltip" title="Khóa">
                                                            <CIcon name="cil-lock-locked" onClick={() => suspendExpertOnclick(item.username)}>
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
                {/*POPUP ADD EXPERT*/}
                {addExpertModalShow ?
                    <AddExpertModal
                        show={addExpertModalShow}
                        handleClose={() => hideAddModal}
                        refreshDataFlag={refreshDataFlag}
                        setRefreshDataFlag={setRefreshDataFlag} />
                    : null}
                {/*POPUP UPDATE EXPERT*/}
                {(updateExpertModalShow && selectedExpertUsername != null) ?
                    <UpdateExpertModal
                        selectedExpertUsername={selectedExpertUsername}
                        show={updateExpertModalShow}
                        handleClose={() => hideUpdateModal}
                        refreshDataFlag={refreshDataFlag}
                        setRefreshDataFlag={setRefreshDataFlag}
                    />
                    : null}
                {/*POPUP SUSPEND EXPERT*/}
                {suspendExpertModalShow && selectedExpertUsername ?
                    <SuspendExpertModal
                        selectedExpertUsername={selectedExpertUsername}
                        show={suspendExpertModalShow}
                        handleClose={() => hideSuspendModal}
                        refreshDataFlag={refreshDataFlag}
                        setRefreshDataFlag={setRefreshDataFlag}
                    /> : null}
                {/*POPUP UNSUSPEND EXPERT*/}
                {unsuspendExpertModalShow && selectedExpertUsername ?
                    <UnsuspendExpertModal
                        selectedExpertUsername={selectedExpertUsername}
                        show={unsuspendExpertModalShow}
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

export default ManageExpert