import { Grid } from '@arco-design/web-react';
import React from 'react';
import { useControlledObjectState } from '../../hooks/useObjectState';
import type { FieldHandler } from '../fields';

interface ListFilterProps {
  fields: FieldHandler[];
  filterValues: Record<string, any>;
  onChangeFilter: (values: Record<string, any>) => void;
}
export const ListFilter: React.FC<ListFilterProps> = React.memo((props) => {
  const [filterValues, setFilterValues] = useControlledObjectState<
    Record<string, any>
  >(props.filterValues, props.onChangeFilter);

  return (
    <div>
      <Grid cols={3} colGap={12} rowGap={16}>
        {props.fields.map((fieldHandler, i) => {
          const c = fieldHandler('edit');

          return (
            <Grid.GridItem key={i}>
              <div>{c.title}</div>
              <div>
                {c.render(filterValues[c.source], (val) =>
                  setFilterValues({ [c.source]: val })
                )}
              </div>
            </Grid.GridItem>
          );
        })}
      </Grid>
    </div>
  );
});
ListFilter.displayName = 'ListFilter';
