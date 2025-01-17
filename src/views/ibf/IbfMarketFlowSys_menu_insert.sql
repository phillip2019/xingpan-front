-- 注意：该页面对应的前台目录为views/ibf文件夹下
-- 如果你想更改到其他目录，请修改sql中component字段对应的值


INSERT INTO sys_permission(id, parent_id, name, url, component, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_route, is_leaf, keep_alive, hidden, hide_tab, description, status, del_flag, rule_flag, create_by, create_time, update_by, update_time, internal_or_external) 
VALUES ('2025011704189170070', NULL, 'ibf_market_flow_sys', '/ibf/ibfMarketFlowSysList', 'ibf/IbfMarketFlowSysList', NULL, NULL, 0, NULL, '1', 0.00, 0, NULL, 1, 1, 0, 0, 0, NULL, '1', 0, 0, 'admin', '2025-01-17 16:18:07', NULL, NULL, 0);

-- 权限控制sql
-- 新增
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2025011704189170071', '2025011704189170070', '添加ibf_market_flow_sys', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:ibf_market_flow_sys:add', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2025-01-17 16:18:07', NULL, NULL, 0, 0, '1', 0);
-- 编辑
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2025011704189170072', '2025011704189170070', '编辑ibf_market_flow_sys', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:ibf_market_flow_sys:edit', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2025-01-17 16:18:07', NULL, NULL, 0, 0, '1', 0);
-- 删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2025011704189170073', '2025011704189170070', '删除ibf_market_flow_sys', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:ibf_market_flow_sys:delete', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2025-01-17 16:18:07', NULL, NULL, 0, 0, '1', 0);
-- 批量删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2025011704189170074', '2025011704189170070', '批量删除ibf_market_flow_sys', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:ibf_market_flow_sys:deleteBatch', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2025-01-17 16:18:07', NULL, NULL, 0, 0, '1', 0);
-- 导出excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2025011704189170075', '2025011704189170070', '导出excel_ibf_market_flow_sys', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:ibf_market_flow_sys:exportXls', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2025-01-17 16:18:07', NULL, NULL, 0, 0, '1', 0);
-- 导入excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2025011704189170076', '2025011704189170070', '导入excel_ibf_market_flow_sys', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:ibf_market_flow_sys:importExcel', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2025-01-17 16:18:07', NULL, NULL, 0, 0, '1', 0);