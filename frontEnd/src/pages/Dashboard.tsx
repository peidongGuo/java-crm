import schema2component from '../components/schema2component';
import { render as renderAmis } from 'amis';
import React from 'react';
import axios from 'axios';

const Dashboard: React.FC = () => {
  return (
    <>
      {renderAmis(
        {
          definitions: {
            sourceSelect: {
              type: 'select',
              name: 'sourceId',
              label: '客户来源',
              placeholder: '客户来源',
              // source: 'https://10.1.83.37/admin/v2/tenants',
              source: {
                url: 'http://gpdcrm.com/crm/dictTypes/002/dictItems',
                method: 'get',
                adaptor: (payload: any, response: any, api: any) => {
                  console.log(payload);
                  console.log(response);
                  console.log(api);
                  let tmpData = [];
                  for (let i = 0; i < payload.length; i++) {
                    tmpData.push({ label: payload[i].name, value: payload[i].id });
                  }
                  return { data: { options: tmpData }, status: 0, msg: '请求成功！' };
                }
              }
            },
            industrySelect: {
              type: 'select',
              name: 'industryId',
              label: '所属行业',
              placeholder: '所属行业',
              // source: 'https://10.1.83.37/admin/v2/tenants',
              source: {
                url: 'http://gpdcrm.com/crm/dictTypes/001/dictItems',
                method: 'get',
                adaptor: (payload: any, response: any, api: any) => {
                  console.log(payload);
                  console.log(response);
                  console.log(api);
                  let tmpData = [];
                  for (let i = 0; i < payload.length; i++) {
                    tmpData.push({ label: payload[i].name, value: payload[i].id });
                  }
                  return { data: { options: tmpData }, status: 0, msg: '请求成功！' };
                }
              }
            },
            levelSelect: {
              type: 'select',
              name: 'level',
              label: '客户级别',
              placeholder: '客户级别',
              // source: 'https://10.1.83.37/admin/v2/tenants',
              source: {
                url: 'http://gpdcrm.com/crm/dictTypes/006/dictItems',
                method: 'get',
                adaptor: (payload: any, response: any, api: any) => {
                  console.log(payload);
                  console.log(response);
                  console.log(api);
                  let tmpData = [];
                  for (let i = 0; i < payload.length; i++) {
                    tmpData.push({ label: payload[i].name, value: payload[i].id });
                  }
                  return { data: { options: tmpData }, status: 0, msg: '请求成功！' };
                }
              }
            }
          },
          type: 'page',
          // $schema: 'http://amis.baidu.com/v2/schemas/page.json#',
          title: '客户列表',
          toolbar: [
            {
              type: 'button',
              actionType: 'dialog',
              label: '新增',
              icon: 'fa fa-plus pull-left',
              primary: true,
              dialog: {
                title: '新增',
                // body: '测试'
                body: {
                  type: 'form',
                  name: 'sample-edit-form',
                  // api: 'post:http://gpdcrm.com/crm/customers',
                  api: {
                    url: 'http://gpdcrm.com/crm/customers',
                    headers: {
                      contentType: 'application/json;charset=UTF-8'
                    },
                    method: 'post',
                    adaptor: (payload: any, response: any, api: any) => {
                      console.log(payload);
                      console.log(response);
                      console.log(api);
                      // let tmpData = [];
                      // for (let i = 0; i < payload.length; i++) {
                      //   tmpData.push({ name: payload[i] });
                      // }
                      return { data: payload, status: 0, msg: '请求成功！' };
                    }
                  },
                  controls: [
                    {
                      type: 'text',
                      name: 'name',
                      label: '客户名称',
                      required: true
                    },
                    {
                      type: 'divider'
                    },
                    {
                      $ref: 'sourceSelect'
                    },
                    {
                      type: 'divider'
                    },
                    {
                      $ref: 'industrySelect'
                    },
                    {
                      type: 'divider'
                    },
                    {
                      $ref: 'levelSelect'
                    },
                    {
                      type: 'divider'
                    },
                    {
                      type: 'text',
                      name: 'mobile',
                      label: '固定电话',
                      required: true
                    },
                    {
                      type: 'divider'
                    },
                    {
                      type: 'text',
                      name: 'phone',
                      label: '移动电话',
                      required: true
                    }
                  ]
                }
              }
            }
          ],
          body: {
            type: 'crud',
            keepItemSelectionOnPageChange: true,
            filter: {
              title: '高级搜索',
              submitText: '提交',
              controls: [
                {
                  type: 'text',
                  name: 'name',
                  placeholder: '客户名称'
                },
                {
                  $ref: 'sourceSelect'
                },
                {
                  $ref: 'industrySelect'
                },
                {
                  $ref: 'levelSelect'
                }
              ]
            },
            api: {
              url: 'http://gpdcrm.com/crm/customers',
              method: 'get',
              adaptor: (payload: any, response: any, api: any) => {
                console.log(payload);
                console.log(response);
                console.log(api);
                // let tmpData = [];
                // for (let i = 0; i < payload.length; i++) {
                //   tmpData.push({ name: payload[i] });
                // }
                return { data: { rows: payload.content, count: payload.total }, status: 0, msg: '请求成功！' };
              }
            },
            // headerToolbar: [
            //   {
            //     type: 'button',
            //     actionType: 'dialog',
            //     label: '新增',
            //     icon: 'fa fa-plus pull-left',
            //     primary: true,
            //     dialog: {
            //       title: '新增',
            //       body: '测试'
            //     }
            //   }
            // ],
            footerToolbar: ['statistics', 'switch-per-page', 'pagination'],
            columns: [
              {
                name: 'name',
                label: '名字',
                // width: 200,
                sortable: true,
                type: 'text',
                toggled: true,
                remark: 'Bla bla Bla'
              },
              {
                name: 'industryName',
                label: '所属行业',
                // width: 200,
                sortable: true,
                type: 'text',
                toggled: true,
                remark: 'Bla bla Bla'
              },
              {
                name: 'sourceName',
                label: '客户来源',
                // width: 200,
                sortable: true,
                type: 'text',
                toggled: true,
                remark: 'Bla bla Bla'
              },
              {
                name: 'levelName',
                label: '客户级别',
                // width: 200,
                sortable: true,
                type: 'text',
                toggled: true,
                remark: 'Bla bla Bla'
              },
              {
                type: 'operation',
                label: '操作',
                // width: 100,
                buttons: [
                  {
                    type: 'button',
                    icon: 'fa fa-pencil',
                    tooltip: '编辑',
                    actionType: 'drawer',
                    drawer: {
                      position: 'left',
                      size: 'lg',
                      title: '编辑',
                      body: {
                        type: 'form',
                        name: 'sample-edit-form',
                        api: {
                          url: 'http://gpdcrm.com/crm/customers/$id',
                          headers: {
                            contentType: 'application/json;charset=UTF-8'
                          },
                          method: 'put',
                          adaptor: (payload: any, response: any, api: any) => {
                            console.log(payload);
                            console.log(response);
                            console.log(api);
                            // let tmpData = [];
                            // for (let i = 0; i < payload.length; i++) {
                            //   tmpData.push({ name: payload[i] });
                            // }
                            return { data: payload, status: 0, msg: '请求成功！' };
                          }
                        },
                        controls: [
                          {
                            type: 'text',
                            name: 'name',
                            label: '客户名称',
                            required: true
                          },
                          {
                            type: 'divider'
                          },
                          {
                            $ref: 'sourceSelect'
                          },
                          {
                            type: 'divider'
                          },
                          {
                            $ref: 'industrySelect'
                          },
                          {
                            type: 'divider'
                          },
                          {
                            $ref: 'levelSelect'
                          },
                          {
                            type: 'divider'
                          },
                          {
                            type: 'text',
                            name: 'mobile',
                            label: '固定电话',
                            required: true
                          },
                          {
                            type: 'divider'
                          },
                          {
                            type: 'text',
                            name: 'phone',
                            label: '移动电话',
                            required: true
                          }
                        ]
                      }
                    }
                  },
                  {
                    type: 'button',
                    icon: 'fa fa-times text-danger',
                    actionType: 'ajax',
                    tooltip: '删除',
                    confirmText: '您确认要删除?',
                    api: {
                      url: 'http://gpdcrm.com/crm/customers/$id',
                      headers: {
                        contentType: 'application/json;charset=UTF-8'
                      },
                      method: 'delete',
                      adaptor: (payload: any, response: any, api: any) => {
                        console.log(payload);
                        console.log(response);
                        console.log(api);
                        // let tmpData = [];
                        // for (let i = 0; i < payload.length; i++) {
                        //   tmpData.push({ name: payload[i] });
                        // }
                        return { data: payload, status: 0, msg: '请求成功！' };
                      }
                    }
                  }
                ],
                toggled: true
              }
            ]
          }
        },
        {},
        {
          // fetcher: function(api) {
          //   // 适配这种格式 {"code": 0, "message": "", "result": {}}
          //   return axios(api.config).then(response => {
          //     let payload = {
          //       status: response.data.code,
          //       msg: response.data.message,
          //       data: response.data.result
          //     };

          //     return {
          //       ...response,
          //       data: payload
          //     };
          //   });
          // },
          fetcher: ({ url, method, data, config }: any) => {
            config = config || {};
            config.headers = config.headers || {};
            // console.log(config);
            config.withCredentials = false;

            if (method !== 'post' && method !== 'put' && method !== 'patch') {
              if (data) {
                config.params = data;
              }
              return (axios as any)[method](url, config);
            } else if (data && data instanceof FormData) {
              // config.headers = config.headers || {};
              // config.headers['Content-Type'] = 'multipart/form-data';
            } else if (data && typeof data !== 'string' && !(data instanceof Blob) && !(data instanceof ArrayBuffer)) {
              data = JSON.stringify(data);
              config.headers['Content-Type'] = 'application/json;charset=UTF-8';
            }

            return (axios as any)[method](url, data, config).then((response: any) => {
              console.log(response);
              let payload = {
                status: response.data.code,
                msg: response.data.message,
                data: response.data.result
              };

              return {
                ...response,
                data: payload
              };
            });
          },
          isCancel: (e: any) => axios.isCancel(e),
          notify: (type: 'success' | 'error' | 'info', msg: string) => {
            // toast[type]
            //   ? toast[type](msg, type === "error" ? "系统错误" : "系统消息")
            //   : console.warn("[Notify]", type, msg);
            console.log('[notify]', type, msg);
          },
          // alert,
          // confirm,
          copy: (contents: string, options: any = {}) => {
            // const ret = copy(contents, options);
            // ret &&
            //   (!options || options.shutup !== true) &&
            //   toast.info("内容已拷贝到剪切板");
            return contents;
          }
        }
      )}
    </>
  );
};

export default Dashboard;
