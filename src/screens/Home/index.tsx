import { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, SafeAreaView, FlatList, Alert } from 'react-native'
import { Participant } from '../../components/Participant';

import { styles } from "./styles"

export default function Home() {

  const [participant, setParticipant] = useState<string>("")

  const [participants, setNewParticipants] = useState<string[]>([]);

  function handleParticipantAdd() {
    if (participants.includes(participant)) {
      Alert.alert("Participante Existe", "Já existe um participante na lista com esse nome")
    } else if (/^[a-zA-Z]*$/.test(participant) === false || participant.length < 3) {
      Alert.alert("Ops, algo de errado não está certo")
    } else {
      setNewParticipants(prevState => [...prevState, participant])
      setParticipant("")
    }
  }

  function handleParticipantRemove(name: string) {

    setNewParticipants(prevState => prevState.filter(participantName => participantName !== name))
    Alert.alert("Remover", `Deseja remover o participante ${name} ?`, [
      {
        text: 'Sim',
        onPress: () => Alert.alert("Deletado")
      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ])
  }

  return (
    // Fragment
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do evento</Text>
      <Text style={styles.eventDate}>Sexta, 4 de novembro de 2022</Text>

      <View style={styles.form}>
        <TextInput
          value={participant}
          onChangeText={(name) => setParticipant(name)}
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6b6b6b"
        />
        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonOppacity}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={participants}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Participant
            key={item}
            name={item}
            onRemove={() => handleParticipantRemove(item)} />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguém chegou no evento ainda? Adicione participantes a sua lista de presença
          </Text>
        )}
      />

    </View>

  )
}