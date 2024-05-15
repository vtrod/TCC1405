import { Text } from 'react-native';
import estilos from './estilos';

export default function Logo({children1, children2}) {

return (
<Text style={estilos.appName}>
            <Text style={estilos.blueText}>{children1}</Text>
            <Text style={estilos.orangeText}>{children2}</Text>
</Text> 
  );
}
