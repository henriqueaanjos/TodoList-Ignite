import React, { useState } from 'react';
import { StyleSheet, View, Alert} from 'react-native';

import { Header } from '../components/Header';
import { TasksList } from '../components/TasksList';
import { Task } from '../components/TaskItem';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const hasTODO = tasks.find(task => task.title == newTaskTitle);
    if(!hasTODO){
      const task = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false,
      }

      setTasks(oldTasks => [...oldTasks, task]);
    }else{
      Alert.alert(
        'Task já cadastrada',
        'Você não pode cadastrar uma task com o mesmo nome'
      )
    }
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }))

    const updateTask = updatedTasks.find(task => task.id == id);
    if(updateTask?.done == true){
      updateTask.done = false;
    }else if(updateTask?.done == false){
      updateTask.done = true;
    }
    setTasks([...updatedTasks]);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover item','Tem certeza que você deseja remover esse item?',
      [
        {
          text: 'Não',
          style: 'cancel'
        },{
          text: 'Sim',
          onPress: () => setTasks(oldTasks => oldTasks.filter(
            task => task.id != id
          ))
        }
      ]
    );
    
  }

  function handleEditTask(taskId: number, taskNewTitle: string ){
    const updatedTasks = tasks.map(task => ({...task}));
    const updateTask = updatedTasks.find(task => task.id == taskId);
    if(updateTask){
      updateTask.title = taskNewTitle;
    }
    setTasks([...updatedTasks]);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})