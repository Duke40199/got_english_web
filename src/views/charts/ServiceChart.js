import React from 'react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle } from '@coreui/utils'

const brandSuccess = getStyle('success') || '#2eb85c'
const brandWarning = getStyle('warning') || '#f9b115'
const brandDark = getStyle('dark') || '#636f83'

const ServiceChart = attributes => {
    let dataCount = 0;
    let countArray = [];

    if (attributes.data != null) {
        dataCount = Object.keys(attributes.data.new_messaging_session_monthly_count).length;
        for (var i = 1; i <= dataCount; i++) {
            countArray.push(i);
        }
    }

    const userDatasets = (() => {
        let elements = dataCount - 1;
        const newMessagingSessionMonthlyData = [];
        const newLiveCallSessionMonthlyData = [];
        const newTranslationSessionMonthlyData = [];
        if (attributes.data != null) {
            for (let i = elements; i >= 0; i--) {
                let key = i + "_day_ago";
                newMessagingSessionMonthlyData.push(attributes.data.new_messaging_session_monthly_count[key]);
                newLiveCallSessionMonthlyData.push(attributes.data.new_live_call_session_monthly_count[key]);
                newTranslationSessionMonthlyData.push(attributes.data.new_translation_session_monthly_count[key]);
            }
        }


        return [
            {
                label: 'Phiên Nhắn Tin',
                backgroundColor: 'transparent',
                borderColor: brandSuccess,
                pointHoverBackgroundColor: brandSuccess,
                borderWidth: 2,
                data: newMessagingSessionMonthlyData
            },
            {
                label: 'Phiên Gọi Trực Tuyến',
                backgroundColor: 'transparent',
                borderColor: brandWarning,
                pointHoverBackgroundColor: brandWarning,
                borderWidth: 2,
                data: newLiveCallSessionMonthlyData
            },
            {
                label: 'Phiên Phiên Dịch',
                backgroundColor: 'transparent',
                borderColor: brandDark,
                pointHoverBackgroundColor: brandDark,
                borderWidth: 2,
                data: newTranslationSessionMonthlyData
            },
        ]
    })()

    const defaultOptions = (() => {
        return {
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        stepSize: 1,
                        min: 0
                    },

                }]
            },
        }
    }
    )()

    // render
    return (
        <CChartLine
            {...attributes}
            datasets={userDatasets}
            options={defaultOptions}
            labels={countArray}
        />
    )
}

export default ServiceChart