import { createContext, useContext, useEffect, useReducer, useState } from "react";
import PropTypes from 'prop-types';

const baseUrl = 'https://api.jikan.moe/v4';

const LOADING = 'LOADING';
const GET_POPULAR_ANIME = 'GET_POPULAR_ANIME';
const GET_UPCOMING_ANIME = 'GET_UPCOMING_ANIME';
const GET_AIRING_ANIME = 'GET_AIRING_ANIME';
const SEARCH = 'SEARCH'
const GET_PICTURES = 'GET_PICTURES'

const reducer = (state, action) => {
  switch (action.type) { // Use action.type instead of action.payload
    case LOADING:
      return { ...state, loading: true };
    case GET_POPULAR_ANIME:
      return { ...state, popularAnime: action.payload, loading: false };
    case SEARCH:
      return {...state , searchResults:action.payload , loading: false}
    case GET_UPCOMING_ANIME:
      return {...state , upcomingAnime:action.payload , loading: false}
    case GET_AIRING_ANIME:
      return {...state , airingAnime:action.payload , loading:false}
    case GET_PICTURES:
      return {...state , pictures:action.payload , loading: false}  
      default:
      return state;
  }
}

const Context = createContext();

const GlobalContextProvider = ({ children }) => {
  const initialState = {
    popularAnime: [],
    upcomingAnime: [],
    airingAnime: [],
    pictures: [],
    isSearch: false,
    searchResults: [], // Corrected property name
    loading: false
  };


  const [state, dispatch] = useReducer(reducer, initialState);
  const [search , setSearch] = useState('')

  const handleChange = (e)=>{
    setSearch(e.target.value)
    if(e.target.value === ''){
      state.isSearch = false
    }
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    if(search){
      searchAnime(search)
      state.isSearch = true
    }
    else{
      state.isSearch = false
      alert('Please enter a valid term')
    }
  }



  const getPopularAnime = async () => {
    try {
      dispatch({ type: LOADING }); // Use type instead of payload
      const res = await fetch(`${baseUrl}/top/anime?filter=bypopularity`);
      const data = await res.json();
      dispatch({ type: GET_POPULAR_ANIME, payload: data.data }); // Use type instead of payload
    } catch (error) {
      console.log(error);
    }
  }

  
  const getAiringAnime = async () => {
    try {
      dispatch({ type: LOADING }); // Use type instead of payload
      const res = await fetch(`${baseUrl}/top/anime?filter=airing`);
      const data = await res.json();
      dispatch({ type: GET_AIRING_ANIME, payload: data.data }); // Use type instead of payload
    } catch (error) {
      console.log(error);
    }
  }

  const getUpcomingAnime = async () => {
    try {
      dispatch({ type: LOADING }); // Use type instead of payload
      const res = await fetch(`${baseUrl}/top/anime?filter=upcoming`);
      const data = await res.json();
      dispatch({ type: GET_UPCOMING_ANIME, payload: data.data }); // Use type instead of payload
    } catch (error) {
      console.log(error);
    }
  }




  const searchAnime = async(anime)=>{
    dispatch({type: LOADING})
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${anime}&order_by=popularity&sort=asc&sfw`)
    const data = await response.json()
    dispatch({type: SEARCH , payload: data.data})
  }

  const getAnimePictures = async(id)=>{
    try {
      dispatch({type: LOADING})
      const response = await fetch(`${baseUrl}/characters/${id}/pictures`)
      const data = await response.json()
      dispatch({type: GET_PICTURES , payload:data.data})
      
    } catch (error) {
      console.log(error)
    }
  }




  useEffect(() => {
    getPopularAnime();
  }, []);

  return <Context.Provider value={{ ...state , handleChange ,handleSubmit , searchAnime ,search , getAiringAnime , getPopularAnime , getUpcomingAnime , getAnimePictures}}>{children}</Context.Provider>;
};

GlobalContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

  const useGlobalContext = () => {
  return useContext(Context);
}

export { GlobalContextProvider, useGlobalContext };
