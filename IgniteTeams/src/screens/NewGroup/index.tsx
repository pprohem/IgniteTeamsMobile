import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Highlight } from "../../components/Highlight";
import { Input } from "../../components/Input";
import { Container, Content, Icon } from "./styles";

export function NewGroup () { 
    return(

        <Container>
             <Header showBackButton/>

             <Content>
                <Icon />

                <Highlight
                    title="Nova turma"
                    subtitle="crie a turma para adicionar novas essoas"
                />

                <Input 
                    placeholder="Nome da sua turma"
                />
                
                <Button 
                    title= "Criar"
                    style={{ marginTop: 20}}
                />
             </Content>
        </Container>
    )
}