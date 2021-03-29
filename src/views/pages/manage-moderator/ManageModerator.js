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
    CBadge
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import UpdateModeratorModal from '../manage-moderator/UpdateModeratorModal'
import AddModeratorModal from '../manage-moderator/AddModeratorModal'

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
    { key: 'fullname', label: 'Họ và tên', _style: { width: '15%' } },
    { key: 'username', label: 'Tên đăng nhập', _style: { width: '15%' } },
    { key: 'email', label: 'Địa chỉ Email', _style: { width: '12%' } },
    { key: 'birthday', label: 'Ngày sinh', _style: { width: '10%' } },
    { key: 'address', label: 'Địa chỉ', _style: { width: '24%' } },
    { key: 'phone_number', label: 'Số điện thoại', _style: { width: '10%' } },
    { key: 'is_suspended', label: '', _style: { width: '8%' } },
    //{ key: 'status', label: 'Trạng thái' },
    { key: 'action', label: '', _style: { width: '6%' } }]


const ManageModerator = () => {
    const [addModeratorModalShow, setAddModeratorModalShow] = useState(false);
    const [banModeratorModal, setBanModeratorModalState] = useState(false);
    const [updateModeratorModalShow, setUpdateModeratorModalShow] = useState(false);
    const [moderatorInfoList, setModeratorInfoList] = useState(null);
    const [selectedModeratorUsername, setSelectedModeratorUsername] = useState(null);

    const { promiseInProgress } = usePromiseTracker();

    useEffect(async () => {
        const moderatorInfoList = await trackPromise(GetModeratorInfoListAPI());
        setModeratorInfoList(moderatorInfoList);
    }, [updateModeratorModalShow, addModeratorModalShow])

    const updateModeratorOnclick = (moderatorUsername) => {
        //open the update moderator modal
        setUpdateModeratorModalShow(true);
        //set params
        setSelectedModeratorUsername(moderatorUsername);
    }

    const hideUpdateModal = () => {
        setUpdateModeratorModalShow(false);
    }

    const hideAddModal = () => {
        setAddModeratorModalShow(false);
    }

    return (
        <CRow>
            <CCol>
                <CCard>
                    <CCardHeader align="right">
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
                                        {item.birthday != "" ? format(parseISO(item.birthday), "dd-MM-yyyy") : ""}
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
            {addModeratorModalShow ?
                <AddModeratorModal
                    show={addModeratorModalShow}
                    handleClose={() => hideAddModal} />
                : null}
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
            {(updateModeratorModalShow && selectedModeratorUsername != null) ?
                <UpdateModeratorModal
                    selectedModeratorUsername={selectedModeratorUsername}
                    show={updateModeratorModalShow}
                    handleClose={() => hideUpdateModal}
                />
                : null}

        </CRow >
    );
}

export default ManageModerator