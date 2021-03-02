import React, { useState } from 'react'
import {
    CCardHeader,
    CRow,
    CCol,
    CCard,
    CCardBody,
    CCardFooter,
    CContainer
} from '@coreui/react'
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";

import postData from '../../manage-post/PostData'
import postDetailData from '../view-post-detail/PostDetailData'

function openLightbox(index, changeCurrentIndex) {
    changeCurrentIndex(index);
}


const ViewPostDetail = () => {
    const [currentIndex, changeCurrentIndex] = useState(-1);
    return (
        <CContainer>
            <CRow>
                <CCard className="w-100" borderColor="warning">
                    <CCardHeader>
                        <CRow>
                            <CCol xs="2">Tựa đề Bài Viết:</CCol>
                            <CCol> <strong>{postData[0].title}</strong></CCol>
                        </CRow>
                        <CRow>
                            <CCol xs="2">ID Tác giả:</CCol>
                            <CCol><strong>{postData[0].userId}</strong></CCol>
                        </CRow>
                    </CCardHeader>
                    <CCardBody>
                        <CRow>
                            <CCol xs="2">Nội dung Bài Viết:</CCol>
                            <CCol>{postData[0].content}</CCol>
                        </CRow>
                    </CCardBody>
                    <CCardFooter>
                        <CRow>
                            <CCol xs="2">Đính kèm:</CCol>
                            <CCol>
                                <img src={postData[0].fileUrl} className="img-thumbnail lightbox-thumbnail-img" width="120px" height="90px" onClick={e => openLightbox(0, changeCurrentIndex)} />
                                {currentIndex == 0 ? <Lightbox image={postData[0].fileUrl} showTitle={false} onClose={e => changeCurrentIndex(-1)} /> : null}
                            </CCol>
                        </CRow>
                    </CCardFooter>
                </CCard>
            </CRow>
            {
                postDetailData.map((item, index) => (
                    <CRow>
                        <CCard className="w-100">
                            <button type="button" className="close comment-card-delete" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            {item.isReported ? <CCardHeader color="danger">
                                <CRow>
                                    <CCol xs="2">ID Bình luận:</CCol>
                                    <CCol> <strong>{item.commentId}</strong></CCol>
                                </CRow>
                                <CRow>
                                    <CCol xs="2">ID Người Bình luận:</CCol>
                                    <CCol> <strong>{item.userId}</strong></CCol>
                                </CRow>
                                <CRow>
                                    <CCol xs="2">Bình luận lúc:</CCol>
                                    <CCol> <strong>{item.createdAt}</strong></CCol>
                                </CRow>
                                <CRow>
                                    <CCol xs="2">Cập nhật lúc:</CCol>
                                    <CCol> <strong>{item.updatedAt}</strong></CCol>
                                </CRow>
                            </CCardHeader> : <CCardHeader>
                                    <CRow>
                                        <CCol xs="2">ID Bình luận:</CCol>
                                        <CCol> <strong>{item.commentId}</strong></CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol xs="2">ID Người Bình luận:</CCol>
                                        <CCol> <strong>{item.userId}</strong></CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol xs="2">Bình luận lúc:</CCol>
                                        <CCol> <strong>{item.createdAt}</strong></CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol xs="2">Cập nhật lúc:</CCol>
                                        <CCol> <strong>{item.updatedAt}</strong></CCol>
                                    </CRow>
                                </CCardHeader>}

                            <CCardBody>
                                <CRow>
                                    <CCol xs="2">Nội dung Bình luận:</CCol>
                                    <CCol>{item.content}</CCol>
                                </CRow>
                            </CCardBody>
                            <CCardFooter>
                                <CRow>
                                    <CCol xs="2">Đính kèm:</CCol>
                                    <CCol>{item.fileUrl}</CCol>
                                </CRow>
                            </CCardFooter>
                        </CCard>
                    </CRow>
                ))
            }
        </CContainer>

    )
}

export default ViewPostDetail