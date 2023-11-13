-- 注意：该页面对应的前台目录为views/et文件夹下
-- 如果你想更改到其他目录，请修改sql中component字段对应的值


INSERT INTO sys_permission(id, parent_id, name, url, component, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_route, is_leaf, keep_alive, hidden, hide_tab, description, status, del_flag, rule_flag, create_by, create_time, update_by, update_time, internal_or_external) 
VALUES ('2023111301539790470', NULL, '客户端事件表截图', '/et/etClientEventScreenshotList', 'et/EtClientEventScreenshotList', NULL, NULL, 0, NULL, '1', 0.00, 0, NULL, 1, 1, 0, 0, 0, NULL, '1', 0, 0, 'admin', '2023-11-13 13:53:47', NULL, NULL, 0);

-- 权限控制sql
-- 新增
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023111301539790471', '2023111301539790470', '添加客户端事件表截图', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:et_client_event_screenshot:add', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-11-13 13:53:47', NULL, NULL, 0, 0, '1', 0);
-- 编辑
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023111301539790472', '2023111301539790470', '编辑客户端事件表截图', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:et_client_event_screenshot:edit', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-11-13 13:53:47', NULL, NULL, 0, 0, '1', 0);
-- 删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023111301539790473', '2023111301539790470', '删除客户端事件表截图', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:et_client_event_screenshot:delete', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-11-13 13:53:47', NULL, NULL, 0, 0, '1', 0);
-- 批量删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023111301539790474', '2023111301539790470', '批量删除客户端事件表截图', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:et_client_event_screenshot:deleteBatch', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-11-13 13:53:47', NULL, NULL, 0, 0, '1', 0);
-- 导出excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023111301539790475', '2023111301539790470', '导出excel_客户端事件表截图', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:et_client_event_screenshot:exportXls', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-11-13 13:53:47', NULL, NULL, 0, 0, '1', 0);
-- 导入excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023111301539790476', '2023111301539790470', '导入excel_客户端事件表截图', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:et_client_event_screenshot:importExcel', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-11-13 13:53:47', NULL, NULL, 0, 0, '1', 0);