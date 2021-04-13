import React, { useState, useEffect } from 'react'

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

import { GetUserInfoAPI, UnsuspendUserByIdAPI } from '../../../api/user';

const UnsuspendLearnerModal = ({ selectedLearnerUsername, show, handleClose }) => {
    const [unsuspendLearnerUUID, setUnsuspendLearnerUUID] = useState("");
    const [unsuspendLearnerUsername, setUnsuspendLearnerUsername] = useState("");
    const [unsuspendMessage, setUnsuspendMessage] = useState(null);

    //this useEffect will be executed every time the modal show
    useEffect(async () => {
        if (selectedLearnerUsername != null) {
            const selectedLearnerInfo = await GetUserInfoAPI(selectedLearnerUsername);
            setUnsuspendLearnerUUID(selectedLearnerInfo.id);
            setUnsuspendLearnerUsername(selectedLearnerInfo.username);
        }
    });

    const onSubmitUnsuspendForm = async (e) => {
        e.preventDefault();

        const unsuspendResult = await UnsuspendUserByIdAPI(unsuspendLearnerUUID);
        if (unsuspendResult === true) {
            setUnsuspendMessage(<CAlert color="success">Mở khóa tài khoản thành công!</CAlert>)
        } else {
            setUnsuspendMessage(<CAlert color="danger">{unsuspendResult}</CAlert>)
        }
    }

    return (
        <CModal
            show={show}
            onClose={handleClose()}
            closeOnBackdrop={false}
            color="warning"
        >
            <CForm onSubmit={onSubmitUnsuspendForm} method="post" encType="multipart/form-data" className="form-horizontal">
                <CModalHeader closeButton>
                    <CModalTitle>Mở Khóa Học Viên ({unsuspendLearnerUsername})</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {unsuspendMessage ? unsuspendMessage : "Bạn chắc chắn muốn mở khóa cho Học Viên này chứ?"}
                </CModalBody>
                <CModalFooter>
                    <CButton color="warning" type="submit">
                        Mở khóa
                </CButton>
                    <CButton color="secondary" onClick={handleClose()}>
                        Hủy
                </CButton>
                </CModalFooter>
            </CForm>
        </CModal>
    );
}

export default UnsuspendLearnerModal