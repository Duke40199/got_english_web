import React, { useState, useEffect } from 'react'
import {
  CWidgetDropdown,
  CRow,
  CCol,
} from '@coreui/react'
import ChartBarSimple from '../charts/ChartBarSimple'

import { GetDailySummaryAPI } from '../../api/summary';

const WidgetsDropdown = () => {
  const [todayNewExpert, setTodayNewExpert] = useState(null);
  const [lastWeekNewExpert, setLastWeekNewExpert] = useState(null);
  const [todayNewLearner, setTodayNewLearner] = useState(null);
  const [lastWeekNewLearner, setLastWeekNewLearner] = useState(null);
  const [todayCompletedService, setTodayCompletedService] = useState(null);
  const [lastWeekCompletedService, setLastWeekCompletedService] = useState(null);
  const [todayInvoice, setTodayInvoice] = useState(null);
  const [lastWeekInvoice, setLastWeekInvoice] = useState(null);


  useEffect(() => {
    async function fetchData() {
      const dailySummary = await GetDailySummaryAPI();
      let lastWeekNewExpert = [];
      let lastWeekNewLearner = [];
      let lastWeekCompletedService = [];
      let lastWeekInvoice = [];
      if (dailySummary != null) {
        //today report
        setTodayNewExpert(dailySummary.new_expert_weekly_count["0_day_ago"]);
        setTodayNewLearner(dailySummary.new_learner_weekly_count["0_day_ago"]);
        setTodayCompletedService(dailySummary.new_messaging_session_weekly_count["0_day_ago"] + dailySummary.new_live_call_session_weekly_count["0_day_ago"] + dailySummary.new_translation_session_weekly_count["0_day_ago"]);
        setTodayInvoice(dailySummary.new_invoice_weekly_count["0_day_ago"]);
        //last week report
        //new expert
        lastWeekNewExpert.push(dailySummary.new_expert_weekly_count["7_day_ago"]);
        lastWeekNewExpert.push(dailySummary.new_expert_weekly_count["6_day_ago"]);
        lastWeekNewExpert.push(dailySummary.new_expert_weekly_count["5_day_ago"]);
        lastWeekNewExpert.push(dailySummary.new_expert_weekly_count["4_day_ago"]);
        lastWeekNewExpert.push(dailySummary.new_expert_weekly_count["3_day_ago"]);
        lastWeekNewExpert.push(dailySummary.new_expert_weekly_count["2_day_ago"]);
        lastWeekNewExpert.push(dailySummary.new_expert_weekly_count["1_day_ago"]);
        //new learner
        lastWeekNewLearner.push(dailySummary.new_learner_weekly_count["7_day_ago"]);
        lastWeekNewLearner.push(dailySummary.new_learner_weekly_count["6_day_ago"]);
        lastWeekNewLearner.push(dailySummary.new_learner_weekly_count["5_day_ago"]);
        lastWeekNewLearner.push(dailySummary.new_learner_weekly_count["4_day_ago"]);
        lastWeekNewLearner.push(dailySummary.new_learner_weekly_count["3_day_ago"]);
        lastWeekNewLearner.push(dailySummary.new_learner_weekly_count["2_day_ago"]);
        lastWeekNewLearner.push(dailySummary.new_learner_weekly_count["1_day_ago"]);
        //new completed service
        lastWeekCompletedService.push(dailySummary.new_messaging_session_weekly_count["7_day_ago"] + dailySummary.new_live_call_session_weekly_count["7_day_ago"] + dailySummary.new_translation_session_weekly_count["7_day_ago"]);
        lastWeekCompletedService.push(dailySummary.new_messaging_session_weekly_count["6_day_ago"] + dailySummary.new_live_call_session_weekly_count["6_day_ago"] + dailySummary.new_translation_session_weekly_count["6_day_ago"]);
        lastWeekCompletedService.push(dailySummary.new_messaging_session_weekly_count["5_day_ago"] + dailySummary.new_live_call_session_weekly_count["5_day_ago"] + dailySummary.new_translation_session_weekly_count["5_day_ago"]);
        lastWeekCompletedService.push(dailySummary.new_messaging_session_weekly_count["4_day_ago"] + dailySummary.new_live_call_session_weekly_count["4_day_ago"] + dailySummary.new_translation_session_weekly_count["4_day_ago"]);
        lastWeekCompletedService.push(dailySummary.new_messaging_session_weekly_count["3_day_ago"] + dailySummary.new_live_call_session_weekly_count["3_day_ago"] + dailySummary.new_translation_session_weekly_count["3_day_ago"]);
        lastWeekCompletedService.push(dailySummary.new_messaging_session_weekly_count["2_day_ago"] + dailySummary.new_live_call_session_weekly_count["2_day_ago"] + dailySummary.new_translation_session_weekly_count["2_day_ago"]);
        lastWeekCompletedService.push(dailySummary.new_messaging_session_weekly_count["1_day_ago"] + dailySummary.new_live_call_session_weekly_count["1_day_ago"] + dailySummary.new_translation_session_weekly_count["1_day_ago"]);
        //new invoice
        lastWeekInvoice.push(dailySummary.new_invoice_weekly_count["7_day_ago"]);
        lastWeekInvoice.push(dailySummary.new_invoice_weekly_count["6_day_ago"]);
        lastWeekInvoice.push(dailySummary.new_invoice_weekly_count["5_day_ago"]);
        lastWeekInvoice.push(dailySummary.new_invoice_weekly_count["4_day_ago"]);
        lastWeekInvoice.push(dailySummary.new_invoice_weekly_count["3_day_ago"]);
        lastWeekInvoice.push(dailySummary.new_invoice_weekly_count["2_day_ago"]);
        lastWeekInvoice.push(dailySummary.new_invoice_weekly_count["1_day_ago"]);
        //set state
        setLastWeekNewExpert(lastWeekNewExpert);
        setLastWeekNewLearner(lastWeekNewLearner);
        setLastWeekCompletedService(lastWeekCompletedService);
        setLastWeekInvoice(lastWeekInvoice);
      }
    }
    fetchData();
  }, []);

  // render
  return (
    <CRow>
      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-primary"
          header={todayNewExpert != null ? todayNewExpert.toString() : "..."}
          text="Chuyên Gia mới trong ngày hôm nay"
          footerSlot={
            <ChartBarSimple
              pointed
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              dataPoints={lastWeekNewExpert}
              backgroundColor="rgba(255,255,255,.5)"
              label={["7 ngày trước", "6 ngày trước", "5 ngày trước", "4 ngày trước", "3 ngày trước", "2 ngày trước", "Hôm qua"]}
            />
          }
        >
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-info"
          header={todayNewLearner != null ? todayNewLearner.toString() : "..."}
          text="Học Viên mới trong ngày hôm nay"
          footerSlot={
            <ChartBarSimple
              pointed
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              backgroundColor="rgba(255,255,255,.5)"
              dataPoints={lastWeekNewLearner}
              label={["7 ngày trước", "6 ngày trước", "5 ngày trước", "4 ngày trước", "3 ngày trước", "2 ngày trước", "Hôm qua"]}
            />
          }
        >
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-warning"
          header={todayCompletedService != null ? todayCompletedService.toString() : "..."}
          text="Phiên Dịch Vụ đã hoàn thành trong ngày hôm nay"
          footerSlot={
            <ChartBarSimple
              pointed
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              backgroundColor="rgba(255,255,255,.5)"
              dataPoints={lastWeekCompletedService}
              label={["7 ngày trước", "6 ngày trước", "5 ngày trước", "4 ngày trước", "3 ngày trước", "2 ngày trước", "Hôm qua"]}
            />
          }
        >
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-danger"
          header={todayInvoice != null ? todayInvoice.toString() : "..."}
          text="Gói Coin đã được bán trong ngày hôm nay"
          footerSlot={
            <ChartBarSimple
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              dataPoints={lastWeekInvoice}
              backgroundColor="rgba(255,255,255,.5)"
              label={["7 ngày trước", "6 ngày trước", "5 ngày trước", "4 ngày trước", "3 ngày trước", "2 ngày trước", "Hôm qua"]}
            />
          }
        >
        </CWidgetDropdown>
      </CCol>
    </CRow>
  )
}

export default WidgetsDropdown
