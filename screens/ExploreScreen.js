import React,{Component} from 'react';
import { StyleSheet, Text, View, Dimensions} from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
const windowWidth = Dimensions.get('window').width;
import { Container } from "native-base";
import CardView from "../components/cardView";
export default class RenderExplore extends Component{
  state = {
  }
  componentDidMount = async ()=>{
  }
  render(){
    return(
    <View style={styles.container}>
      <View style={styles.header}> 
        <HeaderComponent props={this.props}/>
      </View>
      <View style={styles.cardView}> 
        <Container> 
          <CardView />
        </Container>
      </View>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
  },
  header: {
    width: '100%',
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  home: {
    width: '100%',
    flex: 1,
  },
  cardView:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textFont: {
    fontSize: 30,
  }
});
