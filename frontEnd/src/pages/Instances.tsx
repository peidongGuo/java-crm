import schema2component from '../components/schema2component';
import { render as renderAmis } from 'amis';
import React from 'react';
import axios from 'axios';

const Instances: React.FC = () => {
  return (
    <>
      {renderAmis(
        {
          type: 'page',
          // $schema: "http://amis.baidu.com/v2/schemas/page.json#",
          title: '增删改查示例',
          body: {
            type: 'crud',
            api: {
              url: 'https://10.1.83.37/admin/v3/functions/${tenant}/${namespace}/${functionName}/status',
              method: 'get',
              adaptor: (payload: any, response: any, api: any) => {
                console.log(payload);
                console.log(response);
                console.log(api);
                let instanceList = payload.instances;
                let tmpData = { numInstances: payload.numInstances, numRunning: payload.numRunning, items: [] };
                for (let i = 0; i < instanceList.length; i++) {
                  tmpData.items.push({ id: instanceList[i].instanceId, ...instanceList[i].status });
                }
                console.log(tmpData);
                return { data: tmpData, status: 0, msg: '请求成功！' };
              }
            },
            headerToolbar: [
              {
                type: 'tpl',
                tpl: '当前有 ${numInstances} 个实例，正在运行的是 ${numRunning} 个。',
                className: 'v-middle'
              }
            ],
            filter: {
              title: '条件搜索',
              submitText: '提交',
              controls: [
                {
                  type: 'select',
                  name: 'tenant',
                  placeholder: '选择租户',
                  // source: 'https://10.1.83.37/admin/v2/tenants',
                  source: {
                    url: 'https://10.1.83.37/admin/v2/tenants',
                    method: 'get',
                    adaptor: (payload: any, response: any, api: any) => {
                      console.log(payload);
                      console.log(response);
                      console.log(api);
                      let tmpData = [];
                      for (let i = 0; i < payload.length; i++) {
                        tmpData.push({ label: payload[i], value: payload[i] });
                      }
                      return { data: { options: tmpData }, status: 0, msg: '请求成功！' };
                    }
                  }
                },
                {
                  type: 'select',
                  name: 'namespace',
                  placeholder: '选择命名空间',
                  // source: 'https://10.1.83.37/admin/v2/tenants',
                  source: {
                    url: 'https://10.1.83.37/admin/namespaces/${tenant}',
                    method: 'get',
                    adaptor: (payload: any, response: any, api: any) => {
                      console.log(payload);
                      console.log(response);
                      console.log(api);
                      let tmpData = [];
                      for (let i = 0; i < payload.length; i++) {
                        let tmpNs = payload[i].split('/')[1];
                        tmpData.push({ label: tmpNs, value: tmpNs });
                      }
                      return { data: { options: tmpData }, status: 0, msg: '请求成功！' };
                    }
                  }
                },
                {
                  type: 'select',
                  name: 'functionName',
                  placeholder: '选择 Function',
                  // source: 'https://10.1.83.37/admin/v2/tenants',
                  source: {
                    url: 'https://10.1.83.37/admin/functions/${tenant}/${namespace}',
                    method: 'get',
                    adaptor: (payload: any, response: any, api: any) => {
                      console.log(payload);
                      console.log(response);
                      console.log(api);
                      let tmpData = [];
                      for (let i = 0; i < payload.length; i++) {
                        let tmpFn = payload[i];
                        tmpData.push({ label: tmpFn, value: tmpFn });
                      }
                      return { data: { options: tmpData }, status: 0, msg: '请求成功！' };
                    }
                  }
                }
              ]
            },
            columns: [
              {
                name: 'id',
                label: 'ID',
                width: 200,
                sortable: true,
                type: 'text',
                toggled: true,
                remark: 'Bla bla Bla'
              },
              {
                name: 'running',
                label: '运行状态',
                width: 200,
                sortable: true,
                type: 'status',
                toggled: true,
                remark: 'Bla bla Bla'
              },
              {
                name: 'error',
                label: '错误信息',
                width: 200,
                sortable: true,
                type: 'text',
                toggled: true,
                remark: 'Bla bla Bla'
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
              config.headers['Content-Type'] = 'application/json';
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

export default Instances;
