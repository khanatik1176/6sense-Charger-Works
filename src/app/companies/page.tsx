"use client";
import { ChangeEvent } from "react";
import Link from "next/link";
import SearchBar from "../Components/SearchBar";
import { Button } from "antd";
import { FileSearchOutlined } from "@ant-design/icons";
import Table from "../Components/Table";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { CompleteCompanyList } from "../types/companylist.types";
import DrawerApp from "../Components/Drawer";
import { Tag } from "antd";

export default function Dashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchText, setSearchText] = useState<string>(
    searchParams.get("search") || ""
  );
  const [searching, setSearching] = useState<string | null>(
    searchParams.get("search") || ""
  );
  const [page, setPage] = useState<number>(
    parseInt(searchParams.get("page") || "1")
  );
  const pageItem = 50;

  const [filterTrigger, setFilterTrigger] = useState<boolean>(false);

  const [states, setStates] = useState<string[]>(
    searchParams.get("state")?.split(",") || []
  );

  const [zipCodes, setZipCodes] = useState<string[]>(
    searchParams.get("zipCode")?.split(",") || []
  );

  const [open, setOpen] = useState<boolean>(false);

  const handleAdvFilter = () => {
    setFilterTrigger(true);
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setFilterTrigger(false);
  };

  const handleStatesChange = (states: string[]) => {
    setStates(states);
    setPage(1);
    router.push(
      `/companies?pageSize=${pageItem}&page=1&state=${states.join(",")}`
    );
  };

  const handleZipCodeChange = (zipCodes: string[]) => {
    setZipCodes(zipCodes);
    setPage(1);
    router.push(
      `/companies?pageSize=${pageItem}&page=1&state=${states.join(",")}&zipCode=${zipCodes.join(",")}`
    );
  };

  console.log(zipCodes);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvQGVtYWlsLmNvbSIsInVzZXJJZCI6IjI3NmViM2EzLTc3YjEtNDQ5Ny1hN2M1LTA5Y2UyYmE4N2RjYyIsImNvbXBhbnkiOm51bGwsInNjb3BlcyI6WyJ2aWV3X3NlY3VyZV9kYXRhIiwibWFpbnRhaW5fc2VjdXJlX2RhdGEiLCJ2aWV3X2NvbXBhbmllc19hbmRfZW50aXRpZXMiLCJtYWludGFpbl9jb21wYW5pZXNfYW5kX2VudGl0aWVzIiwidmlld19jdXN0b21lcnMiLCJhZGRfY3VzdG9tZXIiLCJkZWFjdGl2YXRlX2N1c3RvbWVyIiwidmlld19ncm91cHMiLCJtYWludGFpbl9ncm91cHMiLCJ2aWV3X2NoYXJnZXJfYWNjZXNzIiwibWFpbnRhaW5fY2hhcmdlcl9hY2Nlc3MiLCJ2aWV3X3Byb3BlcnRpZXMiLCJlZGl0X3Byb3BlcnR5X2RhdGEiLCJkZWFjdGl2YXRlX3Byb3BlcnR5Iiwidmlld19hY2NvdW50cyIsIm1haW50YWluX2FjY291bnRzIiwicGF5X2ludm9pY2VzIiwidmlld19sb2NhdGlvbnMiLCJlZGl0X2xvY2F0aW9uX2RhdGEiLCJkZWFjdGl2YXRlX2xvY2F0aW9uIiwidmlld19jaGFyZ2VycyIsImVkaXRfY2hhcmdlcl9kYXRhIiwiZGVhY3RpdmF0ZV9jaGFyZ2VyIiwidmlld19mZWVfc3RydWN0dXJlIiwiZWRpdF9mZWVfc3RydWN0dXJlIiwiZGVsZXRlX2ZlZV9zdHJ1Y3R1cmUiLCJ2aWV3X3Byb3BlcnR5X3VzZXJzIiwibWFpbnRhaW5fcHJvcGVydHlfdXNlcnMiLCJ2aWV3X3Byb3ZpZGVycyIsIm1haW50YWluX3Byb3ZpZGVycyIsInZpZXdfd29ya19vcmRlcnMiLCJtYWludGFpbl93b3JrX29yZGVycyIsInByb3BlcnR5X3BvcnRhbF9hY2Nlc3MiLCJ2aWV3X3JlcG9ydHMiLCJtYWludGFpbl9hZHMiXSwiaWF0IjoxNzM0NDI5NDU2LCJleHAiOjE3MzUwMzQyNTZ9.9t_G4s-vXzBEXrzjlkej-EK7D9qhf-wUqKTR1t_NPpc";

  const getCompany = async (page: number) => {
    const response = await axios.get(
      `https://test-api.chargeonsite.com/company?pageSize=${pageItem}&current=${page}&search=${searching}&state=${states.join(
        ","
      )}&zip=${zipCodes.join(",")}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);

    return response.data as CompleteCompanyList;
  };

  const { data: companyList, isLoading } = useQuery<
    CompleteCompanyList,
    any,
    CompleteCompanyList
  >({
    queryKey: ["companyList", searching, page, states, zipCodes],
    queryFn: () => getCompany(page),
    enabled: true,
  });

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    router.push(`/companies`);
  };

  const handleSearch = (data: string) => {
    setSearching(data);
    router.push(`/companies?search=${data}&page=${page}`);
  };

  const handleCloseALL = () => {
    setStates([]);
    setZipCodes([]);
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.delete("state");
    urlParams.delete("zipCode");
    window.history.replaceState(null, "", `?${urlParams.toString()}`);
  };


  return (
    <div className="bg-white pl-28 pt-0">
      <div className="mt-16 lg:mt-5 lg:ml-5">
        <h1 className="text-base font-bold text-uppersubheading flex items-center">
          <Link href="/products" className="text-gray-400 font-medium">
            Home
          </Link>
          <span className="ml-1 text-gray-400">/</span>
          <Link
            href={`/products/${1}/details`}
            className="ml-1 text-gray-400 font-medium"
          >
            Company
          </Link>
          <span className="ml-1 text-gray-400">/</span>
          <Link
            href={`http://localhost:3000/products/${1}/details/RatesHistory`}
            className="ml-1 text-black font-medium"
          >
            Company Management
          </Link>
        </h1>
      </div>

      <div>
        <div className="border-t-2 px-10 flex justify-between">
          <div>
            <h1 className="text-primary text-4xl mt-2 font-bold">
              Company Management
            </h1>
            <div className="w-full max-w-[800px] mt-4">
              <SearchBar
                value={searchText}
                onSearch={handleSearch}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          <div className="flex flex-col gap-y-5 mt-5">
            <div>
              <Button className="bg-primary text-white hover:text-primary hover:border-primary">
                {" "}
                Create new Company{" "}
              </Button>
            </div>
            <div>
              <Button
                className="bg-white text-black hover:text-primary hover:border-primary"
                icon={<FileSearchOutlined />}
                onClick={handleAdvFilter}
              >
                Add Advance Filter
              </Button>
            </div>
          </div>
          {filterTrigger ? (
            <DrawerApp
              title="Advanced Filter"
              onClose={handleDrawerClose}
              handleStatesChange={handleStatesChange}
              setOpen={setOpen}
              open={open}
              initialStates={states}
              initialZipCodes={zipCodes}
              handleZipCodesChange={handleZipCodeChange}
            />
          ) : null}
        </div>
        <div className="flex">
          <p className="text-gray-400 text-sm ml-10 mt-4 mb-4 mr-5">
            Showing Companies: {companyList?.data.length || 0}
          </p>
          {states
            .filter((state) => state)
            .map((state) => (
              <span className="flex justify-center items-center" key={state}>
                <Tag
                  className="text-nowrap"
                  closable
                  onClose={() => {
                    const newStates = states.filter((s) => s !== state);
                    setStates(newStates);
                    const urlParams = new URLSearchParams(
                      window.location.search
                    );
                    urlParams.set("state", newStates.join(","));
                    window.history.replaceState(
                      null,
                      "",
                      `?${urlParams.toString()}`
                    );
                  }}
                >
                  {state}
                </Tag>
              </span>
            ))}

          {zipCodes
            .filter((zip) => zip)
            .map((zip) => (
              <span className="flex justify-center items-center" key={zip}>
                <Tag
                  className="text-nowrap"
                  closable
                  onClose={() => {
                    const newZipCodes = zipCodes.filter((s) => s !== zip);
                    setZipCodes(newZipCodes);
                    const urlParams = new URLSearchParams(
                      window.location.search
                    );
                    urlParams.set("zipCode", newZipCodes.join(","));
                    window.history.replaceState(
                      null,
                      "",
                      `?${urlParams.toString()}`
                    );
                  }}
                >
                  {zip}
                </Tag>
              </span>
            ))}

          {(states.filter((state) => state).length > 0 ||
            zipCodes.filter((zip) => zip).length > 0) && (
            <span
              className="flex justify-center items-center cursor-pointer"
              onClick={handleCloseALL}
            >
              <Tag closable onClose={handleCloseALL}>
                Clear All
              </Tag>
            </span>
          )}
        </div>
        <div className="px-10 overflow-x-auto">
          <Table companyList={companyList} />
        </div>
      </div>
    </div>
  );
}
