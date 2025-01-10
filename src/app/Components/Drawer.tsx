"use client";
import React, { useState, FC, useEffect } from "react";
import type { DrawerProps } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { Select, Button, Drawer, DatePicker, Checkbox } from "antd";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { StateType } from "../types/States.type";
import { ZipcodeTypes } from "../types/zipcode.types";

type DrawProps = {
  title?: string;
  onClose: () => void;
  handleStatesChange?: (newValue: string[]) => void;
  setOpen?: (value: boolean) => void;
  open: boolean;
  initialStates: string[];
  initialZipCodes: string[];
  handleZipCodesChange?: (newValue: string[]) => void;
};

const DrawerApp: FC<DrawProps> = ({
  title,
  onClose,
  handleStatesChange,
  setOpen,
  open,
  initialStates,
  initialZipCodes,
  handleZipCodesChange,
}) => {
  const [placement, setPlacement] = useState<DrawerProps["placement"]>("right");
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [selectedZipCodes, setSelectedZipCodes] = useState<string[]>([]);

  useEffect(() => {
    setSelectedStates(initialStates.filter((state) => state));
  }, [initialStates]);

  useEffect(() => {
    setSelectedZipCodes(initialZipCodes.filter((zip) => zip));
  }, [initialZipCodes]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const statesFromUrl = urlParams.get("state");
    if (statesFromUrl) {
      setSelectedStates(statesFromUrl.split(",").filter((state) => state));
    }
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const zipCodesFromUrl = urlParams.get("zipCode");
    if (zipCodesFromUrl) {
      setSelectedZipCodes(zipCodesFromUrl.split(",").filter((zip) => zip));
    }
  }, []);

  const handleClose = () => {
    setOpen && setOpen(false);
    onClose();
  };

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvQGVtYWlsLmNvbSIsInVzZXJJZCI6IjI3NmViM2EzLTc3YjEtNDQ5Ny1hN2M1LTA5Y2UyYmE4N2RjYyIsImNvbXBhbnkiOm51bGwsInNjb3BlcyI6WyJ2aWV3X3NlY3VyZV9kYXRhIiwibWFpbnRhaW5fc2VjdXJlX2RhdGEiLCJ2aWV3X2NvbXBhbmllc19hbmRfZW50aXRpZXMiLCJtYWludGFpbl9jb21wYW5pZXNfYW5kX2VudGl0aWVzIiwidmlld19jdXN0b21lcnMiLCJhZGRfY3VzdG9tZXIiLCJkZWFjdGl2YXRlX2N1c3RvbWVyIiwidmlld19ncm91cHMiLCJtYWludGFpbl9ncm91cHMiLCJ2aWV3X2NoYXJnZXJfYWNjZXNzIiwibWFpbnRhaW5fY2hhcmdlcl9hY2Nlc3MiLCJ2aWV3X3Byb3BlcnRpZXMiLCJlZGl0X3Byb3BlcnR5X2RhdGEiLCJkZWFjdGl2YXRlX3Byb3BlcnR5Iiwidmlld19hY2NvdW50cyIsIm1haW50YWluX2FjY291bnRzIiwicGF5X2ludm9pY2VzIiwidmlld19sb2NhdGlvbnMiLCJlZGl0X2xvY2F0aW9uX2RhdGEiLCJkZWFjdGl2YXRlX2xvY2F0aW9uIiwidmlld19jaGFyZ2VycyIsImVkaXRfY2hhcmdlcl9kYXRhIiwiZGVhY3RpdmF0ZV9jaGFyZ2VyIiwidmlld19mZWVfc3RydWN0dXJlIiwiZWRpdF9mZWVfc3RydWN0dXJlIiwiZGVsZXRlX2ZlZV9zdHJ1Y3R1cmUiLCJ2aWV3X3Byb3BlcnR5X3VzZXJzIiwibWFpbnRhaW5fcHJvcGVydHlfdXNlcnMiLCJ2aWV3X3Byb3ZpZGVycyIsIm1haW50YWluX3Byb3ZpZGVycyIsInZpZXdfd29ya19vcmRlcnMiLCJtYWludGFpbl93b3JrX29yZGVycyIsInByb3BlcnR5X3BvcnRhbF9hY2Nlc3MiLCJ2aWV3X3JlcG9ydHMiLCJtYWludGFpbl9hZHMiXSwiaWF0IjoxNzM0NDI5NDU2LCJleHAiOjE3MzUwMzQyNTZ9.9t_G4s-vXzBEXrzjlkej-EK7D9qhf-wUqKTR1t_NPpc";

  const getStates = async () => {
    const response = await axios.get(
      `https://test-api.chargeonsite.com/company/states`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data as StateType;
  };

  const { data: states, isLoading: stateLoad } = useQuery<
    StateType,
    any,
    StateType
  >({
    queryKey: ["states"],
    queryFn: () => getStates(),
    enabled: true,
  });

  const getZips = async () => {
    const response = await axios.get(
      `https://test-api.chargeonsite.com/company/zips`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // console.log(response.data);
    return response.data as ZipcodeTypes;
  };

  const { data: zips, isLoading: zipcodes } = useQuery<
    ZipcodeTypes,
    any,
    ZipcodeTypes
  >({
    queryKey: ["zips"],
    queryFn: () => getZips(),
    enabled: true,
  });

  console.log(states);

  return (
    <Drawer
      title={
        <span style={{ fontSize: "24px", fontWeight: "bold" }}>
          {title || "Drawer with extra actions"}
        </span>
      }
      placement={placement}
      width={780}
      onClose={handleClose}
      open={open}
      closeIcon={null}
      extra={
        <Button
          className="text-slate-400 hover:text-black hover:!bg-white "
          type="text"
          icon={<CloseOutlined />}
          onClick={handleClose}
        />
      }
      footer={
        <div className="drawer-footer mt-2">
          <Button
            className="DrawerBtn w-[120px] h-[40px]"
            onClick={() => {
              setSelectedStates([]);
              setSelectedZipCodes([]);
              const urlParams = new URLSearchParams(window.location.search);
              urlParams.delete("state");
              urlParams.delete("page");
              urlParams.delete("pageSize");
              urlParams.delete("zipCode");
              setOpen && setOpen(false);
              window.history.replaceState(null, "", `?${urlParams.toString()}`);
            }}
          >
            Reset All
          </Button>
          <Button
            className="ApplyBtn w-[120px] h-[40px]"
            type="primary"
            onClick={() => {
              handleStatesChange && handleStatesChange(selectedStates);
              handleZipCodesChange && handleZipCodesChange(selectedZipCodes);
              setOpen && setOpen(false);
              const urlParams = new URLSearchParams(window.location.search);
              urlParams.set("state", selectedStates.join(","));
              urlParams.set("zipCode", selectedZipCodes.join(","));
              window.history.replaceState(null, "", `?${urlParams.toString()}`);
            }}
          >
            Apply
          </Button>
        </div>
      }
    >
      <div className="drawer-content w-full pr-8">
        <h1 className="text-xl text-primary font-bold mt-4 mb-3">
          Company Info
        </h1>
        <div className="bg-white">
          <div>
            <div className="flex gap-x-[105px] pt-6 w-full justify-center items-center">
              <h1 className="ml-4 text-nowrap">State</h1>
              <Select
                id="State"
                mode="multiple"
                placeholder="Select"
                value={selectedStates.length ? selectedStates : undefined}
                className="mr-4"
                style={{ width: "100%", maxWidth: "580px" }}
                onChange={(value) => setSelectedStates(value)}
              >
                {states?.map((state: string) => (
                  <Select.Option key={state} value={state}>
                    {state}
                  </Select.Option>
                ))}
              </Select>
            </div>
            <div className="flex gap-x-[80px] pt-4 w-full justify-center items-center">
              <h1 className="ml-4 text-nowrap">Zip Code</h1>
              <Select
                id="ZipCode"
                mode="multiple"
                placeholder="Select"
                value={selectedZipCodes.length ? selectedZipCodes : undefined}
                className="mr-4"
                style={{ width: "100%", maxWidth: "580px" }}
                onChange={(value) => setSelectedZipCodes(value)}
              >
                {zips?.map((zip: string) => (
                  <Select.Option key={zip} value={zip}>
                    {zip}
                  </Select.Option>
                ))}
              </Select>
            </div>
            <div className="flex gap-x-[55px] pt-4 pb-5 w-full justify-center items-center">
              <h1 className="ml-4 text-nowrap">Created Date</h1>
              <DatePicker.RangePicker
                style={{ width: "100%", maxWidth: "580px" }}
                className="mr-4"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-x-[40px]">
          <div className="w-full max-w-[300px]">
            <h1 className="text-xl text-primary font-bold mt-4 mb-3">
              Company Status
            </h1>
            <div className=" bg-white w-full max-w-[300px]">
              <div className="flex flex-col justify-center items-start pl-4 py-4">
                <Checkbox className="text-sm mb-2">
                  Include deactivated companies
                </Checkbox>
                <Checkbox disabled className="text-sm mb-2">
                  Show companies with no properties
                </Checkbox>
                <Checkbox disabled className="text-sm">
                  Show companies with no entities
                </Checkbox>
              </div>
            </div>
          </div>
          <div className="w-full max-w-[340px]">
            <h1 className="text-xl text-primary font-bold mt-4 mb-3 text-nowrap">
              Admin Status
            </h1>
            <div className="bg-white w-full max-w-[340px]">
              <div className="flex flex-col justify-center items-start pl-4 py-4">
                <Checkbox disabled className="text-nowrap text-sm">
                  how companies with active admins only
                </Checkbox>
                <Checkbox disabled className="CustomCheckbox text-sm">
                  Show companies with not signed up admins only
                </Checkbox>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-x-[40px]">
          <div className="w-full max-w-[300px]">
            <h1 className="text-xl text-primary font-bold mt-8 mb-3">
              Brand Logo
            </h1>
            <div className=" bg-white w-full max-w-[300px]">
              <div className="flex flex-col justify-center items-start pl-4 py-4">
                <Checkbox disabled className="text-sm mb-2">
                  Show companies with logo
                </Checkbox>
                <Checkbox disabled className="text-sm mb-8">
                  Show companies with no logo
                </Checkbox>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default DrawerApp;
