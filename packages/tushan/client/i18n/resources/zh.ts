import type { TranslationKeys } from '..';

export const i18nZhTranslation: TranslationKeys = {
  tushan: {
    navbar: {
      title: '涂山 · Tushan',
      logout: '登出',
    },
    footer: {
      title: '本项目由涂山强力驱动 · Powered by Tushan',
    },
    breadcrumb: {
      home: '首页',
    },
    login: {
      username: '用户名',
      password: '密码',
      loginBtn: '登录',
    },
    dashboard: {
      name: '仪表盘',
      welcome: '欢迎回来, {{name}}',
      user: '用户',
      group: '群组',
      item: '项目',
      more: '了解更多',
      tip: {
        docs: '阅读文档了解更多',
        github: 'Tushan 是一个开源项目',
        design: 'Tushan 使用 Arco Design 作为技术的UI设计规范',
      },
    },
    list: {
      create: '创建',
      export: '导出',
      actions: '操作',
      detail: '详情',
      edit: '编辑',
      delete: '删除',
      batchDelete: '批量删除',
      deleteTitle: '确认删除',
      deleteDesc: '是否确认删除该记录?',
      deleteSuccess: '删除成功',
    },
    edit: {
      create: '创建',
      save: '保存',
      cancel: '取消',
    },
    common: {
      submit: '提交',
      success: '成功',
      failed: '失败',
      operateSuccess: '操作成功',
      operateFailed: '操作失败',
      confirmTitle: '确认要进行该操作么？',
      confirmContent: '该操作不可撤回',
    },
  },
};
