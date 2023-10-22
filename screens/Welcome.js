import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

//formik
import { Formik } from 'formik';

//icons
import { Octicons, Ionicons } from '@expo/vector-icons';

import {
    StyledContainer,    
    Colors,
} from './../components/styles';
import { View } from 'react-native';

//colors
const {brand, darkLight} = Colors;

const Welcome = () => {
    const [hidePassword, setHidePassword] = useState(true)
    return (
        <StyledContainer>
           
        </StyledContainer>
    );
};

export default Welcome;