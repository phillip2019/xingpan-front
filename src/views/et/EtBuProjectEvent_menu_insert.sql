-- 注意：该页面对应的前台目录为views/org.jeecg.et文件夹下
-- 如果你想更改到其他目录，请修改sql中component字段对应的值


INSERT INTO sys_permission(id, parent_id, name, url, component, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_route, is_leaf, keep_alive, hidden, hide_tab, description, status, del_flag, rule_flag, create_by, create_time, update_by, update_time, internal_or_external) 
VALUES ('2023072610508760350', NULL, 'et_bu_project_event', '/org.jeecg.et/etBuProjectEventList', 'org.jeecg.et/EtBuProjectEventList', NULL, NULL, 0, NULL, '1', 0.00, 0, NULL, 1, 1, 0, 0, 0, NULL, '1', 0, 0, 'admin', '2023-07-26 22:50:35', NULL, NULL, 0);

-- 权限控制sql
-- 新增
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023072610508770351', '2023072610508760350', '添加et_bu_project_event', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:et_bu_project_event:add', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-07-26 22:50:35', NULL, NULL, 0, 0, '1', 0);
-- 编辑
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023072610508770352', '2023072610508760350', '编辑et_bu_project_event', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:et_bu_project_event:edit', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-07-26 22:50:35', NULL, NULL, 0, 0, '1', 0);
-- 删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023072610508770353', '2023072610508760350', '删除et_bu_project_event', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:et_bu_project_event:delete', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-07-26 22:50:35', NULL, NULL, 0, 0, '1', 0);
-- 批量删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023072610508770354', '2023072610508760350', '批量删除et_bu_project_event', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:et_bu_project_event:deleteBatch', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-07-26 22:50:35', NULL, NULL, 0, 0, '1', 0);
-- 导出excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023072610508770355', '2023072610508760350', '导出excel_et_bu_project_event', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:et_bu_project_event:exportXls', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-07-26 22:50:35', NULL, NULL, 0, 0, '1', 0);
-- 导入excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023072610508770356', '2023072610508760350', '导入excel_et_bu_project_event', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:et_bu_project_event:importExcel', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-07-26 22:50:35', NULL, NULL, 0, 0, '1', 0);