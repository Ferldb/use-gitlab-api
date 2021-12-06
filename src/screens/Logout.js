import React, { useContext, useEffect } from "react";
import {Text} from "react-native-elements";
import { AuthContext } from "../context/AuthContext";




const Logout =({ navigation }) => {

    const { signOut } = useContext(AuthContext);

    useEffect(() => {
        signOut();
    }, []);
    
    return(
        <Text>LOGOUT</Text>
    )
}


export default Logout;