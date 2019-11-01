import * as React from 'react';
import AMisRenderer from '../components/AMisRenderer';
import { History } from 'history';
import { match, Route, Switch, Redirect } from 'react-router';
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/globalContext';

interface Props {
  history?: History;
  match?: match<any>;
}
const schema = {
  type: 'form',
  submitText: '登录',
  api: 'post:/api/login',
  wrapWithPanel: false,
  messages: {
    saveSuccess: '登录成功，欢迎光临！'
  },
  controls: [
    {
      children: (props: any) => (
        <div className="list-group list-group-sm">
          {props.renderFormItems({
            controls: [
              {
                name: 'username',
                children: (props: any) => (
                  <div className="list-group-item">
                    <input
                      placeholder="用户名"
                      type="text"
                      className="form-control no-shadow no-border"
                      value={props.value || ''}
                      onChange={(e) => props.onChange(e.currentTarget.value)}
                    />
                  </div>
                )
              },
              {
                name: 'password',
                children: (props: any) => (
                  <div className="list-group-item">
                    <input
                      placeholder="密码"
                      type="password"
                      className="form-control no-shadow no-border"
                      value={props.value || ''}
                      onChange={(e) => props.onChange(e.currentTarget.value)}
                    />
                  </div>
                )
              }
            ]
          })}
        </div>
      )
    },
    {
      type: 'submit',
      label: '登录',
      size: 'lg',
      inputClassName: 'block w-full',
      level: 'primary'
    }
  ]
};

const Login = (props: Props) => {
  const globalContext = useContext(GlobalContext);

  function handleFormSaved(value: any) {
    // TODO
    // step1. 存储用户信息
    const userInfo = { admin: true, username: 'admin', token: 'asdfkljaldieflsadjfoiewoflsdfj' };
    globalContext.userAction.addUser(userInfo);
    // step2. 跳转
    props.history.replace('/admin');
  }

  useEffect(() => {
    console.log(globalContext.userInfo);
    if (globalContext.userInfo && globalContext.userInfo.admin) {
      console.log(1111);
      props.history.replace('/admin');
    }
  }, [globalContext.userInfo]);

  return (
    <div className="app app-header-fixed ">
      <div className="container w-xxl w-auto-xs">
        <a className="block m-t-xxl m-b-xl text-center text-2x">广联达项目平台数据中心</a>
        <AMisRenderer onFinished={handleFormSaved} schema={schema} />
      </div>
    </div>
  );
};

export default Login;
