import React, { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import axios from "axios";
import DashboardLayout from "../Layouts/DashboardLayout";
import Table from "../Components/Table"; // Assuming you have a Table component

const Reports = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:4000/user"); 
            setData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const headers = [
        { label: "Username", key: "name" },
        { label: "Actions", key: "actions" },
        { label: "Time of Creation", key: "createdAt" },
    ];

    const tableData = filteredData.map(item => ({
        name: item.name,
        actions: item.actions,
        time: new Date(item.createdAt).toLocaleString()
    }));

    return (
        <DashboardLayout>
            <div className="flex">
                <div className="w-full p-6">
                    <div>
                        <div className="flex relative w-full items-center pb-6">
                            <h1 className="pl-10 font-bold text-[32px] text-black">REPORTS</h1>
                            <div className="absolute right-0 pr-10">
                                <CSVLink
                                    data={filteredData}
                                    headers={headers}
                                    filename="reports.csv"
                                    className="bg-black text-white cursor-pointer font-bold py-2 px-4 rounded pt-3 pb-3"
                                >
                                    DOWNLOAD REPORT
                                </CSVLink>
                            </div>
                        </div>
                        <div className="pl-10 mb-6">
                            <input
                                type="text"
                                placeholder="Search here..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="pl-4 h-9 w-64 border-[1px] rounded-md border-[#9C9C9C] outline-none"
                            />
                        </div>
                        <Table
                            columns={["Name", "Actions", "Time"]}
                            data={tableData}
                            showEditAction={false}
                        />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Reports;