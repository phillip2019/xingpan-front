-- 注意：该页面对应的前台目录为views/ibf文件夹下
-- 如果你想更改到其他目录，请修改sql中component字段对应的值


INSERT INTO sys_permission(id, parent_id, name, url, component, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_route, is_leaf, keep_alive, hidden, hide_tab, description, status, del_flag, rule_flag, create_by, create_time, update_by, update_time, internal_or_external) 
VALUES ('202501170415780390', NULL, '填报发布汇总', '/ibf/ibfReportingSummaryList', 'ibf/IbfReportingSummaryList', NULL, NULL, 0, NULL, '1', 0.00, 0, NULL, 1, 1, 0, 0, 0, NULL, '1', 0, 0, 'admin', '2025-01-17 16:15:39', NULL, NULL, 0);

-- 权限控制sql
-- 新增
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('202501170415780391', '202501170415780390', '添加填报发布汇总', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:ibf_reporting_summary:add', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2025-01-17 16:15:39', NULL, NULL, 0, 0, '1', 0);
-- 编辑
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('202501170415780392', '202501170415780390', '编辑填报发布汇总', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:ibf_reporting_summary:edit', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2025-01-17 16:15:39', NULL, NULL, 0, 0, '1', 0);
-- 删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('202501170415780393', '202501170415780390', '删除填报发布汇总', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:ibf_reporting_summary:delete', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2025-01-17 16:15:39', NULL, NULL, 0, 0, '1', 0);
-- 批量删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('202501170415780394', '202501170415780390', '批量删除填报发布汇总', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:ibf_reporting_summary:deleteBatch', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2025-01-17 16:15:39', NULL, NULL, 0, 0, '1', 0);
-- 导出excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('202501170415780395', '202501170415780390', '导出excel_填报发布汇总', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:ibf_reporting_summary:exportXls', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2025-01-17 16:15:39', NULL, NULL, 0, 0, '1', 0);
-- 导入excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('202501170415780396', '202501170415780390', '导入excel_填报发布汇总', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:ibf_reporting_summary:importExcel', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2025-01-17 16:15:39', NULL, NULL, 0, 0, '1', 0);


SendMsgJob