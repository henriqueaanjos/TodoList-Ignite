import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }

    setTasks(oldTasks => [...oldTasks, task]);
  }

  function handleToggleTaskDone(id: number) {
    console.log('1 - ', tasks);
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
    setTasks(oldTasks => oldTasks.filter(
      task => task.id != id
    ));
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
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