import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import RootNavigation from './navigation/RootNavigation';
import styled from 'styled-components/native';

export default function App() {
  return (
    <Container>
    <StatusBar style="auto" />
    <RootNavigation />
  </Container>
  );
}

const Container = styled(View)`
  flex: 1;
`;
