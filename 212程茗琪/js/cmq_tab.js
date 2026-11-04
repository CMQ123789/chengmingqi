// =============================================================
// 文件：js/cmq_tab.js
// 作者：程茗琪
// 建立时间：2026-11-04
// 使用大模型：GLM-5.3-Flash
// 功能：可复用的 Tab 选项卡组件（监听事件 → 清除全部选中状态 → 设置当前选中）
// 用法：cmq_initTabs({ 可选配置 })，支持一个页面初始化多组选项卡
// =============================================================

// 功能：初始化页面上所有选项卡容器，为每个选项卡项绑定点击监听事件
function cmq_initTabs(cmq_options) {
  var cmq_config = Object.assign({
    cmq_boxSelector: '.cmq_tab_box',     // 选项卡最外层容器
    cmq_itemSelector: '.cmq_tab_item',   // 选项卡按钮
    cmq_panelSelector: '.cmq_tab_panel', // 选项卡内容面板
    cmq_activeClass: 'cmq_active'        // 选中状态类名
  }, cmq_options || {});

  var cmq_boxes = document.querySelectorAll(cmq_config.cmq_boxSelector);
  cmq_boxes.forEach(function (cmq_box) {
    var cmq_items = cmq_box.querySelectorAll(cmq_config.cmq_itemSelector);
    var cmq_panels = cmq_box.querySelectorAll(cmq_config.cmq_panelSelector);

    cmq_items.forEach(function (cmq_item, cmq_index) {
      // 监听事件：点击选项卡时，清除全部选中状态后再设置当前项选中
      cmq_item.addEventListener('click', function () {
        cmq_setActiveTab(cmq_items, cmq_panels, cmq_index, cmq_config.cmq_activeClass);
      });
    });
  });
}

// 功能：先清除所有选项卡和内容面板的选中状态，再设置当前点击的元素为选中状态并显示对应面板
function cmq_setActiveTab(cmq_items, cmq_panels, cmq_index, cmq_activeClass) {
  // 第一步：清除所有选项卡的选中状态
  cmq_items.forEach(function (cmq_item) {
    cmq_item.classList.remove(cmq_activeClass);
  });
  // 同步清除所有内容面板的显示状态
  cmq_panels.forEach(function (cmq_panel) {
    cmq_panel.classList.remove(cmq_activeClass);
  });

  // 第二步：设置当前元素的选中状态
  cmq_items[cmq_index].classList.add(cmq_activeClass);
  if (cmq_panels[cmq_index]) {
    cmq_panels[cmq_index].classList.add(cmq_activeClass);
  }
}

// 功能：页面加载完成后自动初始化全部选项卡
document.addEventListener('DOMContentLoaded', function () {
  cmq_initTabs();
});
