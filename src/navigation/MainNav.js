import React, { useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthNav from "./AuthNav";
import { NavigationContainer } from "@react-navigation/native";
import TabNav from "./TabNav";
import { useSelector } from "react-redux";

const MainNav = () => {
  const [checkedUser, setCheckedUser] = useState(null);
  const user = useSelector((state) => state.authSlice.user);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userEmail = await AsyncStorage.getItem("userEmail");
        userEmail ? setCheckedUser(userEmail) : setCheckedUser(user);
      } catch (error) {
        console.log(error);
      }
    };
    checkUser();
  }, [user]);

  return (
    <NavigationContainer>
      {checkedUser ? <TabNav /> : <AuthNav />}
    </NavigationContainer>
  );
};

export default MainNav;
