import React, { useState, useEffect } from 'react'

import {
    CCard,
    CCardBody,
    CCol,
    CDataTable,
    CRow,
    CAlert,
    CCardHeader,
    CButton
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import UpdatePricingModal from '../manage-pricing/UpdatePricingModal';
import AddPricingModal from '../manage-pricing/AddPricingModal';
import DeletePricingModal from '../manage-pricing/DeletePricingModal';

import { format, parseISO } from 'date-fns';

import { usePromiseTracker, trackPromise } from "react-promise-tracker";

import {
    GetMessagingSessionPricingInfoListAPI,
    GetLiveCallSessionPricingInfoListAPI,
    GetTranslationCallSessionPricingInfoListAPI
} from '../../../api/pricing';

const fields = [
    { key: 'price', label: 'Đơn giá', _style: { width: '14%' } },
    { key: 'created_at', label: 'Thời gian tạo', _style: { width: '25%' } },
    { key: 'updated_at', label: 'Thời gian cập nhật', _style: { width: '25%' } },
    { key: 'action', label: '', _style: { width: '6%' } }
]

const ManagePricing = () => {
    const [updatePricingModalShow, setUpdatePricingModalShow] = useState(false);
    const [addPricingModalShow, setAddPricingModalShow] = useState(false);
    const [deletePricingModalShow, setDeletePricingModalShow] = useState(false);
    const [selectedPricingId, setSelectedPricingId] = useState(null);
    const [selectedServiceName, setSelectedServiceName] = useState(null);
    const [messagingSessionPricingInfoList, setMessagingSessionPricingInfoList] = useState(null);
    const [liveCallSessionPricingInfoList, setLiveCallSessionPricingInfoList] = useState(null);
    const [translationCallSessionPricingInfoList, setTranslationCallSessionPricingInfoList] = useState(null);

    const { promiseInProgress } = usePromiseTracker();

    useEffect(async () => {
        const messagingSessionPricingInfoList = await trackPromise(GetMessagingSessionPricingInfoListAPI());
        const liveCallSessionPricingInfoList = await trackPromise(GetLiveCallSessionPricingInfoListAPI());
        const translationCallSessionPricingInfoList = await trackPromise(GetTranslationCallSessionPricingInfoListAPI());
        setMessagingSessionPricingInfoList(messagingSessionPricingInfoList);
        setLiveCallSessionPricingInfoList(liveCallSessionPricingInfoList);
        setTranslationCallSessionPricingInfoList(translationCallSessionPricingInfoList);
    }, [updatePricingModalShow, addPricingModalShow])

    const updatePricingOnclick = (pricingId) => {
        //open the update pricing modal
        setUpdatePricingModalShow(true);
        //set params
        setSelectedPricingId(pricingId);
    }

    const addPricingOnclick = (serviceName) => {
        //open the add pricing modal
        setAddPricingModalShow(true);
        //set params
        setSelectedServiceName(serviceName);
    }

    const deletePricingOnclick = (pricingId) => {
        //open the delete pricing modal
        setDeletePricingModalShow(true);
        //set params
        setSelectedPricingId(pricingId);
    }

    const hideUpdateModal = () => {
        setUpdatePricingModalShow(false);
    }

    const hideAddModal = () => {
        setAddPricingModalShow(false);
    }

    const hideDeleteModal = () => {
        setDeletePricingModalShow(false);
    }

    //check permission
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const canManagePricing = userInfo.moderator_details.can_manage_pricing;
    if (canManagePricing) {
        return (
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <h3 className="m-0">Đơn giá dịch vụ Phiên Nhắn Tin:</h3>
                        </CCardHeader>
                        <CCardBody className="pt-0 pb-0">
                            <CDataTable
                                addTableClasses="text-break"
                                items={messagingSessionPricingInfoList}
                                fields={fields}
                                hover
                                striped
                                bordered
                                size="sm"
                                itemsPerPage={20}
                                pagination
                                loading={promiseInProgress}
                                noItemsView={{ noResults: 'Không có kết quả tìm kiếm trùng khớp', noItems: 'Không có dữ liệu' }}
                                scopedSlots={{
                                    'price':
                                        (item, index) => {
                                            return (
                                                <td className="py-1">
                                                    {item.quantity + " " + item.quantity_unit + " = " + item.price + " " + item.price_unit}
                                                </td>
                                            );
                                        },
                                    'created_at':
                                        (item, index) => {
                                            return (
                                                <td className="py-1">
                                                    {(item.created_at == null || item.created_at == "") ? "" : format(parseISO(item.created_at), 'dd-MM-yyyy hh:mm:ss')}
                                                </td>
                                            );
                                        },
                                    'updated_at':
                                        (item, index) => {
                                            return (
                                                <td className="py-1">
                                                    {(item.updated_at == null || item.updated_at == "") ? "" : format(parseISO(item.updated_at), 'dd-MM-yyyy hh:mm:ss')}
                                                </td>
                                            );
                                        },
                                    'action':
                                        (item, index) => {
                                            return (
                                                <td className="py-1">

                                                    <button type="button" className="table-action-button mr-2" data-toggle="tooltip" title="Cập nhật">
                                                        <CIcon name="cil-pencil" onClick={() => updatePricingOnclick(item.id)}>
                                                        </CIcon>
                                                    </button>
                                                </td>
                                            )
                                        },
                                }}
                            />
                        </CCardBody>
                    </CCard>
                    <CCard>
                        <CCardHeader>
                            <h3 className="m-0">Đơn giá dịch vụ Phiên Gọi Trực Tuyến:</h3>
                            <CButton color="primary" className="mt-2 d-flex align-items-center" onClick={() => addPricingOnclick("live_call_session")}>
                                <CIcon name="cilPlus" size="sm" className="mr-1" ></CIcon>Thêm mới Đơn Giá dịch vụ Phiên Gọi Trực Tuyến</CButton>
                        </CCardHeader>
                        <CCardBody className="pt-0 pb-0">
                            <CDataTable
                                addTableClasses="text-break"
                                items={liveCallSessionPricingInfoList}
                                fields={fields}
                                hover
                                striped
                                bordered
                                size="sm"
                                itemsPerPage={20}
                                pagination
                                loading={promiseInProgress}
                                noItemsView={{ noResults: 'Không có kết quả tìm kiếm trùng khớp', noItems: 'Không có dữ liệu' }}
                                scopedSlots={{
                                    'price':
                                        (item, index) => {
                                            return (
                                                <td className="py-1">
                                                    {item.quantity + " " + item.quantity_unit + " = " + item.price + " " + item.price_unit}
                                                </td>
                                            );
                                        },
                                    'created_at':
                                        (item, index) => {
                                            return (
                                                <td className="py-1">
                                                    {(item.created_at == null || item.created_at == "") ? "" : format(parseISO(item.created_at), 'dd-MM-yyyy hh:mm:ss')}
                                                </td>
                                            );
                                        },
                                    'updated_at':
                                        (item, index) => {
                                            return (
                                                <td className="py-1">
                                                    {(item.updated_at == null || item.updated_at == "") ? "" : format(parseISO(item.updated_at), 'dd-MM-yyyy hh:mm:ss')}
                                                </td>
                                            );
                                        },
                                    'action':
                                        (item, index) => {
                                            return (
                                                <td className="py-1">

                                                    <button type="button" className="table-action-button mr-2" data-toggle="tooltip" title="Cập nhật">
                                                        <CIcon name="cil-pencil" onClick={() => updatePricingOnclick(item.id)}>
                                                        </CIcon>
                                                    </button>
                                                    <button type="button" className="table-action-button mr-2" data-toggle="tooltip" title="Xóa">
                                                        <CIcon name="cil-x" onClick={() => deletePricingOnclick(item.id)}>
                                                        </CIcon>
                                                    </button>
                                                </td>
                                            )
                                        },
                                }}
                            />
                        </CCardBody>
                    </CCard>
                    <CCard>
                        <CCardHeader>
                            <h3 className="m-0">Đơn giá dịch vụ Phòng Phiên Dịch Trực Tuyến:</h3>
                            <CButton color="primary" className="mt-2 d-flex align-items-center" onClick={() => addPricingOnclick("translation_call_session")}>
                                <CIcon name="cilPlus" size="sm" className="mr-1" ></CIcon>Thêm mới Đơn Giá dịch vụ Phòng Phiên Dịch</CButton>
                        </CCardHeader>
                        <CCardBody className="pt-0 pb-0">
                            <CDataTable
                                addTableClasses="text-break"
                                items={translationCallSessionPricingInfoList}
                                fields={fields}
                                hover
                                striped
                                bordered
                                size="sm"
                                itemsPerPage={20}
                                pagination
                                loading={promiseInProgress}
                                noItemsView={{ noResults: 'Không có kết quả tìm kiếm trùng khớp', noItems: 'Không có dữ liệu' }}
                                scopedSlots={{
                                    'price':
                                        (item, index) => {
                                            return (
                                                <td className="py-1">
                                                    {item.quantity + " " + item.quantity_unit + " = " + item.price + " " + item.price_unit}
                                                </td>
                                            );
                                        },
                                    'created_at':
                                        (item, index) => {
                                            return (
                                                <td className="py-1">
                                                    {(item.created_at == null || item.created_at == "") ? "" : format(parseISO(item.created_at), 'dd-MM-yyyy hh:mm:ss')}
                                                </td>
                                            );
                                        },
                                    'updated_at':
                                        (item, index) => {
                                            return (
                                                <td className="py-1">
                                                    {(item.updated_at == null || item.updated_at == "") ? "" : format(parseISO(item.updated_at), 'dd-MM-yyyy hh:mm:ss')}
                                                </td>
                                            );
                                        },
                                    'action':
                                        (item, index) => {
                                            return (
                                                <td className="py-1">

                                                    <button type="button" className="table-action-button mr-2" data-toggle="tooltip" title="Cập nhật">
                                                        <CIcon name="cil-pencil" onClick={() => updatePricingOnclick(item.id)}>
                                                        </CIcon>
                                                    </button>
                                                    <button type="button" className="table-action-button mr-2" data-toggle="tooltip" title="Xóa">
                                                        <CIcon name="cil-x" onClick={() => deletePricingOnclick(item.id)}>
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
                {/* POPUP UPDATE PRICING */}
                {(updatePricingModalShow && selectedPricingId != null) ?
                    <UpdatePricingModal
                        selectedPricingId={selectedPricingId}
                        show={updatePricingModalShow}
                        handleClose={() => hideUpdateModal}
                    />
                    : null}
                {/* POPUP ADD PRICING */}
                {(addPricingModalShow && selectedServiceName != null) ?
                    <AddPricingModal
                        selectedPricingServiceName={selectedServiceName}
                        show={addPricingModalShow}
                        handleClose={() => hideAddModal}
                    />
                    : null}
                {/* POPUP DELETE PRICING */}
                {(deletePricingModalShow && selectedPricingId != null) ?
                    <DeletePricingModal
                        selectedPricingId={selectedPricingId}
                        show={deletePricingModalShow}
                        handleClose={() => hideDeleteModal}
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

export default ManagePricing