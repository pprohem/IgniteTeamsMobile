import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacityProps } from 'react-native';
import { ButtonIconTypeStyleProps, Container, Icone } from './styles';

type Props = TouchableOpacityProps &{
    icon: keyof typeof MaterialIcons.glyphMap; 
    type?: ButtonIconTypeStyleProps

}


export function ButtonIcon({icon, type = 'PRIMARY', ...rest} : Props) {
    return(
        <Container {...rest}>
            <Icone
            name = {icon}
            type = {type}
            />
            
        </Container>
    )
}