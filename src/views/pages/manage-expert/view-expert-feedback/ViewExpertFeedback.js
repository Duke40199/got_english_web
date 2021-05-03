import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom"

import ReactStars from 'react-rating-stars-component'

import { GetRatingListByExpertIdAPI } from '../../../../api/rating'
import { GetExpertInfoByIdAPI } from '../../../../api/user'

import { format, parseISO } from 'date-fns'

import { usePromiseTracker, trackPromise } from "react-promise-tracker";

import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CRow
} from '@coreui/react'

const fields = [
    { key: 'learner_username', label: 'Tên tài khoản Học Viên' },
    { key: 'used_service', label: 'Dịch vụ Đánh Giá' },
    { key: 'score', label: 'Đánh Giá của Học Viên' },
    { key: 'comment', label: 'Nội dung Đánh Giá' },
    { key: 'updated_at', label: 'Thời Gian gửi Đánh Giá' }]

const ViewExpertFeedback = () => {
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }
    const query = useQuery();
    const expertId = query.get("expertId");

    const [selectedExpertRatingList, setSelectedExpertRatingList] = useState(null);
    const [selectedExpertInfo, setSelectedExpertInfo] = useState(null);

    const { promiseInProgress } = usePromiseTracker();

    useEffect(() => {
        async function fetchData() {
            const expertInfo = await trackPromise(GetExpertInfoByIdAPI(expertId));
            if (expertInfo != null) {
                const expertRatingList = await trackPromise(GetRatingListByExpertIdAPI(expertId));
                setSelectedExpertRatingList(expertRatingList);
                setSelectedExpertInfo(expertInfo);
            }
        }
        fetchData();
    }, [expertId])

    const GetUsedService = expertRatingList => {
        if (expertRatingList.hasOwnProperty("messaging_session")) {
            return 'Phiên nhắn tin';
        } else if (expertRatingList.hasOwnProperty("translation_session")) {
            return 'Phòng phiên dịch';
        } else if (expertRatingList.hasOwnProperty("live_call_session")) {
            return 'Phiên gọi trực tuyến';
        } else {
            return 'Dịch vụ Không xác định';
        }
    }

    return (
        <CRow>
            <CCol>
                <CCard>
                    <CCardHeader>
                        <h3 className="mb-0">Chi tiết Đánh Giá của Chuyên Gia ({selectedExpertInfo != null ? selectedExpertInfo.account.username : "..."})</h3>
                    </CCardHeader>
                    <CCardBody>
                        <CDataTable
                            items={selectedExpertRatingList}
                            fields={fields}
                            hover
                            striped
                            bordered
                            size="sm"
                            itemsPerPage={10}
                            pagination
                            loading={promiseInProgress}
                            noItemsView={{ noResults: 'Không có kết quả tìm kiếm trùng khớp', noItems: 'Không có dữ liệu' }}
                            scopedSlots={
                                {
                                    'learner_username':
                                        (item) => (
                                            <td>
                                                {item.learner.account.username}
                                            </td>
                                        ),
                                    'used_service':
                                        (item) => (
                                            <td>
                                                {GetUsedService(item)}
                                            </td>
                                        ),
                                    'score':
                                        (item) => (
                                            <td>
                                                <ReactStars
                                                    value={item.score}
                                                    size={24}
                                                    activeColor="#FFD700"
                                                    edit={false}
                                                />
                                            </td>
                                        ),
                                    'updated_at':
                                        (item) => (
                                            <td>
                                                {format(parseISO(item.updated_at), 'dd-MM-yyyy HH:mm:ss')}
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

export default ViewExpertFeedback