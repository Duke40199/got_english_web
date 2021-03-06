import React, { useState } from 'react'

import {
    CButton,
    CModal,
    CModalHeader,
    CModalBody,
    CModalFooter,
    CModalTitle,
    CAlert,
    CForm
} from '@coreui/react'

import { trackPromise, usePromiseTracker } from 'react-promise-tracker';

import { ApproveApplicationFormByIdAPI } from '../../../api/application-form'

const ApproveApplicationFormModal = ({ selectedApplicationFormId, show, handleClose, refreshDataFlag, setRefreshDataFlag }) => {
    const [approveMessage, setApproveMessage] = useState(null);

    const { promiseInProgress } = usePromiseTracker();

    const onSubmitApproveForm = async (e) => {
        e.preventDefault();

        const approveResult = await trackPromise(ApproveApplicationFormByIdAPI(selectedApplicationFormId));
        if (approveResult === true) {
            setApproveMessage(<CAlert color="success">Duyệt đơn xin thành công!</CAlert>);
            setRefreshDataFlag(!refreshDataFlag);
        } else {
            setApproveMessage(<CAlert color="danger">{approveResult}</CAlert>);
        }
    }

    return (
        <CModal
            show={show}
            onClose={handleClose()}
            closeOnBackdrop={false}
            color="success"
        >
            <CForm onSubmit={onSubmitApproveForm} method="post" encType="multipart/form-data" className="form-horizontal">
                <CModalHeader closeButton>
                    <CModalTitle>Duyệt đơn xin</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {approveMessage ? approveMessage : "Bạn chắc chắn muốn duyệt đơn xin này chứ?"}
                </CModalBody>
                <CModalFooter>
                    <CButton color="success" type="submit" disabled={promiseInProgress}>
                        Duyệt
                </CButton>
                    <CButton color="secondary" onClick={handleClose()}>
                        Đóng
                </CButton>
                </CModalFooter>
            </CForm>
        </CModal>
    )
}

export default ApproveApplicationFormModal