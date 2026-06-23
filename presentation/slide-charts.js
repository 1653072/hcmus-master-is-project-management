/**
 * Chart helpers — tái sử dụng cho slide chi phí / độ nhạy.
 */

function formatBillions(value) {
  if (value >= 1000) return (value / 1000).toFixed(3).replace(/\.?0+$/, '').replace('.', ',') + ' tỷ';
  return value + ' triệu';
}

/** So sánh 2 giá trị gần nhau — dùng thẻ KPI + % thay vì progress bar */
function renderDeltaCompare(containerId, opts) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const { baseline, scenario, baselineLabel, scenarioLabel, invert = false } = opts;
  const delta = scenario - baseline;
  const pct = baseline ? ((delta / baseline) * 100).toFixed(1) : '0';
  const isUp = delta > 0;
  const badgeClass = invert ? (isUp ? 'delta-badge--good' : 'delta-badge--bad') : (isUp ? 'delta-badge--bad' : 'delta-badge--good');
  const sign = delta > 0 ? '+' : '';
  const deltaText = Math.abs(delta) >= 1000
    ? sign + (delta / 1000).toFixed(3).replace('.', ',') + ' tỷ'
    : sign + delta + ' triệu';

  el.innerHTML = `
    <div class="delta-compare">
      <div class="delta-card">
        <span class="delta-card-label">${baselineLabel}</span>
        <span class="delta-card-value">${formatBillions(baseline)}</span>
      </div>
      <div class="delta-arrow" aria-hidden="true">→</div>
      <div class="delta-card delta-card--scenario">
        <span class="delta-card-label">${scenarioLabel}</span>
        <span class="delta-card-value">${formatBillions(scenario)}</span>
        <span class="delta-badge ${badgeClass}">${deltaText} (${sign}${pct}%)</span>
      </div>
    </div>`;
}

/** Tiết kiệm GenAI — before/after với thanh % tiết kiệm có ý nghĩa */
function renderSavingsCompare(containerId, opts) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const { baseline, scenario, baselineLabel, scenarioLabel } = opts;
  const saved = baseline - scenario;
  const pct = Math.round((saved / baseline) * 100);
  el.innerHTML = `
    <div class="savings-compare">
      <div class="savings-row">
        <span class="savings-label">${baselineLabel}</span>
        <div class="savings-bar-wrap"><div class="savings-bar savings-bar--base" style="width:100%"></div></div>
        <span class="savings-val">${formatBillions(baseline)}</span>
      </div>
      <div class="savings-row">
        <span class="savings-label">${scenarioLabel}</span>
        <div class="savings-bar-wrap"><div class="savings-bar savings-bar--save" style="width:${Math.round((scenario/baseline)*100)}%"></div></div>
        <span class="savings-val">${formatBillions(scenario)}</span>
      </div>
      <p class="savings-note">Tiết kiệm <strong>${formatBillions(saved)}</strong> (−${pct}%)</p>
    </div>`;
}

/** So sánh nhiều kịch bản UCP (không dùng cùng scale với FPA) */
function renderScenarioCards(containerId, items) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = `<div class="scenario-cards">${items.map((item, i) => `
    <article class="scenario-card ${item.highlight ? 'scenario-card--highlight' : ''}">
      <span class="scenario-card-num">${i + 1}</span>
      <h4 class="scenario-card-title">${item.label}</h4>
      <p class="scenario-card-value">${item.value}</p>
      ${item.note ? `<p class="scenario-card-note">${item.note}</p>` : ''}
    </article>`).join('')}</div>`;
}

function renderBars(containerId, items, maxVal) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = items.map(item => {
    const pct = Math.max(4, Math.round((item.value / maxVal) * 100));
    return `<div class="bar-row">
      <span class="bar-label">${item.label}</span>
      <div class="bar-track"><div class="bar-fill ${item.cls || 'bar-ucp'}" style="width:${pct}%"></div></div>
      <span class="bar-val">${item.text}</span>
    </div>`;
  }).join('');
}
