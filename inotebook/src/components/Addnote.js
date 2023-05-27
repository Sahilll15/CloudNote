import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/noteContext'

const AddNote = () => {
    const context = useContext(NoteContext)
    const { addNote } = context;
    const [note, setnote] = useState({ title: "", description: "", tag: "" })
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setnote({ title: "", description: "", tag: "" })
    }

    const onchange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })

    }
    return (

        <div className="container my-3">
            <h1>Add a note</h1>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onchange} minLength={5} required />

                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onchange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onchange} minLength={5} required />
                </div>

                <button type="submit" className="btn btn-primary" onClick={handleClick} > Add Note</button>
            </form>

        </div >

    )
}

export default AddNote;
