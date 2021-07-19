import React, { useState, useRef, useEffect } from 'react';
import { 
    View, 
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Text,
    Image
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png';
import pencilIcon from '../assets/icons/pencil/pencil.png';


export interface Task {
    id: number;
    title: string;
    done: boolean;
  }
  
  interface TaskItemProps {
    task: Task,
    index: number,
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: (id: number, title: string) => void;
  }
export function TaskItem({task, index, toggleTaskDone, removeTask, editTask } : TaskItemProps){
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(task.title);
    const textInputRef = useRef<TextInput>(null);

    function handleStartEditing(){
        setIsEditing(true);
    }
    function handleCancelEditing(){
        setNewTitle(task.title);
        setIsEditing(false);
    }
    function handleSubmitEditing(){
        editTask(task.id, newTitle);
        setIsEditing(false);
    }
    useEffect(()=>{
        if (textInputRef.current) {
            if (isEditing) {
              textInputRef.current.focus();
            } else {
              textInputRef.current.blur();
            }
        }
    },[isEditing]);

    return(
        <>
        <View>
              <TouchableOpacity
                testID={`button-${index}`}
                activeOpacity={0.7}
                style={styles.taskButton}
                onPress={() => toggleTaskDone(task.id)}
              >
                <View 
                  testID={`marker-${index}`}
                  style={task.done == true ? styles.taskMarkerDone : styles.taskMarker}
                >
                  { task.done && (
                    <Icon 
                      name="check"
                      size={12}
                      color="#FFF"
                    />
                  )}
                </View>

                <TextInput 
                  style={task.done == true ? styles.taskTextDone : styles.taskText}
                  value={newTitle}
                  onChangeText={setNewTitle}
                  editable={isEditing}
                  onSubmitEditing={handleSubmitEditing}
                  ref={textInputRef}
                >
                </TextInput>
              </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <TouchableOpacity
                    style={{paddingHorizontal: 12 }}
                    onPress={()=> isEditing ? handleCancelEditing() : handleStartEditing()}
                >{
                    isEditing ? (<Icon name="x" size={24} color="#b2b2b2"/>):(<Image source={pencilIcon} />)
                }
                    
                </TouchableOpacity>
                <View style={styles.taskDivider}></View>
                <TouchableOpacity
                    testID={`trash-${index}`}
                    style={{ paddingRight: 24, paddingLeft: 12,opacity: isEditing ? 0.2 : 1 }}
                    onPress={()=> removeTask(task.id)}
                    disabled={isEditing}
                >
                    <Image source={trashIcon} />
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    taskButton: {
      flex: 1,
      paddingHorizontal: 24,
      paddingVertical: 15,
      marginBottom: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center'
    },
    taskMarker: {
      height: 16,
      width: 16,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#B2B2B2',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskText: {
      color: '#666',
      fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
      height: 16,
      width: 16,
      borderRadius: 4,
      backgroundColor: '#1DB863',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskTextDone: {
      color: '#1DB863',
      textDecorationLine: 'line-through',
      fontFamily: 'Inter-Medium'
    },
    container: {
        flexDirection: 'row',
    },
    taskDivider: { 
        width: 1,
        height: 24,
        backgroundColor: 'rgba(196, 196, 196, 0.24)'
    }
  })