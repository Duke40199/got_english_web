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

import { RejectApplicationFormByIdAPI } from '../../../api/application-form'

const RejectApplicationFormModal = ({ selectedApplicationFormId, show, handleClose, refreshDataFlag, setRefreshDataFlag }) => {
    const [rejectMessage, setRejectMessage] = useState(null);

    const { promiseInProgress } = usePromiseTracker();

    const onSubmitRejectForm = async (e) => {
        e.preventDefault();

        const rejectResult = await trackPromise(RejectApplicationFormByIdAPI(selectedApplicationFormId));
        if (rejectResult === true) {
            setRejectMessage(<CAlert color="success">Từ chối đơn xin thành công!</CAlert>);
            setRefreshDataFlag(!refreshDataFlag);
        } else {
            setRejectMessage(<CAlert color="danger">{rejectResult}</CAlert>);
        }
    }

    return (
        <CModal
            show={show}
            onClose={handleClose()}
            closeOnBackdrop={false}
            color="danger"
        >
            <CForm onSubmit={onSubmitRejectForm} method="post" encType="multipart/form-data" className="form-horizontal">
                <CModalHeader closeButton>
                    <CModalTitle>Từ chối đơn xin</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {rejectMessage ? rejectMessage : "Bạn chắc chắn muốn từ chối đơn xin này chứ?"}
                </CModalBody>
                <CModalFooter>
                    <CButton color="danger" type="submit" disabled={promiseInProgress}>
                        Từ chối
                </CButton>
                    <CButton color="secondary" onClick={handleClose()}>
                        Đóng
                </CButton>
                </CModalFooter>
            </CForm>
        </CModal>
    );
}

export default RejectApplicationFormModal