-- 注意：该页面对应的前台目录为views/org.jeecg.et文件夹下
-- 如果你想更改到其他目录，请修改sql中component字段对应的值


INSERT INTO sys_permission(id, parent_id, name, url, component, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_route, is_leaf, keep_alive, hidden, hide_tab, description, status, del_flag, rule_flag, create_by, create_time, update_by, update_time, internal_or_external) 
VALUES ('2023072610497160280', NULL, 'et_platform_site_code', '/org.jeecg.et/etPlatformSiteCodeList', 'org.jeecg.et/EtPlatformSiteCodeList', NULL, NULL, 0, NULL, '1', 0.00, 0, NULL, 1, 1, 0, 0, 0, NULL, '1', 0, 0, 'admin', '2023-07-26 22:49:28', NULL, NULL, 0);

-- 权限控制sql
-- 新增
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023072610497160281', '2023072610497160280', '添加et_platform_site_code', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:et_platform_site_code:add', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-07-26 22:49:28', NULL, NULL, 0, 0, '1', 0);
-- 编辑
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023072610497160282', '2023072610497160280', '编辑et_platform_site_code', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:et_platform_site_code:edit', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-07-26 22:49:28', NULL, NULL, 0, 0, '1', 0);
-- 删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023072610497160283', '2023072610497160280', '删除et_platform_site_code', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:et_platform_site_code:delete', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-07-26 22:49:28', NULL, NULL, 0, 0, '1', 0);
-- 批量删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023072610497160284', '2023072610497160280', '批量删除et_platform_site_code', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:et_platform_site_code:deleteBatch', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-07-26 22:49:28', NULL, NULL, 0, 0, '1', 0);
-- 导出excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023072610497160285', '2023072610497160280', '导出excel_et_platform_site_code', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:et_platform_site_code:exportXls', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-07-26 22:49:28', NULL, NULL, 0, 0, '1', 0);
-- 导入excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023072610497160286', '2023072610497160280', '导入excel_et_platform_site_code', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:et_platform_site_code:importExcel', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-07-26 22:49:28', NULL, NULL, 0, 0, '1', 0);