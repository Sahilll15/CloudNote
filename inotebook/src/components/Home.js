import React, { useContext } from 'react'
import NoteContext from '../context/notes/noteContext'
import Notes from './Notes'
import addNote from './Addnote'



const Home = (props) => {

    const { showAlert } = props;
    return (
        < >

            <Notes showAlert={showAlert} />
        </>
    )
}

export default Home
