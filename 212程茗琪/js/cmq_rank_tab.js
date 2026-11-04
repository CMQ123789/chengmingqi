// =============================================================
// 文件：js/cmq_rank_tab.js
// 作者：程茗琪
// 建立时间：2026-11-04
// 使用大模型：GLM-5.3-Flash
// 功能：点击排行页的选项卡切换（监听事件 → 先清除所有选中状态 → 再设置当前元素选中）
// =============================================================

// 功能：初始化“实时点击 / 24小时排行”两个选项卡，为每个选项卡绑定点击监听事件
function cmq_initRankTabs() {
  var cmq_tabs = document.querySelectorAll('.cmq_tab');
  cmq_tabs.forEach(function (cmq_tab, cmq_index) {
    // 监听事件：点击选项卡时，清除全部选中状态后再设置当前项选中
    cmq_tab.addEventListener('click', function () {
      cmq_setActiveRankTab(cmq_tabs, cmq_index);
    });
  });
}

// 功能：先清除所有选项卡的选中状态（灰色），再把当前点击的选项卡设置为选中（变成灰色）
function cmq_setActiveRankTab(cmq_tabs, cmq_index) {
  // 第一步：清除所有选项卡的选中状态
  cmq_tabs.forEach(function (cmq_tab) {
    cmq_tab.classList.remove('cmq_tab_active');
    cmq_tab.classList.add('cmq_tab_inactive');
  });

  // 第二步：设置当前元素为选中状态（该板块变成灰色）
  cmq_tabs[cmq_index].classList.remove('cmq_tab_inactive');
  cmq_tabs[cmq_index].classList.add('cmq_tab_active');
}

// 功能：页面加载完成后自动初始化选项卡
document.addEventListener('DOMContentLoaded', function () {
  cmq_initRankTabs();
});
