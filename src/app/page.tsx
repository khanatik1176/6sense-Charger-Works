"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { Input, Select, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

export default function Home() {
  const [name, setName] = useState<string>("");
  const [nationality, setNationality] = useState<string>("");

  const handleNationatily = (value: string) => {
    setNationality(value);
  };

  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      name,
      nationality,
    };

    console.log(data);
  };

  return (
    <div className="bg-white px-40">
      <div className="flex justify-center items-center mt-[100px]">
        <form onSubmit={handleFormSubmit}>
          <div className="max-w-[400px] bg-gray-400 px-10 py-10 relative border rounded-xl">
            <div className="relative">
              <label htmlFor="">First Name</label>
              <Input placeholder="first name" className="pl-8 max-w-80" onChange={handleName} />
              <UserOutlined className="absolute top-[30px] left-2 z-50 flex justify-start" />
            </div>
            <div className="flex flex-col mt-4">
              <label htmlFor="">Nationality</label>
              <Select placeholder="Choose a nationality" onChange={(value) => handleNationatily(value)}>
                <Select.Option value="American">American</Select.Option>
                <Select.Option value="Bangladeshi">Bangladeshi</Select.Option>
                <Select.Option value="Pakistani">Pakistani</Select.Option>
                <Select.Option value="Indian">Indian</Select.Option>
                <Select.Option value="Danish">Danish</Select.Option>
                <Select.Option value="British">British</Select.Option>
                <Select.Option value="African">African</Select.Option>
              </Select>
            </div>
            <div className="flex justify-center">
              <Button type="primary" className="mt-10 w-[180px]">
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}