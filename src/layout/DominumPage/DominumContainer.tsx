import { useEffect, useState } from "react";
import { useTonWallet } from "@tonconnect/ui-react";
import { useUser } from "../../context/UserContext";
import { DominumPage } from "./DominumPage"; 

export const DominumContainer = () => {
  useEffect(() => {
    const fetchResurs = async () => {
      const res = await fetch("/api/dominum")
    }
  }, []);
}