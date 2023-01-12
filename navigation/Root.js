import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Stacks from "./Stacks";
import Tabs from "./Tabs";

const Stack = createStackNavigator();

export default function Root() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* 메인, 완독, 읽고있는 책 페이지  =Tabs */}
      <Stack.Screen name="Tabs" component={Tabs} />
      {/* 상세페이지, 작성페이지 =Stacks */}
      <Stack.Screen name="Stacks" component={Stacks} />
    </Stack.Navigator>
  );
}
