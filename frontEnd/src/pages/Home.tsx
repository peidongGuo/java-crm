import * as React from 'react';
import { RouteComponentProps, Route, Link, Switch, Redirect, matchPath, match } from 'react-router-dom';
import { Layout, Button, AsideNav } from 'amis';
import UserInfo from '../components/UserInfo';
import { mapTree } from 'amis/lib/utils/helper';
import Dashboard from './Dashboard';
import BasicForm from './form/BasicForm';
import AdvancedForm from './form/AdvancedForm';
import CustomIndex from './customer/CustomIndex';
import { GlobalContext } from '../context/globalContext';
import { useContext } from 'react';
import WizardForm from './form/WizardForm';
import { History } from 'history';
import Namespaces from './Namespaces';
import Functions from './Functions';
import Instances from './Instances';

type NavItem = {
  label: string;
  children?: Array<NavItem>;
  icon?: string;
  path?: string;
  component?: React.ReactType;
  getComponent?: () => Promise<React.ReactType>;
};
const navigations: Array<NavItem> = [
  {
    label: '导航',
    children: [
      {
        path: 'tenants',
        label: 'Tenants',
        icon: 'glyphicon glyphicon-signal',
        component: Dashboard
      },
      {
        path: 'namespaces',
        label: 'Namespaces',
        icon: 'glyphicon glyphicon-signal',
        component: Namespaces
      },
      {
        path: 'functions',
        label: 'Functions',
        icon: 'glyphicon glyphicon-signal',
        component: Functions
      },
      {
        path: 'instances',
        label: 'Instances',
        icon: 'glyphicon glyphicon-signal',
        component: Instances
      },
      {
        label: '表单页面',
        icon: 'glyphicon glyphicon-edit',
        children: [
          {
            label: '常规表单',
            path: 'form/basic',
            component: BasicForm,
            children: [
              {
                label: '三级目录测试',
                path: 'form/basic/advanced',
                component: AdvancedForm
              }
            ]
          },

          {
            label: '复杂表单',
            path: 'form/advanced',
            component: AdvancedForm
          },

          {
            label: '向导',
            path: 'form/wizard',
            component: WizardForm
          }
        ]
      },

      {
        label: '会员管理',
        children: [
          {
            label: '列表',
            path: 'customer/index',
            component: CustomIndex
          }
        ]
      }
    ]
  }
];

function navigations2route() {
  let routes: Array<JSX.Element> = [];

  navigations.forEach((root) => {
    root.children &&
      mapTree(root.children, (item: any) => {
        if (item.path && item.component) {
          routes.push(
            <Route
              key={routes.length + 1}
              path={item.path[0] === '/' ? item.path : `/${item.path}`}
              component={item.component}
              exact
            />
          );
        } else if (item.path && item.getComponent) {
          routes.push(
            <Route
              key={routes.length + 1}
              path={item.path[0] === '/' ? item.path : `/${item.path}`}
              getComponent={item.getComponent}
              exact
            />
          );
        }
        return item;
      });
  });

  return routes;
}

function isActive(link: any, location: any) {
  const ret = matchPath(location.pathname, {
    path: link ? link.replace(/\?.*$/, '') : '',
    exact: true,
    strict: true
  });

  return !!ret;
}

interface Injection {
  history?: History;
  match?: match<any>;
}

interface Props extends Injection {}

const Home = function(props: Props) {
  const globalContext = useContext(GlobalContext);

  function tooltip() {}

  function renderHeader() {
    return (
      <div>
        <div className={`a-Layout-brandBar`}>
          <button onClick={globalContext.layoutAction.toggleOffScreen} className="pull-right visible-xs">
            <i className="glyphicon glyphicon-align-justify"></i>
          </button>
          <div className={`a-Layout-brand`}>
            <i className="fa fa-paw"></i>
            <span className="hidden-folded m-l-sm">AMis Boilerplate</span>
          </div>
        </div>
        <div className={`a-Layout-headerBar`}>
          <div className="nav navbar-nav hidden-xs">
            {/* <Button
              level="link"
              className="no-shadow navbar-btn"
              onClick={globalContext.layoutAction.toggleAsideFolded}
              tooltip="展开或收起侧边栏"
              placement="bottom"
              iconOnly
            >
              <i className={globalContext.asideFolded ? 'fa fa-indent' : 'fa fa-dedent'} />
            </Button> */}
          </div>

          <div className="hidden-xs p-t-sm pull-right">{/* <UserInfo user={globalContext.userInfo} /> */}</div>
        </div>
      </div>
    );
  }

  function renderAside() {
    const location = props.match;

    return (
      <AsideNav
        key={globalContext.asideFolded ? 'folded-aside' : 'aside'}
        navigations={navigations as any}
        renderLink={({ link, toggleExpand, classnames: cx, depth }: any) => {
          if (link.hidden) {
            return null;
          }

          let children = [];

          if (link.children) {
            children.push(
              <span
                key="expand-toggle"
                className={cx('AsideNav-itemArrow')}
                onClick={(e) => toggleExpand(link, e)}
              ></span>
            );
          }

          link.badge &&
            children.push(
              <b key="badge" className={cx(`AsideNav-itemBadge`, link.badgeClassName || 'bg-info')}>
                {link.badge}
              </b>
            );

          if (link.icon) {
            children.push(<i key="icon" className={cx(`AsideNav-itemIcon`, link.icon)} />);
          } else if (globalContext.asideFolded && depth === 1) {
            children.push(
              <i key="icon" className={cx(`AsideNav-itemIcon`, link.children ? 'fa fa-folder' : 'fa fa-info')} />
            );
          }

          children.push(
            <span key="label" className={cx('AsideNav-itemLabel')}>
              {link.label}
            </span>
          );

          return link.path ? (
            link.active ? (
              <a>{children}</a>
            ) : (
              <Link to={link.path[0] === '/' ? link.path : `${link.path}`}>{children}</Link>
            )
          ) : (
            <a onClick={link.onClick ? link.onClick : link.children ? () => toggleExpand(link) : undefined}>
              {children}
            </a>
          );
        }}
        isActive={(link: any) => isActive(link.path && link.path[0] === '/' ? link.path : `${link.path}`, location)}
      />
    );
  }

  return (
    <Layout
      aside={renderAside()}
      header={renderHeader()}
      folded={globalContext.asideFolded}
      offScreen={globalContext.offScreen}
    >
      <Switch>
        <Redirect to={`/dashboard`} from={`/`} exact />
        {navigations2route()}
        <Redirect to={`/404`} />
      </Switch>
    </Layout>
  );
};

export default Home;
