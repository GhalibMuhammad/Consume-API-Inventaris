// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function ModalLendingShow({ isOpen, closeModal, judulModal, inputData, endpoints }) {
//     const [dataDetail, setDataDetail] = useState({});

//     useEffect(() => {
//         if (isOpen) {
//             axios.get(endpoints['detail'], {
//                 headers: {
//                     'Authorization': 'bearer ' + localStorage.getItem('access_token'),
//                 }
//             })
//                 .then(res => {
//                     setDataDetail(res.data.data);
//                 })
//                 .catch(err => {
//                     console.log(err);
//                 });
//         }
//     }, [isOpen, endpoints['detail']]);

//     if (!isOpen) {
//         return null;
//     }

//     return (
//         <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
//             <div className="relative p-4 w-full max-w-md max-h-full">
//                 <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
//                     <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
//                         <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
//                             Show Data {judulModal}
//                         </h3>
//                         <button onClick={closeModal} type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
//                             <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
//                                 <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l6 6m0 0l6 6M7 7L1 1m6 6l6-6" />
//                             </svg>
//                             <span className="sr-only">Close modal</span>
//                         </button>
//                     </div>
//                     <div className="p-4 md:p-5">
//                         <form className="space-y-4">
//                             {
//                                 Object.entries(inputData).map(([index, item]) => (
//                                     <div key={index} className="mb-6">
//                                         {
//                                             item.type === "select" ? (
//                                                 <div>
//                                                     <label htmlFor={index} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{index}</label>
//                                                     <select id={index} name={index} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={dataDetail[index]} disabled>
//                                                         <option hidden>Select {index}</option>
//                                                         {
//                                                             item.option.map((opt, idx) => (
//                                                                 <option key={idx} value={opt}>{opt}</option>
//                                                             ))
//                                                         }
//                                                     </select>
//                                                 </div>
//                                             ) : (
//                                                 <div>
//                                                     <label htmlFor={index} className="block text-sm font-medium text-gray-900 dark:text-white capitalize mb-3">{index}</label>
//                                                     <input type={item.type} name={index} id={index} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={dataDetail[index]} disabled />
//                                                 </div>
//                                             )
//                                         }
//                                     </div>
//                                 ))
//                             }
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
