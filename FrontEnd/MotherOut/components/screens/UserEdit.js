import React, {Component} from 'react';
import {ScrollView, StyleSheet, ToastAndroid, View} from 'react-native';
import {Image} from 'react-native-elements';
import {GenericButton} from '../GenericButton';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {NavBar} from "../NavBar";
import {GenericInput2} from "../GenericInput2";

let Image_Http_URL = {uri: 'https://i.imgur.com/vo3TWM2.png?1'};

class UserEdit extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: [],
            name: null,
            email: null,
            password: null,
            ppww: null,
        }
    }

    componentDidMount = () => {
        this.getData().then(() => {
            this.getActualUser();
        });
    }

    async storeData(res) {
        try {
            const jsonValue = JSON.stringify(res)
            await AsyncStorage.setItem('logUser', jsonValue)
        } catch (e) {
            ToastAndroid.showWithGravityAndOffset("User data could not be stored.", ToastAndroid.LONG,
                ToastAndroid.TOP,
                25,
                50);
        }
    }

    async getData() {
        try {
            const jsonValue = await AsyncStorage.getItem('logUser')
            jsonValue != null ? this.setState({user: JSON.parse(jsonValue)}) : null;
        } catch (e) {
            ToastAndroid.showWithGravityAndOffset("User data could not be loaded.", ToastAndroid.LONG,
                ToastAndroid.TOP,
                25,
                50);
        }
    }

    getActualUser = async () => {
        axios.get('http://52.0.146.162:80/api/Users?email=' + this.state.user.Email)
            .then(response => {
                const res = response.data;
                this.setState({user: res});
                this.storeData(res).then(r => console.log(r));

            }).catch(() => {
            ToastAndroid.showWithGravityAndOffset("The user could not be obtained.", ToastAndroid.LONG,
                ToastAndroid.TOP,
                25,
                50);
        })
    }

    updateUser = async () => {
        let name = this.state.name;
        let email = this.state.email;
        let password = this.state.password;

        if (name === null) {
            name = this.state.user.UserId;
        }

        if (email === null) {
            email = this.state.user.Email;
        }

        if (password === null) {
            password = this.state.user.Password;
        }

        if (name === this.state.user.Name && email === this.state.user.Email && password === this.state.user.Password) {
            ToastAndroid.showWithGravityAndOffset("No fields have been updated, therefore no change has taken place.", ToastAndroid.LONG,
                ToastAndroid.TOP,
                25,
                50);
        } else {
            axios.put('http://52.0.146.162:80/api/Users?idUser=' + this.state.user.UserId + '&email=' + email + '&name=' + name + '&password=' + password)
                .then(ToastAndroid.showWithGravityAndOffset("The user has been successfully updated.", ToastAndroid.LONG,
                    ToastAndroid.TOP,
                    25,
                    50), this.getActualUser())
                .catch(() => {
                    ToastAndroid.showWithGravityAndOffset("The user has not been able to update.", ToastAndroid.LONG,
                        ToastAndroid.TOP,
                        25,
                        50);
                })
        }
    }

    render() {
        return (
            <>
                <View style={styles.contenidor}>
                    <ScrollView>
                        <View style={styles.pictures}>
                            <Image
                                style={{width: 333, height: 90}}
                                source={Image_Http_URL}
                            />
                        </View>
                        <View style={styles.inputs}>
                            <GenericInput2 placeHolder={this.state.user.Name} value={this.state.name}
                                           onChange={(item) => this.setState({name: item})}/>
                            <GenericInput2 placeHolder={this.state.user.Email} value={this.state.email}
                                           onChange={(item) => this.setState({email: item})}/>
                            <GenericInput2 placeHolder="*********" passValue={true} value={this.state.password}
                                           onChange={(item) => this.setState({password: item})}/>
                        </View>
                        <View style={styles.button}>
                            <GenericButton button="Save" press={this.updateUser}/>
                        </View>
                    </ScrollView>
                    <View>
                        <NavBar
                            checked={() => this.props.navigation.navigate('ScreenToDo')}
                            list={() => this.props.navigation.navigate('ListTask')}
                            calendar={() => this.props.navigation.navigate('TaskAssignment')}
                            nav={() => this.props.navigation.navigate('Statistics')}
                            settings={() => this.props.navigation.navigate('Setting')}
                        />
                    </View>
                </View>
            </>
        )
            ;
    }
}

const styles = StyleSheet.create({
    contenidor: {
        flex: 1,
        alignContent: 'center',
        paddingTop: 25,
        backgroundColor: '#90A8C3',
    },
    pictures: {
        alignSelf: 'center',
    },
    inputs: {
        padding: 10,
        paddingTop: 20,
    },
    button: {
        padding: 15,
    }
});

export default UserEdit;
