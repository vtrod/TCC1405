import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingTop: 25,
    paddingHorizontal: 20,
    backgroundColor: '#120f25',
  },
  containerAnimacao: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imagem: {
    width: 200,
    height: 200
  },
  tituloContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent:'center',
  },
  titulo: {
    fontSize: 65, 
    marginBottom: 100,
    marginTop: 40,
  },
  hipertrof: {
    color: '#FFFFFF', 
  },
  ia: {
    color: '#FFA000',
  },
});