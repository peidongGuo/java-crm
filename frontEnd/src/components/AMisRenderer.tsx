import * as React from 'react';
import { render as renderSchema } from 'amis';
import { Action } from 'amis/lib/types';

interface RendererProps {
  schema?: any;
  [propName: string]: any;
}

const AMisRenderer = function(props: RendererProps) {
  let env: any = null;
  const { schema, store, onAction, ...rest } = props;

  const handleAction = (e: any, action: Action) => {
    env.alert(`没有识别的动作：${JSON.stringify(action)}`);
  };

  return renderSchema(
    schema,
    {
      onAction: onAction || handleAction,
      theme: store && store.theme,
      ...rest
    },
    env
  );
};

export default AMisRenderer;
