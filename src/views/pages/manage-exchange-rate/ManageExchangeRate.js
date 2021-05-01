import React, { useState, useEffect } from 'react'

import {
    CCard,
    CCardBody,
    CCol,
    CDataTable,
    CRow,
    CCardHeader,
    CAlert
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import UpdateExchangeRateModal from '../manage-exchange-rate/UpdateExchangeRateModal';

import { usePromiseTracker, trackPromise } from "react-promise-tracker";

import { format, parseISO } from 'date-fns';

import { GetExchangeRateInfoListAPI } from '../../../api/exchange-rate';

const defineServiceName = (serviceName) => {
    if (serviceName.includes("messaging_session")) {
        return "Phiên nhắn tin";
    } else if (serviceName.includes("live_call_session")) {
        return "Phiên gọi trực tuyến";
    } else if (serviceName.includes("translation_session")) {
        return "Phòng phiên dịch trực tuyến";
    } else {
        return "Không xác định";
    }
}

const fields = [
    { key: 'service_name', label: 'Tên dịch vụ Chiết Khấu', _style: { width: '35%' } },
    { key: 'rate', label: 'Tỉ lệ Chiết Khấu', _style: { width: '20%' } },
    { key: 'updated_at', label: 'Thời gian lần cuối cập nhật', _style: { width: '40%' } },
    { key: 'action', label: '', _style: { width: '5%' } }
]

const ManageExchangeRate = () => {
    const [updateExchangeRateModalShow, setUpdateExchangeRateModalShow] = useState(false);
    const [exchangeRateInfoList, setExchangeRateInfoList] = useState(null);
    const [selectedExchangeRateId, setSelectedExchangeRateId] = useState(null);
    const [refreshDataFlag, setRefreshDataFlag] = useState(false);

    const { promiseInProgress } = usePromiseTracker();

    useEffect(async () => {
        const exchangeRateInfoList = await trackPromise(GetExchangeRateInfoListAPI());
        setExchangeRateInfoList(exchangeRateInfoList);
    }, [refreshDataFlag]);

    const updateExchangeRateOnclick = (exchangeRateId) => {
        //open the update exchange rate modal
        setUpdateExchangeRateModalShow(true);
        //set params
        setSelectedExchangeRateId(exchangeRateId);
    }

    const hideUpdateModal = () => {
        setUpdateExchangeRateModalShow(false);
    }

    //check permission
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const canManageExchangeRate = userInfo.moderator_details.can_manage_exchange_rate;
    if (canManageExchangeRate) {
        return (
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <h3 className="m-0">Danh sách Chiết Khấu:</h3>
                        </CCardHeader>
                        <CCardBody className="pt-0 pb-0">
                            <CDataTable
                                addTableClasses="text-break"
                                items={exchangeRateInfoList}
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
                                    'service_name':
                                        (item, index) => (
                                            <td>
                                                {defineServiceName(item.service_name)}
                                            </td>
                                        ),
                                    'updated_at':
                                        (item, index) => (
                                            <td>
                                                {
                                                    (item.updated_at == null || item.updated_at == "") ? "" : format(parseISO(item.updated_at), 'dd-MM-yyyy hh:mm:ss')
                                                }
                                            </td>
                                        ),
                                    'action':
                                        (item, index) => (
                                            <td className="py-1">
                                                <button type="button" className="table-action-button mr-2" data-toggle="tooltip" title="Cập nhật">
                                                    <CIcon name="cil-pencil" onClick={() => updateExchangeRateOnclick(item.id)}>
                                                    </CIcon>
                                                </button>
                                            </td>
                                        )
                                }}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
                {/*POPUP UPDATE EXCHANGE RATE*/}
                {updateExchangeRateModalShow && selectedExchangeRateId != null ?
                    <UpdateExchangeRateModal
                        selectedExchangeRateId={selectedExchangeRateId}
                        show={updateExchangeRateModalShow}
                        handleClose={() => hideUpdateModal}
                        refreshDataFlag={refreshDataFlag}
                        setRefreshDataFlag={setRefreshDataFlag} />
                    : null}
            </CRow>
        );
    } else {
        <CAlert color="danger">Bạn không có quyền sử dụng chức năng này!</CAlert>
    }
}

export default ManageExchangeRate
