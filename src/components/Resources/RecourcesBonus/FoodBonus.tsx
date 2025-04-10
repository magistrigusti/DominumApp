import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";

const TWO_HOURS = 1000 * 60 * 60 * 2;

export const FoodBonus = () => {
  const { state, dispatch } = useUser();
  const [available, setAvailable] = useState(false);

  
}
