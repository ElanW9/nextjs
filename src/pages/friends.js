import db from "../../db";
import { nest } from "@/helpers";
import { useState } from "react";
const Friends = ({ friends, hobbies }) => {
  return (
    <div>
      <h1>database mysql</h1>
      <ul>
        {friends.map(({ id, name, age }) => (
          <details key={id}>
            <summary>
              {name} - {age}
            </summary>
            <ul>
              {hobbies.map(({ id, hobby }) => {
                <li key={id}>{hobby}</li>;
              })}
            </ul>
          </details>
        ))}
      </ul>
    </div>
  );
};

export default Friends;

export async function getStaticProps() {
  const friendsData = await db("friends_has_hobbies")
    .join("friends", "friends.id", "friends_has_hobbies.friends_id")
    .join("hobbies", "hobbies.id", "friends_has_hobbies.hobbies_id")
    .select(
      "friends.id",
      "friends.name",
      "friends.age",
      "friends.image",
      "hobbies.hobby",
      "hobbies.id AS hobbyId"
    );

  const friendsDefinition = [
    {
      id: { column: "id", type: "NUMBER" },
      name: "name",
      age: { column: "age", type: "NUMBER" },
      image: "image",
      hobbies: [
        {
          id: { column: "hobbyId", type: "NUMBER" },
          name: "hobby",
        },
      ],
    },
  ];

  const friends = nest(friendsData, friendsDefinition);

  return {
    props: {
      friends,
    },
    revalidate: 60,
  };
}
