import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { FlatList } from 'react-native';
import { Button } from '../../components/Button';
import { GroupCard } from "../../components/GroupCard";
import { Header } from "../../components/Header";
import { Highlight } from "../../components/Highlight";
import { ListEmpty } from '../../components/ListEmpty';
import { groupsGetAll } from '../../components/storage/group/groupsGetAll';
import { Container } from "./styles";

export  function Groups() {
   const navigation = useNavigation();
  
   const [groups, setGroups] = useState<string[]>([
      'Turma de Karatê da minha Avó',
      'Feijoada do Fabricio',
      'Feira de Adoção de Cobra Coral',
      'Equipe de Som do Wesley Safadão',
      'Gerencia do Carrefour',
      'Anões do Pânico',
      'Line de Valorant do Kifas']);
      
    
      function handleNewGroup () {

        navigation.navigate('newgroup')
    }


    async function fetchGroups() {
      try{
       const data = await groupsGetAll();
       setGroups(data)
      } catch (e) {
        console.log(e)
      }

    }

    function handleOpenGroup(group: string) {
      navigation.navigate('players', { group });
    }

    useFocusEffect(useCallback(() => {
        fetchGroups()
    }, []))




  return (
    <Container>
      <Header />
      
      <Highlight title="Turmas" subtitle="Jogue com a sua turma!"/>
      
      <FlatList 
          data={groups}
          keyExtractor={item => item}
          renderItem={({ item }) => (
          <GroupCard 
            title={item}
            onPress={() => handleOpenGroup(item)}
          />
        )}
        contentContainerStyle={groups.length === 0 && {flex: 1}}
        ListEmptyComponent= {() => <ListEmpty message = "Sua lista esta vazia :("/>}
      
      />

      <Button 
       title= "Criar nova Turma"
       onPress={handleNewGroup}
      />
    </Container>
  );
}

