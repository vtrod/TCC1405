import { useState } from 'react';
import { TextInput, HelperText } from 'react-native-paper';
import estilos from './estilos';

export function EntradaTexto({ label, value, onChangeText, secureTextEntry, error, messageError }) {
  const [secureMode, setSecureMode] = useState(secureTextEntry);

  return (
    <>
      <TextInput
        label={label}
        value={value}
        error={error}
        secureTextEntry={secureMode}
        onChangeText={onChangeText}
        style={estilos.input}
        right={
          secureTextEntry ?
          <TextInput.Icon
            name={secureMode ? 'eye-off' : 'eye'}
            onPress={() => setSecureMode(!secureMode)}
          /> : null
        }
      />
      {error && <HelperText type="error" visible={error}>
        {messageError}
      </HelperText>}
    </>
  );
}