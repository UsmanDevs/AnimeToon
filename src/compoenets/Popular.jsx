import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/Global";
import { styled } from "styled-components";
import './Home'
import PropTypes from 'prop-types';
const Popular = ({rendered}) => {
  const { popularAnime, isSearch , searchResults } = useGlobalContext();

//   console.log(popularAnime);

  const conditionalRender = () => {
    if (!isSearch && rendered === 'popular') {
      return popularAnime.map((anime) => (
        <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
          <img src={anime.images.jpg.large_image_url} alt={anime.title} />
        </Link>
      ));
    }
    else{
      return searchResults.map((anime) => (
        <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
          <img src={anime.images.jpg.large_image_url} alt={anime.title} />
        </Link>
      ));

    }
    // return null; // Return null if isSearch is true
  };

  return (
    <>
    <PopularStyled>
      <div className="popular-anime">
        {conditionalRender()}
      </div>
      </PopularStyled>
    </>
  );
};

const PopularStyled = styled.div`
display: flex;
.popular-anime{
    padding: 2rem 2rem;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill , minmax(200px , 1fr));
    gap: 2rem;
    a{
        height: 330px;
        border-radius: 7px;
        border: 5px solid #e5e7eb;
    }
    a img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 5px;
        transition: all .4s ease-in-out;
        &:hover{
          transform: scale(1.1);
        }
    }

}

`
Popular.propTypes = {
  rendered: PropTypes.string.isRequired, // Add this line for the 'rendered' prop
};
export default Popular;
