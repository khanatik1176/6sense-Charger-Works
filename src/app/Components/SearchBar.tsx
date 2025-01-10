"use client";
import {ChangeEvent} from 'react';
import { Input, Space } from 'antd';
import type { GetProps } from 'antd';

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const SearchBar: React.FC<{ value: string; onSearch: (value: string) => void; onChange: (e: ChangeEvent<HTMLInputElement>) => void }> = ({ value, onSearch, onChange }) => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <Search
      placeholder="Search by name, email or phone no"
      allowClear
      enterButton="Search"
      value={value}
      onSearch={onSearch}
      onChange={onChange}
      size="large"
      style={{ width: '100%', maxWidth: '600px' }}
      className='custom-search'
    />
  </Space>
);

export default SearchBar;