import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import axios from "axios";

export default function Lending() {

    const dataThParent = [
        "#",
        "Time",
        "username",
        "Note",
        "Total Use",
        "Stuff",
        "Action"
        
    ]

    const [lendings, setLendings] = useState({});


    useEffect(() => {
        axios.get('http://localhost:8000/lendings', {
            headers: {
                'Authorization': 'bearer ' + localStorage.getItem('access_token'),
            }
        })
            .then(res => {
                setLendings(res.data.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const coloumDataBase = {
        "date_time": null,
        "name": null,
        "notes": null,
        "total_stuff":null,
        "stuff":'name'
        

    }

    const button = [
        "createLending",
        "delete",
        "lendingShow",

    ]

    const endpoints = {
        "createLending": "http://localhost:8000/lendings/store",
        "delete": "http://localhost:8000/lendings/delete/{id}",
        "lendingShow": "http://localhost:8000/lendings/{id}"

    }

    const coloumnDetailModalDelete = 'stuff'


    const judulModalEdit = 'Lending'

    
    const inputDataLending = {
        "date_time": {
            "type": "datetime-local",
            "options": null,

        },
        
        "name": {
            "type": "text",
            "options": null,
        },

        "notes": {
            "type": "text",
            "options": null,
        },

        "total_stuff": {
            "type": "number",
            "options": null,
        },

        "stuff_id":  {
            "type": "text",
            "options": null,
        },
       
    }




    return(
    <>
    <Navbar/>

    <div className="p-10">
                <Table dataTh={dataThParent}
                    dataTd={lendings}
                    coloumDB={coloumDataBase}
                    buttonData={button}
                    endpoints={endpoints}
                    coloumnDetail={coloumnDetailModalDelete}
                    inputDataLending={inputDataLending}
                    judulModalEdit={judulModalEdit}


                ></Table>
            </div>
    </>)
}