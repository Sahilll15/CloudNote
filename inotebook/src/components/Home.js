import React, { useContext } from 'react'
import NoteContext from '../context/notes/noteContext'
import Notes from './Notes'
import addNote from './Addnote'



const Home = () => {
    const context = useContext(NoteContext)
    const { notes } = context

    return (
        < >

            <Notes key={notes.id} />
        </>
    )
}

export default Home
