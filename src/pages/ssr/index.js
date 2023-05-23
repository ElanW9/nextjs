import React from "react";

const index = () => {
  return <div></div>;
};

export async function getServerSideProps() {
  const response = await fetch(
    "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?s="
  );
  const { drinks: cocktails } = await response.json();
  return {
    props: {
      naam: "Elan",
      age: 22,
    },
  };
}

export default index;
