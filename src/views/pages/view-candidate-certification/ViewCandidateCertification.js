import React, { useState } from 'react'
import candidateData from '../view-candidate-certification/CandidateData'
import {
    CCard,
    CCardBody,
    CCol,
    CDataTable,
    CRow,
    CBadge,
    CButton
} from '@coreui/react'

import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";

const fields = [
    { key: 'fullname', label: 'Họ và Tên' },
    { key: 'email', label: 'Email' },
    { key: 'birthday', label: 'Ngày sinh' },
    { key: 'occupation', label: 'Công việc' },
    { key: 'phone', label: 'Số điện thoại' },
    { key: 'certificationImg', label: 'Chứng chỉ' },
    { key: 'action', label: '' }]

function openLightbox(index, changeCurrentIndex) {
    changeCurrentIndex(index);
}

const ViewCandidateCertification = () => {
    const [currentIndex, changeCurrentIndex] = useState(-1);
    return (
        <CRow>
            <CCol>
                <CCard>
                    <CCardBody>
                        <CDataTable
                            items={candidateData}
                            fields={fields}
                            striped
                            bordered
                            size="sm"
                            itemsPerPage={5}
                            pagination
                            scopedSlots={
                                {
                                    'certificationImg':
                                        (item, index) => (
                                            <td>
                                                <img src={item.certificationImg} className="img-thumbnail lightbox-thumbnail-img" width="120px" height="90px" onClick={e => openLightbox(index, changeCurrentIndex)} />
                                                {currentIndex == index ? <Lightbox image={item.certificationImg} showTitle={false} onClose={e => changeCurrentIndex(-1)} /> : null}
                                            </td>
                                        ),
                                    'action':
                                        (item, index) => (
                                            <td>
                                                <CButton
                                                    color="success"
                                                    className="mr-2"
                                                    size="sm">Duyệt</CButton>
                                                <CButton
                                                    color="danger"
                                                    size="sm">Hủy</CButton>
                                            </td>
                                        ),
                                }
                            }
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default ViewCandidateCertification