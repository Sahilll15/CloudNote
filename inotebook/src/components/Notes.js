import React from 'react'
import NoteContext from '../context/notes/noteContext'
import { useContext } from 'react'
import Noteitem from './Noteitem'
import AddNote from './Addnote'


const Notes = () => {
    const context = useContext(NoteContext);
    const { notes } = context;

    return (
        <>
            <div className="row my-3">
                <AddNote />
                <h1>Your notes</h1>
            </div>
            <div className="row">
                {notes.map((note) => {
                    return <Noteitem key={note.id} note={note} />;
                })}
            </div>
        </>
    );
};

export default Notes;