import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Text, View, Image } from "react-native";
import mainStyles from "../styles/mainStyles";
import { getUsers } from "../api";
import { StyleSheet } from "react-native";


//Bronze: 25
//Silver: 50
//Gold: 100

export default function LeaderBoard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data);
    });
  }, []);



  const usersWithPoints = [...users]
  usersWithPoints.map((user) => {
  user.points=(user.achievements.bronze*25)+(user.achievements.silver*50)+(user.achievements.gold*100)
  })
    
  return (
    <View style={styles.container}>
      {usersWithPoints.sort((a,b)=>b.points-a.points).map((user, i) => {
        return (
          <View key={user._id} style={styles.leaderBoard}>
            <Image src={user.avatar_URL} style={styles.avatar}/>
            <Text style={styles.name}>
              {++i}. {user.username}
            </Text>
            <Text style={styles.points} >
              {user.points}
            </Text>
          </View>
        );
      })}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#180131",
    height: "100%",
    paddingTop: 50,
    paddingHorizontal: 30,
    
  },
  leaderBoard: {
    flex: 1,
    flexDirection: 'row',
    justifyContent:"space-between"
  },
  avatar: {
    height: 40,
    width: 40,
    backgroundColor: 'white',
    marginRight: 30,
    borderRadius: 50,
  },
  name: {
    fontSize: 20,
    color: 'white',
    flex: 1,
    justifyContent:"flex-start"
  },
  points: {
    fontWeight: "bold",
    color: "white",
    fontSize: 20,
  },
});
