/**
 * Khởi tạo biểu đồ — chỉ render khi container tồn tại (an toàn cho slide đơn lẻ).
 */
(function () {
  if (typeof renderBars === 'function') {
    renderBars('chart-ucp-cost', [
      { label: 'Lương NS', value: 1015, text: '1.015 tỷ', cls: 'bar-ucp' },
      { label: 'Hạ tầng+AI', value: 78, text: '78 triệu', cls: 'bar-ucp' },
      { label: 'Dự phòng', value: 117, text: '117 triệu', cls: 'bar-ucp' },
    ], 1015);

    renderBars('chart-fpa-cost', [
      { label: 'Lương (55%)', value: 21545, text: '21,5 tỷ', cls: 'bar-fpa' },
      { label: 'Hạ tầng (20%)', value: 7834, text: '7,8 tỷ', cls: 'bar-fpa' },
      { label: 'Dự phòng (15%)', value: 5876, text: '5,9 tỷ', cls: 'bar-fpa' },
    ], 21545);
  }

  if (typeof renderDeltaCompare === 'function') {
    renderDeltaCompare('chart-sens-down', {
      baseline: 1290, scenario: 1303,
      baselineLabel: 'Gốc UCP', scenarioLabel: 'Giảm 20% nhân sự'
    });

    renderDeltaCompare('chart-sens-up', {
      baseline: 1290, scenario: 1277,
      baselineLabel: 'Gốc UCP', scenarioLabel: 'Tăng 20% nhân sự',
      invert: true
    });
  }

  if (typeof renderSavingsCompare === 'function') {
    renderSavingsCompare('chart-genai50', {
      baseline: 1290, scenario: 1000,
      baselineLabel: 'UCP gốc', scenarioLabel: 'GenAI 50%'
    });

    renderSavingsCompare('chart-genai80', {
      baseline: 1290, scenario: 751,
      baselineLabel: 'UCP gốc', scenarioLabel: 'GenAI 80%'
    });
  }

  if (typeof renderScenarioCards === 'function') {
    renderScenarioCards('chart-genai-compare', [
      { label: 'UCP gốc', value: '1,29 tỷ' },
      { label: 'UCP + GenAI 50%', value: '1,00 tỷ', note: '−289 triệu' },
      { label: 'UCP + GenAI 80%', value: '751 triệu', note: '−539 triệu', highlight: true },
      { label: 'FPA thuê ngoài', value: '39,17 tỷ', note: 'Không đổi' },
    ]);
  }
})();
