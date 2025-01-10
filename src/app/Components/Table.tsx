import { FC } from "react";
import { Space, Table, Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import type { TableProps } from "antd";
import { CompleteCompanyList, CompanyList } from "../types/companylist.types";

interface DataType {
  key: string;
  CompanyName: string;
  CompanyEmail: string;
  CompanyPhone: number;
  Properties: number;
  Entity: number;
  Action: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Company Name",
    dataIndex: "CompanyName",
    key: "CompanyName",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Company Email",
    dataIndex: "CompanyEmail",
    key: "CompanyEmail",
  },
  {
    title: "Company Phone",
    dataIndex: "CompanyPhone",
    key: "CompanyPhone",
  },
  {
    title: "Properties",
    dataIndex: "Properties",
    key: "Properties",
  },
  {
    title: "Entity",
    dataIndex: "Entity",
    key: "Entity",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Space size="middle">
          <Button
            type="primary"
            className="bg-blue-100 text-black hover:bg-blue-400 hover:text-black"
          >
            Access Company Portal <ArrowRightOutlined />
          </Button>
          <Button>Edit</Button>
        </Space>
      </div>
    ),
  },
];

const transformData = (companyList: CompanyList[]): DataType[] => {
  return companyList.map((company) => ({
    key: company._id,
    CompanyName: company._source.name,
    CompanyEmail: company._source.email,
    CompanyPhone: parseInt(company._source.phone),
    Properties: company._source.propertyCount,
    Entity: company._source.entityCount,
    Action: "",
  }));
};

const App: FC<{ companyList: CompleteCompanyList | undefined }> = ({
  companyList,
}) => {
  const data = companyList ? transformData(companyList.data) : [];

  return <Table<DataType> 
  columns={columns} 
  dataSource={data} 
  pagination={{ pageSize: 50 }}
  />;
};

export default App;
