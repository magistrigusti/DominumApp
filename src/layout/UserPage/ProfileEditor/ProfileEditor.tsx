import { useUser } from "@/context/UserContext";
import { useState } from "react";

export const ProfileEditor = () => {
  const { state, dispatch } = useUser();
  const [name, setName] = useState(state.name || "");
  const [avatar, setAvatar] = useState(state.avatar || "");

  const saveProvile = async () => {
    const res = await fetch("/api/user/update", {
      method: "PUT",
      headers: {"Context-Type": "pplication/json"},
      body: JSON.stringify({address: state.address, name, avatar}),
    });

    if (res.ok) {
      const updateUser = await res.json();
      dispatch({type: "SET_USER", payload: updateUser});
    }
  };

  return (
    <div>
      <input value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />

      <input value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
        placeholder=""
      />
    </div>
  )

}