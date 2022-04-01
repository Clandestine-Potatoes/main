import { Flex } from "@react-native-material/core";
import React from "react";
import { StyleSheet, FlatList, Pressable } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

export default function Dashboard({
  navigation,
}: RootTabScreenProps<"Dashboard">) {
  const data = [
    {
      uid: "60b6a73f63ed0c1e369993c3",
      icon: '😬',
      name: "Brandon",
      age: "31",
      bio: "I like to hello world"
    },
    {
      uid: "60b6a73f63ed0c1e369993c4",
      icon: '🥸',
      name: "Jonni",
      age: "29",
      bio: "I know your parents"
    },
    {
      uid: "60b6a73f63ed0c1e369993c5",
      icon: '😶‍🌫️',
      name: "Justin",
      age: "???",
      bio: "Don't believe me? Ask the dishes"
    },
    {
      uid: "60b6a73f63ed0c1e369993c6",
      icon: '🥵',
      name: "Christian",
      age: "33",
      bio: "Absolutely not"
    }
  ]

  const renderItem = ({ item }: { item: any}) => {
    return (
      <Pressable style={styles.listItem}>
        <Flex style={styles.listItemBody}>
          {item.icon && <Text style={styles.icon}>{item.icon}</Text>}
          <View>
            <Text style={styles.name}>{item.name} <Text style={styles.age}>({item.age})</Text></Text>
            <Text>{item.bio}</Text>
          </View>
        </Flex>
      </Pressable>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList 
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.uid}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F1F7',
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  listItem: {
    borderRadius: 6,
    padding: 20,
    backgroundColor: 'white',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 5, height: 5 },
    marginHorizontal: 30,
    marginTop: 30
  },
  name: {
    fontSize: 24
  },
  age: {
    fontSize: 18
  },
  listItemBody: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    fontSize: 48,
    marginRight: 10
  }
});
