import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Text, View, Image } from "react-native";
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
      {usersWithPoints.sort((a,b)=>b.points-a.points).slice(0,10).map((user, i) => {
        return (
          <View key={user._id} style={styles.leaderBoard}>
            <Text style={styles.number}>
              {++i}
            </Text>
            <Image src={user.avatar_URL} style={styles.avatar}/>
            <Text style={styles.name}>
              {user.username}
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
    height: "100%",
    paddingTop: 75,
    paddingBottom:10,
    paddingHorizontal: 20,
    gap: 5, 
  },
  leaderBoard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    borderWidth: 2,
    borderColor: "#3FC1C0",
    borderRadius: 15,
  },
  avatar: {
    height: 45,
    width: 45,
    backgroundColor: 'white',
    marginLeft:40,
    borderRadius: 50,
    position:'absolute'
  },
  name: {
    fontSize: 20,
   
  },
  number: {
    fontSize: 20,
    marginLeft: 10,
    marginRight:50
   
  },
  points: {
    fontWeight: "bold",
    fontSize: 25,
    paddingRight: 15,
    color: "#3FC1C0",

  },
});
