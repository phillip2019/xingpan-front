-- 注意：该页面对应的前台目录为views/cg文件夹下
-- 如果你想更改到其他目录，请修改sql中component字段对应的值


INSERT INTO sys_permission(id, parent_id, name, url, component, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_route, is_leaf, keep_alive, hidden, hide_tab, description, status, del_flag, rule_flag, create_by, create_time, update_by, update_time, internal_or_external) 
VALUES ('2023021304362190550', NULL, 'chinagoods平台部门指标清册', '/cg/cgDeptIndexList', 'cg/CgDeptIndexList', NULL, NULL, 0, NULL, '1', 0.00, 0, NULL, 1, 1, 0, 0, 0, NULL, '1', 0, 0, 'admin', '2023-02-13 16:36:55', NULL, NULL, 0);

-- 权限控制sql
-- 新增
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023021304362190551', '2023021304362190550', '添加chinagoods平台部门指标清册', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:cg_dept_index:add', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-02-13 16:36:55', NULL, NULL, 0, 0, '1', 0);
-- 编辑
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023021304362200552', '2023021304362190550', '编辑chinagoods平台部门指标清册', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:cg_dept_index:edit', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-02-13 16:36:55', NULL, NULL, 0, 0, '1', 0);
-- 删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023021304362200553', '2023021304362190550', '删除chinagoods平台部门指标清册', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:cg_dept_index:delete', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-02-13 16:36:55', NULL, NULL, 0, 0, '1', 0);
-- 批量删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023021304362200554', '2023021304362190550', '批量删除chinagoods平台部门指标清册', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:cg_dept_index:deleteBatch', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-02-13 16:36:55', NULL, NULL, 0, 0, '1', 0);
-- 导出excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023021304362200555', '2023021304362190550', '导出excel_chinagoods平台部门指标清册', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:cg_dept_index:exportXls', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-02-13 16:36:55', NULL, NULL, 0, 0, '1', 0);
-- 导入excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2023021304362200556', '2023021304362190550', '导入excel_chinagoods平台部门指标清册', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:cg_dept_index:importExcel', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2023-02-13 16:36:55', NULL, NULL, 0, 0, '1', 0);