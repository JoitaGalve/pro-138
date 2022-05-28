import React, {Component} from 'react'
import {View, Flatlist, StyleSheet, Alert, SafeAreaView, Text} from 'react-native'
import axios from 'axios'
import {ListItem} from 'react-native-elements'

export default class HomeScreen extends Component{

  constructor(props){
    super(props)
    this.state = {
      listData: [],
      url: 'http://127.0.0.1:5000/'    
      }
  }

  getPlanets = () => {
    const {url} = this.state
    axios.get(url).then(response => {
      return this.setState({
        listData: response.data.data
      })
    })

    .catch(error => {
      Alert.alert(error.messege)
    })
  }

  componentDidMount(){
    //this.getPlanets()
  }

  renderItem =({item, index}) => {
    <ListItem
    key = {index}
    title = {"Planet: ${item.name}"}
    subtitle = {"Distance from Earth: ${item.distance_from_earth}"}
    titlestyle = {styles.title}
    containerStyle = {styles.listContainer}
    bottomDivider
    chevron
    onPress = {() => {
      this.props.navigation.navigate('Details', {planet_name: item.name})

    }}
    /> 
  }

  keyExtractor = (item, index) => {
    index.toString()
  }
  render(){
    const {listData} = this.state
    if (listData.length === 0){
      return(
        <View style = {styles.emptyContainer}>
        <Text>Loading....</Text>
        </View>
      )
    }
    return(
      <View style = {styles.container}>
      <SafeAreaView />

      <View style = {styles.upperContainer}>
        <Text style = {styles.headerText}>Planets World</Text>
      </View>

       <View style = {styles.lowerContainer}>
        <Flatlist
        keyExtractor = {this.keyExtractor}
        data = {this.state.listData}
        renderItem = {this.renderItem}

        />
      </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'orange'
  },

  upperContainer:{
    flex: 0.1,
    justifyContent:'center',
    alignItems: 'center',
  },

  headerText:{
   fontFamily: 30,
   fontWeight: 'bold',
   color: 'white'
  },

  lowerContainer:{
  flex: 0.9
  },

emptyContainer:{
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
},

title:{
  fontSize: 18,
  fontWeight: 'bold',
  color: 'black'
},

listContainer:{
  backgroundColor: 'skyblue'
},


})