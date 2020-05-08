import { VirtualTable } from '@synerise/ds-table';
import faker from 'faker';
import Table from '@synerise/ds-table';
import * as React from 'react';
import { SearchInput } from '@synerise/ds-search/dist/Elements';
import { withState } from '@dump247/storybook-state';
import { text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Modal from '@synerise/ds-modal';

const decorator = storyFn => <div style={{ padding: 20, width: '100vw', minWidth: '100%' }}>{storyFn()}</div>;

const dataSource = [...new Array(5000)].map((i, k) => ({
  key: k + 1,
  name: faker.name.findName(),
}));

const columns = [
  {
    title: 'User name',
    key: 'name',
    dataIndex: 'name',
  },
];

const stories = {
  default: withState({
    searchValue: '',
    selectedRows: [],
  })(({ store }) => {
    const filteredDataSource = () => {
      return !store.state.searchValue
        ? dataSource
        : dataSource.filter(record => {
            return record.name.toLowerCase().includes(store.state.searchValue.toLowerCase());
          });
    };

    const handleSelectRow = (selectedRowKeys) => {
      store.set({ selectedRows: selectedRowKeys });
    };

    return (
      <Modal size='medium' visible title={"Table"} bodyStyle={{padding: 0}}>
        <VirtualTable
          scroll={{ y: 500, x: 0 }}
          initialWidth={792}
          title={`${filteredDataSource().length} ${text('Set name of table items', 'records')}`}
          dataSource={filteredDataSource()}
          columns={columns}
          cellHeight={50}
          rowKey={row => row.key}
          selection={{
            onChange: handleSelectRow,
            selectedRowKeys: store.state.selectedRows,
            selections: [
              Table.SELECTION_ALL,
              Table.SELECTION_INVERT,
              {
                onClick: action('select_custom'),
                label: 'Select custom',
              },
            ],
          }}
          onRowClick={record => {
            store.state.selectedRows.indexOf(record.key) >= 0
              ? store.set({ selectedRows: store.state.selectedRows.filter(k => k !== record.key) })
              : store.set({ selectedRows: [...store.state.selectedRows, record.key] });
          }}
          searchComponent={
            <SearchInput
              placeholder='Search'
              clearTooltip='Clear'
              onChange={value => {
                console.log('value', value);
                store.set({searchValue: value});
              }}
              value={store.state.searchValue}
              onClear={() => {
                console.log('clear');
                store.set({ searchValue: '' });
              }}
              closeOnClickOutside={true}
            />
          }
        />
      </Modal>
    );
  }),
};

export default {
  name: 'Table|Table with virtualization',
  decorator,
  stories,
  Component: Table,
};
