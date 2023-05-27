
import React, { useContext } from 'react'
import NoteContext from '../context/notes/noteContext'

const Noteitem = (props) => {
    const { note, updateNote } = props;
    const context = useContext(NoteContext)
    const { deletenote } = context;


    return (
        <div className="card mx-3 my-3" style={{ width: '18rem' }}>
            <div className="card-body mx-3">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.description}</p>
                <p className="card-text " style={{ color: "grey" }}>Tag :  {note.tag}</p>
                <i className="fa-solid fa-trash mx-2" onClick={() => deletenote(note._id)}></i>
                <i className="fa-solid fa-pen-to-square mx-2" onClick={() => { updateNote(note) }}></i>
            </div>
        </div >
    );
};

export default Noteitem
