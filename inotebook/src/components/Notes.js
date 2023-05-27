import React, { useEffect, useRef, useState } from 'react'
import NoteContext from '../context/notes/noteContext'
import { useContext } from 'react'
import Noteitem from './Noteitem'
import AddNote from './Addnote'
import { useNavigate } from 'react-router'
const Notes = () => {
    let navigate = useNavigate();
    const context = useContext(NoteContext);
    const { notes, getallnotes, editnote } = context;


    const [note, setnote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getallnotes();

        }
        else {
            navigate('/login')
        }
        // eslint-disable-next-line
    }, []);

    const ref = useRef(null)
    const refclose = useRef(null)
    const updateNote = (currentnote) => {
        ref.current.click();
        setnote({ id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag })
    }
    const handleClick = (e) => {
        e.preventDefault();

        editnote(note.id, note.etitle, note.edescription, note.etag)
        ref.current.click();
        // updateNote(note.etitle, note.edescription, note.etag);
    }

    const onchange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className="row my-3">
                <AddNote />
                <button type="button" ref={ref} className=" d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Launch demo modal
                </button>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="container my-3">
                                    <h1>Add a note</h1>
                                    <form className='my-3'>
                                        <div className="mb-3">
                                            <label htmlFor="etitle" className="form-label">Title</label>
                                            <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onchange} minLength={5} required />

                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="edescription" className="form-label">Description</label>
                                            <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onchange} minLength={5} required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="etag" className="form-label">Tag</label>
                                            <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onchange} />
                                        </div>


                                    </form>

                                </div >
                            </div>
                            <div className="modal-footer">
                                <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                            </div>
                        </div>
                    </div>
                </div>
                <h1>Your notes</h1>
            </div>
            <div className="row">
                {notes.length === 0 ? <h3>No notes to display</h3> :
                    Array.isArray(notes)
                        ? notes.map((note) => {
                            return <Noteitem key={note.id} updateNote={updateNote} note={note} />;
                        }) : null}
            </div>
        </>
    );
};

export default Notes;