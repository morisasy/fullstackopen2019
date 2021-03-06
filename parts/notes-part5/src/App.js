import React, { useState, useEffect } from 'react';
import Note from './components/Note';
import Notification from './components/Notification';
import noteService from './services/Services';
import Footer from './components/Footer';
import loginService from './services/login'




const App = () => {
  const [loginVisible, setLoginVisible] = useState(false)
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState('some error happened...')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  useEffect(() => {
    console.log('effect')
    noteService
      .getAll()
      .then(response => {
        setNotes(response)
        console.log("notes fetched", response)
      })
  }, [])
 // console.log('render', notes.length, 'notes')
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])


  const notesToShow = showAll
                          ? notes
                          : notes.filter(note => note.important)
  
  
  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(response => {
        setNotes(notes.map(note => note.id !== id ? note : response))
      }).catch(error => {
      setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      setNotes(notes.filter(n => n.id !== id))
    })
  }

  const rows = () => notesToShow.map(note =>
    <Note
      key={note.id}
      note={note}
     toggleImportance={() => toggleImportanceOf(note.id)}
    />
  )

  
  
  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
    }
     noteService
      .create(noteObject)
      .then(response => {
        setNotes(notes.concat(response))
        setNewNote('')
      })
    //setNotes(notes.concat(noteObject))
    //setNewNote('')
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const noteForm = () => (
    <form onSubmit={addNote}>
      <input
        value={newNote}
        onChange={handleNoteChange}
      />
      <button type="submit">save</button>
    </form>  
  )

  //  {user === null && loginForm()}
  //{user !== null && noteForm()}

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      <h2>Login</h2>
     
      {user === null ?
      loginForm() :
            <div>
              <p>{user.name} logged in</p>
              {noteForm()}
            </div>
      }

      
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {rows()}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote} 
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>

      <Footer />
    </div>
  )
}

export default App;