import React, { useCallback, useEffect, useState } from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";
const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const SingleCocktail = () => {
  //grab the dynamic id variable from RUL
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const [cocktail, setCocktail] = useState(null);

  const fetchDetail = useCallback(async () => {
    try {
      const response = await fetch(`${url}${id}`);
      const { drinks } = await response.json();
      if (drinks) {
        const {
          strDrink: name,
          strDrinkThumb: image,
          strAlcoholic: info,
          strCategory: category,
          strGlass: glass,
          strInstructions: instructions,
          strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
          strIngredient5,
        } = drinks[0];
        const ingredients = [
          strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
          strIngredient5,
        ];

        const newCocktail = {
          name,
          image,
          info,
          category,
          glass,
          instructions,
          ingredients,
        };
        setCocktail(newCocktail);
      } else {
        setCocktail(null);
      }
      setLoading(false);

      //console.log(newCocktail);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDetail();
  }, [id, fetchDetail]);

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="section cocktail-section">
      <Link to="/" className="btn btn-primary">
        back home
      </Link>
      <h2 className="section-title">{cocktail.name}</h2>
      <div className="drink">
        <img src={cocktail.image} alt={cocktail.name}></img>
        <div className="drink-info">
          <p>
            <span className="drink-data">name :</span> {cocktail.name}
          </p>
          <p>
            <span className="drink-data">category :</span> {cocktail.category}
          </p>
          <p>
            <span className="drink-data">info :</span> {cocktail.info}
          </p>
          <p>
            <span className="drink-data">glass :</span> {cocktail.glass}
          </p>
          <p>
            <span className="drink-data">instructions :</span>
            {cocktail.instructions}
          </p>
          <p>
            <span className="drink-data">ingredients :</span>
            {cocktail.ingredients.map((item, index) => {
              return item ? <span key={index}> {item}</span> : null;
            })}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SingleCocktail;
