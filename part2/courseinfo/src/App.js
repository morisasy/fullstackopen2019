import React from 'react'
import Course from './components/Course';

const App = ({courses}) => {
  console.log("props courses",courses)

  const rows = () => courses.map(course =>
    <Course
      name = {course.name}
      key={course.id}
      courses={course.parts}
    />
  );

  return (
    <div>
      <h1>Web Development Curriculum</h1>
      <ul>
        {rows()}
      </ul>
      
    </div>
  )
}

export default App