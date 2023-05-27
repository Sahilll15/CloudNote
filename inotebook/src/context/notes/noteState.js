import React, { useState } from "react";
import NoteContext from "./noteContext";


const NoteState = (props) => {
    const host = "http://localhost:4000";


    const [notes, setNotes] = useState([]);

    const authtoken = localStorage.getItem('token')


    //getallnotes
    const getallnotes = async () => {
        //api call
        console.log(authtoken)
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",

            headers: {
                "Content-Type": "application/json",
                "auth-token": `${authtoken}`

            },



        });
        const json = await response.json();

        console.log(json)
        setNotes(json)

    };

    //add a note
    const addNote = async (title, description, tag) => {
        //api call

        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "auth-token": `${authtoken}`
            },

            body: JSON.stringify({ title, description, tag }),
        });
        const note = await response.json();
        // setNotes([...notes, note]);
        setNotes(notes.concat(note))




    };


    //delte note
    const deletenote = async (id) => {
        //APi call
        const response = await fetch(
            `${host}/api/notes/deletenote/${id}`,
            {
                method: "DELETE",

                headers: {
                    "Content-Type": "application/json",
                    "auth-token": `${authtoken}`

                },


            }
        );
        const json = response.json();
        console.log(json)

        const newNotes = notes.filter((note) => {
            return note._id !== id;
        });
        setNotes(newNotes);
    };


    //updaet note
    const editnote = async (id, title, description, tag) => {
        //Api call

        const response = await fetch(
            `${host}/api/notes/updatenote/${id}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json",
                    "auth-token": `${authtoken}`
                },

                body: JSON.stringify({ title, description, tag }),
            }
        );
        const json = await response.json();
        console.log(json)

        let newNote = JSON.parse(JSON.stringify(notes))
        //logic to edit
        for (let index = 0; index < notes.length; index++) {
            const element = newNote[index];
            if (element._id === id) {
                newNote[index].title = title;
                newNote[index].description = description;
                newNote[index].tag = tag;
                break;
            }

        } setNotes(newNote);

    };
    return (
        <NoteContext.Provider
            value={{ notes, setNotes, addNote, deletenote, editnote, getallnotes }}
        >
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
