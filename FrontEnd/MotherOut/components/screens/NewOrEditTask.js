
import React, { Component } from 'react';
import {
    FlatList,
    Pressable, ScrollView, StyleSheet,

    Text, View
} from 'react-native';
import { Image } from 'react-native-elements';
import importAvatar2 from '../../assets/avatar2.png';
import importIcon from '../../assets/bathtub.png';
import importAvatar from '../../assets/circle-cropped.png';
import importedPicture from '../../assets/newOrEditTask.png';
import { GenericInput2 } from '../GenericInput2';
import { NavBar } from '../NavBar';
import { RoundedButton } from '../RoundedButton';

const avatar = Image.resolveAssetSource(importAvatar).uri
const avatar2 = Image.resolveAssetSource(importAvatar2).uri
const icon = Image.resolveAssetSource(importIcon).uri
const picture = Image.resolveAssetSource(importedPicture).uri;



const listUsers = [
    { name: 'Pablo', blop: avatar2 }, { name: 'Juan', blop: avatar }, { name: 'Jesus', blop: avatar },
    { name: 'Pablo', blop: avatar2 }, { name: 'Juan', blop: avatar }, { name: 'Jesus', blop: avatar },
    { name: 'Pablo', blop: avatar2 }, { name: 'Juan', blop: avatar }, { name: 'Jesus', blop: avatar },
]

class NewOrEditTask extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: null,
        }
    }

    _menu = null;

    setMenuRef = ref => {
        this._menu = ref;
    };

    hideMenu = () => {
        this._menu.hide();
    };

    showMenu = () => {
        this._menu.show();
    };

    getName = (item) => {
        return this.setState({
            name: item.name
        })
    }

    render() {
        return (
            <>
                <View style={styles.contenidor}>
                    <ScrollView>
                        <View style={styles.header}>
                            <Image
                                style={{ width: 300, height: 90 }}
                                source={{ uri: picture }} />
                        </View>
                        <View style={styles.body}>

                            <Text style={styles.textStyle}>TaskName</Text>
                            <GenericInput2 ></GenericInput2>
                            <Text style={styles.textStyle}>Score</Text>
                            <GenericInput2></GenericInput2>
                            <Text style={styles.textStyle}>Icon</Text>

                            <FlatList
                                data={listUsers}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) =>
                                    <View style={styles.iconBox}>
                                        <Pressable>
                                            <Text style={styles.textStyle}>{item.name}</Text>
                                        </Pressable>
                                    </View>
                                }
                            />
                            <RoundedButton icon="plus" />

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
        );
    }
}

const styles = StyleSheet.create({
    contenidor: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#90A8C3',
    },
    header: {
        marginTop: 2,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    body: {
        marginTop: 2,
        padding: 10,
        justifyContent: 'space-evenly',
        flex: 10,
    },
    textStyle: {
        padding: 10,
        fontSize: 25,
        fontFamily: "Roboto",
        fontWeight: "bold"
    },
    iconBox: {
        backgroundColor: '#D7B9D5',
        alignItems: 'center'
    },
});
export default NewOrEditTask;