import axios from 'axios';

function filmRate() {
  return axios.get('http://127.0.0.1:8000/film/FilmOrderbyRate/');
}

function filmEditor() {
  return axios.get('http://127.0.0.1:8000/film/FilmEditorChoice/');
}

function filmStream() {
  return axios.get('http://127.0.0.1:8000/film/FilmOnStreaming/');
}

function hireStaff() {
  return axios.get('http://127.0.0.1:8000/film/hirepoststaff/')
}

function hireActor() {
  return axios.get('http://127.0.0.1:8000/film/hirepostactor/')
}

function homebanner() {
  return axios.get('http://127.0.0.1:8000/film/homebanner/')
}

function freeboard() {
  return axios.get('http://127.0.0.1:8000/film/freeboard/')
}

function commentFilm() {
  return axios.get('http://127.0.0.1:8000/film/comment/film/') 
}
function HirePostStaff_imgfilter() {
    return axios.get('http://127.0.0.1:8000/film/HirePostStaff_imgfilter/')
}


export {
  filmRate,
  filmEditor,
  filmStream,
  hireStaff,
  hireActor,
  freeboard,
  homebanner,
  HirePostStaff_imgfilter,
  commentFilm,
}