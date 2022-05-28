import React, {Component} from 'react'
import {View, Flatlist, StyleSheet, Alert, SafeAreaView, Text} from 'react-native'
import axios from 'axios'

export default class DetailScreen extends Component{

  constructor(props){
    super(props)
    this.state = {
      details: {},
      imagePath: "",
      url: `http://localhost:5000/planet?name=${this.props.navigation.getParam("planet_name")}`
    }
  }

componentDidMount(){
  this.getDetails()
}
  getDetails = () => {
    const {url} = this.state
    axios.get(url).then(response => {
      this.setDetails(response.data.data)
    })
    .catch(error => {
      Alert.alert(error.messege)
    })
  }

  setDetails = planetDetails =>{
   const planetType = planetDetails.planet_type;
   let imagePath = ''
   switch (planetType){
  case "Gas Giant":
     imagePath = require("../assets/gas_giant.png")
     break:
  case "Terrestrial":
     imagePath = require("../assets/terrestrial.png)
     break:
  case "Super Earth":
     imagePath = require("../assets/super_earth.png")
  case "Neptune Like":
    imagePath = require("../assets/neptune_like.png")
    break:
  default:
    imagePath = require("../assets/gas_giant.png")
   }
  

this.setState:{
  details: planetDetails,
  imagePath: imagePath
}
}

  render(){
    return(
      <View>
      <Text>Details</Text>
      </View>
    )
  }
}