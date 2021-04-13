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


import { GetUserInfoAPI, SuspendUserByIdAPI } from '../../../api/user';

const SuspendLearnerModal = ({ selectedLearnerUsername, show, handleClose }) => {
    const [suspendLearnerUUID, setSuspendLearnerUUID] = useState("");
    const [suspendLearnerUsername, setSuspendLearnerUsername] = useState("");
    const [suspendMessage, setSuspendMessage] = useState(null);

    //this useEffect will be executed every time the modal show
    useEffect(async () => {
        if (selectedLearnerUsername != null) {
            const selectedLearnerInfo = await GetUserInfoAPI(selectedLearnerUsername);
            setSuspendLearnerUUID(selectedLearnerInfo.id);
            setSuspendLearnerUsername(selectedLearnerInfo.username);
        }
    });

    const onSubmitSuspendForm = async (e) => {
        e.preventDefault();

        const suspendResult = await SuspendUserByIdAPI(suspendLearnerUUID);
        if (suspendResult === true) {
            setSuspendMessage(<CAlert color="success">Khóa tài khoản thành công!</CAlert>);
        } else {
            setSuspendMessage(<CAlert color="danger">{suspendResult}</CAlert>);
        }
    }

    return (
        <CModal
            show={show}
            onClose={handleClose()}
            closeOnBackdrop={false}
            color="danger"
        >
            <CForm onSubmit={onSubmitSuspendForm} method="post" encType="multipart/form-data" className="form-horizontal">
                <CModalHeader closeButton>
                    <CModalTitle>Khóa Học Viên ({suspendLearnerUsername})</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {suspendMessage ? suspendMessage : "Bạn chắc chắn muốn khóa Học Viên này chứ?"}
                </CModalBody>
                <CModalFooter>
                    <CButton color="danger" type="submit">
                        Khóa
                </CButton>
                    <CButton color="secondary" onClick={handleClose()}>
                        Hủy
                </CButton>
                </CModalFooter>
            </CForm>
        </CModal>
    );
}

export default SuspendLearnerModal