import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Text, View, Button } from "react-native";
import mainStyles from "../styles/mainStyles";
import { getUsers } from "../api";

export default function LeaderBoard({ navigation }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then((data) => {
      console.log(data);
      setUsers(data);
    });
  }, []);

  useEffect(() => console.log({ users }), [users]);

  return (
    <View style={mainStyles.container}>
      <Text style={mainStyles.text}>LeaderBoard</Text>
      {users.map((user, i) => {
        return (
          <Text style={{ color: "white" }}>
            {++i}. {user.username}
          </Text>
        );
      })}
    </View>
  );
}
