import React, { useState, useEffect } from 'react'

import {
    CCard,
    CCardBody,
    CCol,
    CDataTable,
    CRow,
    CButton,
    CCardHeader,
    CBadge,
    CAlert
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import AddCoinBundleModal from '../manage-coin-bundle/AddCoinBundleModal';
import UpdateCoinBundleModal from '../manage-coin-bundle/UpdateCoinBundleModal';

import { usePromiseTracker, trackPromise } from "react-promise-tracker";

import { GetCoinBundleInfoListAPI } from '../../../api/coin-bundle'

const getBadge = isDeleted => {
    switch (isDeleted) {
        case false: return 'success'
        case true: return 'danger'
        default: return 'primary'
    }
}

const fields = [
    { key: 'title', label: 'Tên Gói', _style: { width: '15%' } },
    { key: 'description', label: 'Nội dung Gói', _style: { width: '35%' } },
    { key: 'quantity', label: 'Số lượng Coin', _style: { width: '12%' } },
    { key: 'price', label: 'Giá', _style: { width: '13%' } },
    { key: 'price_unit', label: 'Đơn vị', _style: { width: '10%' } },
    { key: 'is_deleted', label: '', _style: { width: '10%' } },
    { key: 'action', label: '', _style: { width: '5%' } }
]

const ManageCoinBundle = () => {
    const [addCoinBundleModalShow, setAddCoinBundleModalShow] = useState(false);
    const [updateCoinBundleModalShow, setUpdateCoinBundleModalShow] = useState(false);
    const [coinBundleInfoList, setCoinBundleInfoList] = useState(null);
    const [selectedCoinBundleId, setSelectedCoinBundleId] = useState(null);

    const { promiseInProgress } = usePromiseTracker();

    useEffect(async () => {
        const coinBundleInfoList = await trackPromise(GetCoinBundleInfoListAPI());
        setCoinBundleInfoList(coinBundleInfoList);
    }, [updateCoinBundleModalShow, addCoinBundleModalShow]);

    const updateCoinBundleOnclick = (coinBundleId) => {
        //open the update coin bundle modal
        setUpdateCoinBundleModalShow(true);
        //set params
        setSelectedCoinBundleId(coinBundleId);
    }

    const hideUpdateModal = () => {
        setUpdateCoinBundleModalShow(false);
    }

    const hideAddModal = () => {
        setAddCoinBundleModalShow(false);
    }

    //check permission
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const canManageCoinBundle = userInfo.can_manage_coin_bundle;
    if (canManageCoinBundle) {
        return (
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader align="right">
                            <CButton color="primary" className="mt-2 d-flex align-items-center" onClick={() => setAddCoinBundleModalShow(true)}>
                                <CIcon name="cilPlus" size="sm" className="mr-1"></CIcon>Thêm mới Gói Coin</CButton>
                        </CCardHeader>
                        <CCardBody className="pt-0 pb-0">
                            <CDataTable
                                addTableClasses="text-break"
                                items={coinBundleInfoList}
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
                                    'is_deleted':
                                        (item) => (
                                            <td>
                                                <CBadge color={getBadge(item.is_deleted)}>
                                                    {item.is_suspended ? "Đã khóa" : "Hoạt động"}
                                                </CBadge>
                                            </td>
                                        ),
                                    'action':
                                        (item, index) => {
                                            return (
                                                <td className="py-1">

                                                    <button type="button" className="table-update-button mr-2" data-toggle="tooltip" title="Cập nhật">
                                                        <CIcon name="cil-pencil" onClick={() => updateCoinBundleOnclick(item.id)}>
                                                        </CIcon>
                                                    </button>
                                                    <button type="button" className="table-ban-button" data-toggle="tooltip" title="Khóa">
                                                        <CIcon name="cil-lock-locked" >
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
                {/*POPUP ADD COIN BUNDLE*/}
                {addCoinBundleModalShow ?
                    <AddCoinBundleModal
                        show={addCoinBundleModalShow}
                        handleClose={() => hideAddModal} />
                    : null}
                {/*POPUP UPDATE COIN BUNDLE*/}
                {updateCoinBundleModalShow && selectedCoinBundleId != null ?
                    <UpdateCoinBundleModal
                        selectedCoinBundleId={selectedCoinBundleId}
                        show={updateCoinBundleModalShow}
                        handleClose={() => hideUpdateModal} />
                    : null}
            </CRow>
        )
    } else {
        return (
            <CAlert color="danger">Bạn không có quyền sử dụng chức năng này!</CAlert>
        );
    }

}

export default ManageCoinBundle