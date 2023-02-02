import { useRoute } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import { Alert, FlatList, TextInput } from 'react-native';
import { Button } from '../../components/Button';
import { ButtonIcon } from '../../components/ButtonIcon';
import { Filter } from '../../components/Filter';
import { Header } from '../../components/Header';
import { Highlight } from '../../components/Highlight';
import { Input } from '../../components/Input';
import { ListEmpty } from '../../components/ListEmpty';
import { PlayerCard } from '../../components/PlayerCard';
import { groupRemoveByName } from '../../components/storage/group/groupRemoveByName';
import { playerAddByGroup } from '../../components/storage/player/playerAddGroup';
import { playersGetByGroupAndTeam } from '../../components/storage/player/playerGetByGroupAndTeam';
import { playerRemoveByGroup } from '../../components/storage/player/playerRemoveByGroup';
import { PlayerStorageDTO } from '../../components/storage/player/PlayerStorageDTO';
import { AppError } from '../../utils/AppError';
import { Container, Form, HeaderList, NumberOfPlayers } from './style';


export function Players () {
    const [team, setTeam] = useState('Time A')
    const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
    const [newPlayerName, setNewPlayerName] = useState('')
     

    type RouteParams = {
        group: string;
    }


    const route = useRoute();
    const {group} = route.params as RouteParams;

    const newPlayerNameInputRef = useRef<TextInput>(null )
    

    async function handleAddPlayer() {
        if(newPlayerName.trim().length === 0 ){
            return Alert.alert('Nova pessoa.', 'Informe o nome da pessoa para adicionar')
        }

        const newPlayer= { 
            name: newPlayerName,
            team,
        }

        try{
            await playerAddByGroup(newPlayer, group)

            newPlayerNameInputRef.current?.blur();
            
            setNewPlayerName('');
           fetchPlayersByTeam();
        
        }catch(err){
            if(err instanceof AppError){
                Alert.alert("Nova pessoa", err.message)
            }else{
                console.log(err)
                Alert.alert("Nova pessoa", "Não foi possivel adicionar")
            }
        }
    }

    async function fetchPlayersByTeam() { 
        try{
            const playersByTeam = await playersGetByGroupAndTeam(group, team);
            setPlayers(playersByTeam);
        }catch(err) {
           console.log(err)
           Alert.alert('Pessoas', 'Não foi possivel carregar pessoas do time selecionado.') 
        }
    }


    async function handlePlayerRemove(playerName: string) {
        try{
            await playerRemoveByGroup(playerName, group);
            fetchPlayersByTeam(); 

        } catch (err) {
            console.log(err)
            Alert.alert('Remover pessoa', 'Não foi possível remover essa pessoa.')
        }
    }

    async function groupRemove() { 
        try {
            await groupRemoveByName(group)
        }catch (err) {
            console.log(err)
            Alert.alert('Remover grupo', 'Não foi possivel remover o grupo.')
        }
    }
    async function handleGroupRemove() { 
        Alert.alert(
            'Remover',
            'Deseja remover o grupo?',
            [
                {text: 'Não', style: 'cancel'},
                {text: 'Sim', onPress:() => groupRemove}
            ]
        )
    }



     useEffect(() => {
        
        fetchPlayersByTeam(); 
    }, [team])


    return (
        <Container>
            <Header showBackButton/>
            
            <Highlight 
                title={group}
                subtitle='Adicione a galera e separe os times' 
            />
            
            <Form>
                <Input
                inputRef={newPlayerNameInputRef}
                placeholder='Nome da pessoa'
                onChangeText={setNewPlayerName}
                value = { newPlayerName}
                autoCorrect={false}
                onSubmitEditing={handleAddPlayer}
                returnKeyType="done"
                />
                <ButtonIcon icon='add'
                onPress={handleAddPlayer}/>  
            </Form>

            <HeaderList>
                <FlatList 
                    data={['Time A', 'Time B', 'Time C', 'Time D', 'Time E']}
                    keyExtractor={item => item}
                    renderItem={({ item }) => (
                        <Filter 
                            title={item}
                            isActive={item === team}
                            onPress={() => setTeam(item)}
                            
                        />

                )}
                    horizontal         
                />
                <NumberOfPlayers>
                    {players.length}
                </NumberOfPlayers>
            </HeaderList>

            <FlatList 
                data={players}
                keyExtractor={item => item.name}
                renderItem= {({ item }) => (
                    <PlayerCard onRemove={() => handlePlayerRemove(item.name)} name={item.name} />
                )}
                ListEmptyComponent = {( ) => (
                    <ListEmpty message = "Não ha players nesses times" />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    {paddingBottom: 100},
                    players.length === 0 && {flex: 1}
                ]}
                />

                <Button 
                title= "Remover Time"
                type='SECONDARY'
                onPress={handleGroupRemove}
                />

        </Container>
    )
}