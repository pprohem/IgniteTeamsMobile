import { useState } from 'react';
import { FlatList } from 'react-native';
import { Button } from '../../components/Button';
import { GroupCard } from "../../components/GroupCard";
import { Header } from "../../components/Header";
import { Highlight } from "../../components/Highlight";
import { ListEmpty } from '../../components/ListEmpty';
import { Container } from "./styles";

export  function Groups() {
    const [groups, setGroups] = useState<string[]>([
      'Turma de Karatê da minha Avó',
      'Feijoada do Fabricio',
      'Feira de Adoção de Cobra Coral',
      'Equipe de Som do Wesley Safadão',
      'Gerencia do Carrefour',
      'Anões do Pânico',
      'Line de Valorant do Kifas']);

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
          />
        )}
        contentContainerStyle={groups.length === 0 && {flex: 1}}
        ListEmptyComponent= {() => <ListEmpty message = "Sua lista esta vazia :("/>}
      
      />

      <Button 
       title= "Criar nova Turma"
      />
    </Container>
  );
}

