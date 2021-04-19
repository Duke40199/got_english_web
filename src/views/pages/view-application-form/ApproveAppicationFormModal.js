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

import { ApproveApplicationFormByIdAPI } from '../../../api/application-form'

const ApproveApplicationFormModal = ({ selectedApplicationFormId, show, handleClose }) => {
    const [approveMessage, setApproveMessage] = useState(null);

    const onSubmitApproveForm = async (e) => {
        e.preventDefault();

        const approveResult = await ApproveApplicationFormByIdAPI(selectedApplicationFormId);
        if (approveResult === true) {
            setApproveMessage(<CAlert color="success">Duyệt đơn xin thành công!</CAlert>);
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
                    <CModalTitle>Duyệt đơn xin ( id: {selectedApplicationFormId} )</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {approveMessage ? approveMessage : "Bạn chắc chắn muốn duyệt đơn xin này chứ?"}
                </CModalBody>
                <CModalFooter>
                    <CButton color="success" type="submit">
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