import React from 'react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle } from '@coreui/utils'

const brandPrimary = getStyle('primary') || '#321fdb'
const brandDanger = getStyle('danger') || '#e55353'

const UserChart = attributes => {
    let dataCount = 0;
    let countArray = [];

    if (attributes.data != null) {
        dataCount = Object.keys(attributes.data.new_expert_monthly_count).length;
        for (var i = 1; i <= dataCount; i++) {
            countArray.push(i);
        }
    }

    const userDatasets = (() => {
        let elements = dataCount - 1;
        const newExpertMonthlyData = [];
        const newLearnerMonthlyData = [];
        if (attributes.data != null) {
            for (let i = elements; i >= 0; i--) {
                let key = i + "_day_ago";
                newExpertMonthlyData.push(attributes.data.new_expert_monthly_count[key]);
                newLearnerMonthlyData.push(attributes.data.new_learner_monthly_count[key]);
            }
        }


        return [
            {
                label: 'Chuyên Gia',
                backgroundColor: 'transparent',
                borderColor: brandPrimary,
                pointHoverBackgroundColor: brandPrimary,
                borderWidth: 2,
                data: newExpertMonthlyData
            },
            {
                label: 'Học Viên',
                backgroundColor: 'transparent',
                borderColor: brandDanger,
                pointHoverBackgroundColor: brandDanger,
                borderWidth: 2,
                data: newLearnerMonthlyData
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

export default UserChart