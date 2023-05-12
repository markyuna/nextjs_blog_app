import { NavLink } from "react-router-dom";
import React from 'react';

export default function Menu() {
  return (
    <nav>
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/add">Add Post</NavLink></li>
        <li><NavLink to="/list">Display all Posts</NavLink></li>
      </ul>
    </nav>
  )
}
