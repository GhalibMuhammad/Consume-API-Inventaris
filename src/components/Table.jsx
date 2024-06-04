import React, { useState } from "react";
import ModalDelete from "./ModalDelete";
import ModalEdit from "./ModalEdit";
import ModalAdd from "./ModalAdd";
import ModalLendingAdd from "./ModalLendingAdd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Table({ dataTh, dataTd, coloumDB, buttonData, endpoints, coloumnDetail, judulModalEdit, inputData, inputDataLending }) {
    const [endpointsReplaced, setEndpointsReplaced] = useState({});
    const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
    const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
    const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);
    const [isOpenModalLendingAdd, setIsOpenModalLendingAdd] = useState(false);

    const navigate = useNavigate();

    function handleModalEdit(id) {
        const detailReplaced = endpoints.detail.replace('{id}', id);
        const updateReplaced = endpoints.update.replace('{id}', id);
        setEndpointsReplaced({ detail: detailReplaced, update: updateReplaced });
        setIsOpenModalEdit(true);
    }

    function handleModalDelete(id) {
        const detailReplaced = endpoints.detail.replace('{id}', id);
        const deleteReplaced = endpoints.delete.replace('{id}', id);
        setEndpointsReplaced({ detail: detailReplaced, delete: deleteReplaced });
        setIsOpenModalDelete(true);
    }

    function handleModalAdd() {
        setEndpointsReplaced({ create: endpoints.create });
        setIsOpenModalAdd(true);
    }

    function handleModalLendingAdd() {
        setEndpointsReplaced({ createLending: endpoints.createLending });
        setIsOpenModalLendingAdd(true);
    }

    function handleRestore(id) {
        const endpointRestore = endpoints.restore.replace("{id}", id);
        axios.get(endpointRestore, {
            headers: { 'Authorization': 'bearer ' + localStorage.getItem('access_token') }
        })
        .then(() => navigate('/stuff'))
        .catch(err => console.log(err));
    }

    function handlePermanentDelete(id) {
        const endpointPermanentDelete = endpoints['permanent-delete'].replace("{id}", id);
        axios.get(endpointPermanentDelete, {
            headers: { 'Authorization': 'bearer ' + localStorage.getItem('access_token') }
        })
        .then(() => window.location.reload())
        .catch(err => console.log(err));
    }

    function handleShow(id) {
        const endpointShow = endpoints.show.replace("{id}", id);
        axios.get(endpointShow, {
            headers: { 'Authorization': 'bearer ' + localStorage.getItem('access_token') }
        })
        .then(() => window.location.reload())
        .catch(err => console.log(err));
    }

    return (
        <>
            <div className="mt-20 relative overflow-x-auto shadow-md sm:rounded-lg px-20 py-10">
                <div className="flex justify-end mb-5">
                    {buttonData.includes("stuff") && (
                        <Link to="/stuff" className="ml-3 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900">
                            Stuff
                        </Link>
                    )}
                    {buttonData.includes("create") && (
                        <button onClick={handleModalAdd} type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                            Create
                        </button>
                    )}
                    {buttonData.includes("trash") && (
                        <Link to="/stuff/trash" className="ml-3 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                            Trash
                        </Link>
                    )}
                    {buttonData.includes("createLending") && (
                        <button onClick={handleModalLendingAdd} type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                            Create Lending
                        </button>
                    )}
                </div>

                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {dataTh.map((data, index) => (
                                <th key={index} scope="col" className="px-6 py-3">{data}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(dataTd).map(([index, value]) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-7 py-3">{parseInt(index) + 1}.</td>
                                {Object.entries(coloumDB).map(([i, v]) => (
                                    <td key={i} className="px-7 py-3">{!v ? value[i] : value[i.replace(/[!@#$%^&]/, "")] ? value[i.replace(/[!@#$%^&]/, "")][v] : "0"}</td>
                                ))}
                                <td className="px-7 py-3">
                                    {buttonData.includes("edit") && (
                                        <a onClick={() => handleModalEdit(value.id)} href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                            Edit
                                        </a>
                                    )}
                                    {buttonData.includes("delete") && (
                                        <a onClick={() => handleModalDelete(value.id)} href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline ml-3">
                                            Delete
                                        </a>
                                    )}
                                    {buttonData.includes("restore") && (
                                        <a onClick={() => handleRestore(value.id)} href="#" className="font-medium text-green-600 dark:text-green-500 hover:underline">
                                            Restore
                                        </a>
                                    )}
                                    {buttonData.includes("permanent-delete") && (
                                        <a onClick={() => handlePermanentDelete(value.id)} href="#" className="ml-2 font-medium text-red-600 dark:text-red-500 hover:underline">
                                            Permanent Delete
                                        </a>
                                    )}
                                   
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ModalDelete isOpen={isOpenModalDelete} closeModal={() => setIsOpenModalDelete(false)} endpoints={endpointsReplaced} coloumnDetail={coloumnDetail} />
            <ModalEdit isOpen={isOpenModalEdit} closeModal={() => setIsOpenModalEdit(false)} judulModal={judulModalEdit} inputData={inputData} endpoints={endpointsReplaced} />
            <ModalAdd isOpen={isOpenModalAdd} closeModal={() => setIsOpenModalAdd(false)} judulModal={judulModalEdit} inputData={inputData} endpoints={endpoints} />
            <ModalLendingAdd isOpen={isOpenModalLendingAdd} closeModal={() => setIsOpenModalLendingAdd(false)} judulModal={judulModalEdit} inputDataLending={inputDataLending} endpoints={endpoints} />
        </>
    );
}
