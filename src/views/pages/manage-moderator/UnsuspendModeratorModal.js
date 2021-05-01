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

import { usePromiseTracker, trackPromise } from "react-promise-tracker";

import { GetUserInfoAPI, UnsuspendUserByIdAPI } from '../../../api/user';

const UnsuspendModeratorModal = ({ selectedModeratorUsername, show, handleClose, refreshDataFlag, setRefreshDataFlag }) => {
    const [unsuspendModeratorUUID, setUnsuspendModeratorUUID] = useState("");
    const [unsuspendModeratorUsername, setUnsuspendModeratorUsername] = useState("");
    const [unsuspendMessage, setUnsuspendMessage] = useState(null);

    const { promiseInProgress } = usePromiseTracker();

    //this useEffect will be executed every time the modal show
    useEffect(async () => {
        if (selectedModeratorUsername != null) {
            const selectedModeratorInfo = await trackPromise(GetUserInfoAPI(selectedModeratorUsername, 'Moderator'));
            if (selectedModeratorInfo != null) {
                setUnsuspendModeratorUUID(selectedModeratorInfo.id);
                setUnsuspendModeratorUsername(selectedModeratorInfo.username);
            }
        }
    }, [selectedModeratorUsername]);

    const onSubmitUnsuspendForm = async (e) => {
        e.preventDefault();

        const unsuspendResult = await trackPromise(UnsuspendUserByIdAPI(unsuspendModeratorUUID));
        if (unsuspendResult === true) {
            setUnsuspendMessage(<CAlert color="success">Mở khóa tài khoản thành công!</CAlert>);
            setRefreshDataFlag(!refreshDataFlag);
        } else {
            setUnsuspendMessage(<CAlert color="danger">{unsuspendResult}</CAlert>);
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
                    <CModalTitle>Mở Khóa Điều Hành Viên ({unsuspendModeratorUsername})</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {unsuspendMessage ? unsuspendMessage : "Bạn chắc chắn muốn mở khóa cho Điều Hành Viên này chứ?"}
                </CModalBody>
                <CModalFooter>
                    <CButton color="warning" type="submit" disabled={promiseInProgress}>
                        Mở khóa
                </CButton>
                    <CButton color="secondary" onClick={handleClose()}>
                        Đóng
                </CButton>
                </CModalFooter>
            </CForm>
        </CModal>
    );
}

export default UnsuspendModeratorModal