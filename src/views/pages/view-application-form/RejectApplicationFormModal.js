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

import { RejectApplicationFormByIdAPI } from '../../../api/application-form'

const RejectApplicationFormModal = ({ selectedApplicationFormId, show, handleClose }) => {
    const [rejectMessage, setRejectMessage] = useState(null);

    const onSubmitRejectForm = async (e) => {
        e.preventDefault();

        const rejectResult = await RejectApplicationFormByIdAPI(selectedApplicationFormId);
        if (rejectResult === true) {
            setRejectMessage(<CAlert color="success">Từ chối đơn xin thành công!</CAlert>);
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
                    <CModalTitle>Từ chối đơn xin ( id: {selectedApplicationFormId} )</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {rejectMessage ? rejectMessage : "Bạn chắc chắn muốn từ chối đơn xin này chứ?"}
                </CModalBody>
                <CModalFooter>
                    <CButton color="danger" type="submit">
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