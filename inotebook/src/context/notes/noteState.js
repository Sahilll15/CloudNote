import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const notesinitial = [

        {
            "_id": "646f46741727023b53a7da13",
            "user": "646f411a183e43a38c2c2bde",
            "title": "chikitsa",
            "description": "new desc",
            "tag": "description",
            "__v": 0
        },
        {
            "_id": "646f46741727023b53a7da13",
            "user": "646f411a183e43a38c2c2bde",
            "title": "chikitsa",
            "description": "new desc",
            "tag": "description",
            "__v": 0
        },
        {
            "_id": "646f46741727023b53a7da13",
            "user": "646f411a183e43a38c2c2bde",
            "title": "chikitsa",
            "description": "new desc",
            "tag": "description",
            "__v": 0
        },
        {
            "_id": "646f46741727023b53a7da13",
            "user": "646f411a183e43a38c2c2bde",
            "title": "chikitsa",
            "description": "new desc",
            "tag": "description",
            "__v": 0
        },
        {
            "_id": "646f46741727023b53a7da13",
            "user": "646f411a183e43a38c2c2bde",
            "title": "chikitsa",
            "description": "new desc",
            "tag": "description",
            "__v": 0
        }

    ]

    const [notes, setNotes] = useState(notesinitial)


    //add a note
    const addNote = (title, description, tag) => {
        console.log("adding a new note")
        var note = {
            "_id": "646f46741727023b53a7da13",
            "user": "646f411a183e43a38c2c2bde",
            "title": title,
            "description": description,
            "tag": "description",
            "__v": 0
        }
        setNotes(notes.concat(note))
    }
    //delte note
    const deletenote = (id) => {
        console.log('deleteing the node' + id)
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }
    //updaet note
    const editnote = (id, title, description, tag) => {

        //Api call


        //logic to edit
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title
                element.description = description
                element.tag = tag
                setNotes(notes)
                return
            }

        }
    }
    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, deletenote, editnote }}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
