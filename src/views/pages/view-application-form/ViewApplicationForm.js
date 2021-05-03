import React, { useState, useEffect } from 'react'

import {
    CCard,
    CCardBody,
    CCol,
    CDataTable,
    CRow,
    CCardHeader,
    CBadge,
    CAlert
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import ApproveApplicationFormModal from '../view-application-form/ApproveAppicationFormModal';
import RejectApplicationFormModal from '../view-application-form/RejectApplicationFormModal';

import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';

import { format, parseISO } from 'date-fns';

import { GetApplicationFormListAPI } from '../../../api/application-form';

const getBadge = status => {
    switch (status) {
        case "Approved": return 'success'
        case "Rejected": return 'danger'
        case "Pending": return 'warning'
        default: return 'dark'
    }
}

const defineStatus = status => {
    switch (status) {
        case "Approved": return 'Đã duyệt'
        case "Rejected": return 'Đã từ chối'
        case "Pending": return 'Đang chờ'
        default: return 'Không xác định'
    }
}

const fields = [
    { key: 'expert_fullname', label: 'Họ và Tên', _style: { width: '14%' } },
    { key: 'expert_email', label: 'Email', _style: { width: '14%' } },
    { key: 'expert_phone', label: 'Số điện thoại', _style: { width: '10%' } },
    { key: 'application_type', label: 'Loại đơn', _style: { width: '20%' } },
    { key: 'application_form_certificate', label: 'Chứng chỉ', _style: { width: '14%' } },
    { key: 'application_form_status', label: 'Trạng thái', _style: { width: '8%' } },
    { key: 'application_form_send_datetime', label: 'Thời gian nộp đơn', _style: { width: '14%' } },
    { key: 'action', label: '', _style: { width: '6%' } }]

const ViewCandidateCertification = () => {
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [approveApplicationFormModalShow, setApproveApplicationFormModalShow] = useState(false);
    const [rejectApplicationFormModalShow, setRejectApplicationFormModalShow] = useState(false);
    const [selectedApplicationFormId, setSelectedApplicationFormId] = useState(null);
    const [applicationFormList, setApplicationFormList] = useState(null);
    const [refreshDataFlag, setRefreshDataFlag] = useState(false);

    const { promiseInProgress } = usePromiseTracker();

    const defineApplicationFormType = (applicationType) => {
        let definedApplicationFormType = [];
        let beforeDefineApplicationType = applicationType.split(",");
        if (beforeDefineApplicationType != null && beforeDefineApplicationType !== "") {
            beforeDefineApplicationType.forEach((item) => {
                if (item === "can_chat") {
                    definedApplicationFormType.push("Xin nhận Phiên Nhắn Tin\n");
                }
                if (item === "can_join_live_call_session") {
                    definedApplicationFormType.push("Xin nhận Phiên Gọi Trực Tuyến\n");
                }
                if (item === "can_join_translation_session") {
                    definedApplicationFormType.push("Xin nhận Phòng Phiên Dịch\n");
                }
            })
        }
        return definedApplicationFormType;
    }

    useEffect(() => {
        async function fetchData() {
            const applicationFormList = await trackPromise(GetApplicationFormListAPI());
            const editedApplicationFormList = [];
            let editedApplicationForm = {};
            if (applicationFormList != null) {
                applicationFormList.forEach((item) => {
                    editedApplicationForm = {
                        "expert_fullname": (item.expert_info.account.fullname == null || item.expert_info.account.fullname === "") ? "" : item.expert_info.account.fullname,
                        "expert_email": item.expert_info.account.email,
                        "expert_phone": item.expert_info.account.phone_number == null || item.expert_info.account.phone_number === "" ? "" : item.expert_info.account.phone_number,
                        "application_id": item.id,
                        "application_type": item.type,
                        "application_form_certificate": item.photo_url,
                        "application_form_status": item.status,
                        "application_form_send_datetime": item.created_at
                    }
                    editedApplicationFormList.push(editedApplicationForm);
                });
            }
            setApplicationFormList(editedApplicationFormList);
        }
        fetchData();
    }, [refreshDataFlag]);

    const approveApplicationFormOnclick = (applicationFormId) => {
        //open the approve application form modal
        setApproveApplicationFormModalShow(true);
        //set params
        setSelectedApplicationFormId(applicationFormId);
    }

    const rejectApplicationFormOnclick = (applicationFormId) => {
        //open the reject application form modal
        setRejectApplicationFormModalShow(true);
        //set params
        setSelectedApplicationFormId(applicationFormId);
    }

    const hideApproveApplicationFormModal = () => {
        setApproveApplicationFormModalShow(false);
    }

    const hideRejectApplicationFormModal = () => {
        setRejectApplicationFormModalShow(false);
    }

    const openLightbox = (index) => {
        setCurrentIndex(index);
    }

    //check permission
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const canManageApplicationForm = userInfo.moderator_details.can_manage_application_form;
    if (canManageApplicationForm) {
        return (
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <h3 className="m-0">Danh sách Hồ Sơ Ứng Viên</h3>
                        </CCardHeader>
                        <CCardBody className="pt-0 pb-0">
                            <CDataTable
                                addTableClasses="text-break"
                                items={applicationFormList}
                                fields={fields}
                                striped
                                bordered
                                size="sm"
                                itemsPerPage={5}
                                pagination
                                loading={promiseInProgress}
                                noItemsView={{ noResults: 'Không có kết quả tìm kiếm trùng khớp', noItems: 'Không có dữ liệu' }}
                                tableFilter={
                                    {
                                        label: "Tìm kiếm:",
                                        placeholder: "nhập thông tin Hồ Sơ Ứng Viên cần tìm...",
                                    }
                                }
                                scopedSlots={
                                    {
                                        'application_type':
                                            (item, index) => (
                                                <td className="text-pre-line">
                                                    {(item.application_type == null || item.application_type === "") ?
                                                        "" :
                                                        defineApplicationFormType(item.application_type)
                                                    }
                                                </td>
                                            ),
                                        'application_form_certificate':
                                            (item, index) => (
                                                <td>
                                                    <img src={item.application_form_certificate} alt="Certificate" className="img-thumbnail lightbox-thumbnail-img" width="120px" height="90px" onClick={e => openLightbox(index)} />
                                                    {currentIndex === index
                                                        ?
                                                        <Lightbox image={item.application_form_certificate}
                                                            showTitle={false}
                                                            onClose={e => setCurrentIndex(-1)} />
                                                        : null}
                                                </td>
                                            ),
                                        'application_form_status':
                                            (item) => (
                                                <td>
                                                    <CBadge color={getBadge(item.application_form_status)}>
                                                        {defineStatus(item.application_form_status)}
                                                    </CBadge>
                                                </td>
                                            ),
                                        'application_form_send_datetime':
                                            (item, index) => (
                                                <td>
                                                    {
                                                        (item.application_form_send_datetime == null || item.application_form_send_datetime === "") ?
                                                            ""
                                                            :
                                                            format(parseISO(item.application_form_send_datetime), 'dd-MM-yyyy hh:mm:ss')
                                                    }
                                                </td>
                                            ),
                                        'action':
                                            (item, index) => (

                                                <td className="py-1">
                                                    {(item.application_form_status === "Pending") ?
                                                        <div>
                                                            <button type="button" className="table-action-button mr-2" data-toggle="tooltip" title="Duyệt">
                                                                <CIcon name="cil-check" onClick={() => approveApplicationFormOnclick(item.application_id)}>
                                                                </CIcon>
                                                            </button>
                                                            <button type="button" className="table-action-button mr-2" data-toggle="tooltip" title="Không duyệt">
                                                                <CIcon name="cil-x" onClick={() => rejectApplicationFormOnclick(item.application_id)}>
                                                                </CIcon>
                                                            </button>
                                                        </div>
                                                        :
                                                        null}
                                                </td>
                                            ),
                                    }
                                }
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
                {/*POPUP APPROVE APPLICATION FORM*/}
                {approveApplicationFormModalShow && selectedApplicationFormId != null ?
                    <ApproveApplicationFormModal
                        selectedApplicationFormId={selectedApplicationFormId}
                        show={approveApplicationFormModalShow}
                        handleClose={() => hideApproveApplicationFormModal}
                        refreshDataFlag={refreshDataFlag}
                        setRefreshDataFlag={setRefreshDataFlag} />
                    : null}
                {/*POPUP REJECT APPLICATION FORM*/}
                {rejectApplicationFormModalShow && selectedApplicationFormId != null ?
                    <RejectApplicationFormModal
                        selectedApplicationFormId={selectedApplicationFormId}
                        show={rejectApplicationFormModalShow}
                        handleClose={() => hideRejectApplicationFormModal}
                        refreshDataFlag={refreshDataFlag}
                        setRefreshDataFlag={setRefreshDataFlag} />
                    : null}
            </CRow>
        )
    } else {
        <CAlert color="danger">Bạn không có quyền sử dụng chức năng này!</CAlert>
    }
}

export default ViewCandidateCertification