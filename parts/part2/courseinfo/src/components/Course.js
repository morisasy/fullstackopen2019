import React from 'react';
import Header from './Header';
import Total from './Total';

const Course = ({name, courses }) => {
  console.log("course info",courses);

  const rows = () => courses.map(course =>
    <li key={course.id}>
      {course.name} {course.exercises}
    </li>
  );
   const total = courses.reduce((s, p) =>  s + p.exercises, 0);
 
  // <Total total = {total} />
  return (
   <div>
     <Header name = {name} />
       <ul>
         {rows()}
       </ul>
       <Total total = {total} />
   </div>
  )
}

export default Course;