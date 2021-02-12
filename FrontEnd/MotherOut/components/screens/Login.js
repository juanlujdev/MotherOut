import axios from 'axios';
import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScrollView, StyleSheet, Text, ToastAndroid, View,} from 'react-native';
import {Image,} from 'react-native-elements';
import imagen from '../../assets/logo.png';
import {GenericButton} from '../GenericButton';
import {GenericInput1} from '../GenericInput1';

const picture = Image.resolveAssetSource(imagen).uri;

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            user: null,
        };
    }

    componentDidMount() {

    }

    async storeData(res) {
        try {
            const jsonValue = JSON.stringify(res);
            await AsyncStorage.setItem('logUser', jsonValue);
        } catch (e) {
            ToastAndroid.showWithGravityAndOffset(e, ToastAndroid.LONG,
                ToastAndroid.TOP,
                25,
                50);
        }
    }

    getUserbyEmail = async () => {
        axios.get('http://52.0.146.162:80/api/Users?email=' + this.state.email)
            .then(response => {
                const res = response.data;
                this.setState({user: res});
                this.storeData(res);
                if (!this.state.user.Help && this.state.user.AsignedTeam !== 0) {
                    this.props.navigation.navigate('ScreenToDo');
                } else {
                    this.props.navigation.navigate('Help1');
                }
            })
            .catch(function (error) {
                ToastAndroid.showWithGravityAndOffset(error, ToastAndroid.LONG,
                    ToastAndroid.TOP,
                    25,
                    50);
            });
    };

    render() {
        return (
            <>
                <View style={styles.container}>
                    <ScrollView>
                        <View style={styles.pictures}>
                            <Image
                                style={{width: 310, height: 270}}
                                source={{uri: picture}}
                            />
                        </View>
                        <View style={styles.inputs}>
                            <GenericInput1 placeHolder="Email" value={this.state.email}
                                           onChange={(item) => this.setState({email: item})}/>
                            <GenericInput1 placeHolder="Password"/>
                        </View>
                        <View style={styles.buttons}>
                            <GenericButton button="Log In" press={this.getUserbyEmail}/>
                            <View style={styles.text}>
                                <Text>Don't have a login?</Text>
                            </View>
                            <GenericButton button="Sing Up" press={() => this.props.navigation.navigate('SingUp')}/>
                        </View>
                    </ScrollView>
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#90A8C3',
    },
    pictures: {
        alignSelf: 'center',
        padding: 15,
        marginTop: 15,
    },
    inputs: {
        padding: 15,
    },
    buttons: {
        alignContent: 'center',
        padding: 15,
    },
    text: {
        alignSelf: 'center',
        paddingTop: 20,
    },
});

export default Login;
