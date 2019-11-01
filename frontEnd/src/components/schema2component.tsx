import * as React from 'react';
import { Schema } from 'amis/lib/types';
import AMisRenderer from './AMisRenderer';

export default function(schema: Schema) {
  return (props: any) => {
    return <AMisRenderer schema={schema} {...props} />;
  };
}
