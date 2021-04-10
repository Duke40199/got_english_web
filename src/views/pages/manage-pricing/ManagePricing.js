import React, { useState, useEffect } from 'react'

import {
    CCard,
    CCardBody,
    CCol,
    CDataTable,
    CRow,
    CAlert,
    CCardHeader
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import UpdatePricingModal from '../manage-pricing/UpdatePricingModal';

import { format, parseISO } from 'date-fns';

import { usePromiseTracker, trackPromise } from "react-promise-tracker";

import {
    GetMessagingSessionPricingInfoListAPI,
    GetLiveCallSessionPricingInfoListAPI,
    GetTranslationCallSessionPricingInfoListAPI
} from '../../../api/pricing';

const fields = [
    { key: 'price', label: 'Đơn giá', _style: { width: '14%' } },
    { key: 'created_at', label: 'Thời gian tạo', _style: { width: '26%' } },
    { key: 'updated_at', label: 'Thời gian cập nhật', _style: { width: '26%' } },
    { key: 'action', label: '', _style: { width: '4%' } }
]

const ManagePricing = () => {
    const [updatePricingModalShow, setUpdatePricingModalShow] = useState(false);
    const [selectedPricingId, setSelectedPricingId] = useState(null);
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
    }, [updatePricingModalShow])

    const updatePricingOnclick = (pricingId) => {
        //open the update pricing mocal
        setUpdatePricingModalShow(true);
        //set params
        setSelectedPricingId(pricingId);
    }

    const hideUpdateModal = () => {
        setUpdatePricingModalShow(false);
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
                                tableFilter={
                                    {
                                        label: "Tìm kiếm:",
                                        placeholder: "nhập dữ liệu...",
                                    }
                                }
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

                                                    <button type="button" className="table-update-button mr-2" data-toggle="tooltip" title="Cập nhật">
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
                                tableFilter={
                                    {
                                        label: "Tìm kiếm:",
                                        placeholder: "nhập dữ liệu...",
                                    }
                                }
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

                                                    <button type="button" className="table-update-button mr-2" data-toggle="tooltip" title="Cập nhật">
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
                            <h3 className="m-0">Đơn giá dịch vụ Phòng Phiên Dịch Trực Tuyến:</h3>
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
                                tableFilter={
                                    {
                                        label: "Tìm kiếm:",
                                        placeholder: "nhập dữ liệu...",
                                    }
                                }
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

                                                    <button type="button" className="table-update-button mr-2" data-toggle="tooltip" title="Cập nhật">
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
                </CCol>
                {/* POPUP UPDATE PRICING */}
                {(updatePricingModalShow && selectedPricingId != null) ?
                    <UpdatePricingModal
                        selectedPricingId={selectedPricingId}
                        show={updatePricingModalShow}
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

export default ManagePricing