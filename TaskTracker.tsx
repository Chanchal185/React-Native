import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const TaskTracker = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskAssignDate, setTaskAssignDate] = useState('');
  const [taskDeadline, setTaskDeadline] = useState('');
  const [tasks, setTasks] = useState([]);
  const [deletedTasks, setDeletedTasks] = useState([]);
  const [taskCount, setTaskCount] = useState(1);

  const [showAssignDatePicker, setShowAssignDatePicker] = useState(false);
  const [showDeadlineDatePicker, setShowDeadlineDatePicker] = useState(false);

  const handleTaskTitleChange = (text) => {
    const capitalizedTitle = text.charAt(0).toUpperCase() + text.slice(1);
    setTaskTitle(capitalizedTitle);
  };

  const addTask = () => {
    if (taskTitle && taskDescription && taskDeadline && taskAssignDate) {
      const taskId = `Task${String(taskCount).padStart(3, '0')}`;
      const newTask = {
        id: taskId,
        title: taskTitle,
        description: taskDescription,
        deadline: taskDeadline,
        assignDate: taskAssignDate,
        status: 'Pending',
      };

      setTasks((prevTasks) => [...prevTasks, newTask]);
      setTaskTitle('');
      setTaskDescription('');
      setTaskAssignDate('');
      setTaskDeadline('');
      setTaskCount(taskCount + 1);
    } else {
      Alert.alert('Please fill all fields');
    }
  };

  const onChangeAssignDate = (event, selectedDate) => {
    const currentDate = selectedDate || taskAssignDate;
    setShowAssignDatePicker(Platform.OS === 'ios' ? true : false);
    setTaskAssignDate(currentDate.toISOString().split('T')[0]);
  };

  const onChangeDeadline = (event, selectedDate) => {
    const currentDate = selectedDate || taskDeadline;
    setShowDeadlineDatePicker(Platform.OS === 'ios' ? true : false);
    setTaskDeadline(currentDate.toISOString().split('T')[0]);
  };

  const markAsCompleted = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: 'Completed' } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            const taskToDelete = tasks.find((task) => task.id === taskId);
            if (taskToDelete) {
              setTasks((prevTasks) =>
                prevTasks.filter((task) => task.id !== taskId)
              );
              setDeletedTasks((prevDeletedTasks) => [
                ...prevDeletedTasks,
                taskToDelete,
              ]);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const undoDeleteTask = (taskId) => {
    const taskToRestore = deletedTasks.find((task) => task.id === taskId);
    if (taskToRestore) {
      setDeletedTasks((prevDeletedTasks) =>
        prevDeletedTasks.filter((task) => task.id !== taskId)
      );
      setTasks((prevTasks) => [
        ...prevTasks,
        { ...taskToRestore, status: 'Completed' },
      ]);
    }
  };

  const viewTaskDetails = (task) => {
    Alert.alert(
      'Task Details',
      `ID: ${task.id}\nTitle: ${task.title}\nDescription: ${task.description}\nAssigned On: ${task.assignDate}\nDeadline: ${task.deadline}`,
      [{ text: 'Close' }]
    );
  };

  const renderTaskItem = ({ item }) => (
    <View
      style={[styles.taskItem, item.status === 'Completed' && styles.completedTask]}
    >
      <Text style={styles.taskLabel}>
        ID: <Text style={styles.taskContent}>{item.id}</Text>
      </Text>
      <Text style={styles.taskLabel}>
        Title: <Text style={styles.taskContent}>{item.title}</Text>
      </Text>
      <Text style={styles.taskLabel}>
        Description: <Text style={styles.taskContent}>{item.description}</Text>
      </Text>
      <Text style={styles.taskLabel}>
        Assigned On: <Text style={styles.taskContent}>{item.assignDate}</Text>
      </Text>
      <Text style={styles.taskLabel}>
        Deadline: <Text style={styles.taskContent}>{item.deadline}</Text>
      </Text>
      <Text style={styles.taskLabel}>
        Status: <Text style={styles.taskContent}>{item.status}</Text>
      </Text>

      {item.status === 'Pending' && (
        <TouchableOpacity
          onPress={() => markAsCompleted(item.id)}
          style={styles.completeButton}
        >
          <Text style={styles.buttonText}>Mark as Completed</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={() => deleteTask(item.id)}
        style={styles.deleteButton}
      >
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  const renderDeletedTaskItem = ({ item }) => (
    <View style={styles.deletedTaskItem}>
      <Text style={styles.deletedTaskText}>{item.id}</Text>
      <View style={styles.deletedTaskButtons}>
        <TouchableOpacity
          onPress={() => viewTaskDetails(item)}
          style={styles.viewButton}
        >
          <Text style={styles.buttonText}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => undoDeleteTask(item.id)}
          style={styles.undoButton}
        >
          <Text style={styles.buttonText}>Undo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f9f9f9' }}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Task Tracker</Text>

        <TextInput
          style={styles.input}
          placeholder="Task Title"
          value={taskTitle}
          onChangeText={handleTaskTitleChange}
          placeholderTextColor="#888"
          maxLength={20}
        />
        <TextInput
          style={styles.input}
          placeholder="Task Description"
          value={taskDescription}
          onChangeText={setTaskDescription}
          placeholderTextColor="#888"
          maxLength={50}
        />

        {/* Assign Date Picker */}
        <TouchableOpacity
          onPress={() => setShowAssignDatePicker(true)}
          style={styles.dateInput}
        >
          <Text style={styles.dateInputText}>
            {taskAssignDate || 'Assign Date (YYYY-MM-DD)'}
          </Text>
        </TouchableOpacity>
        {showAssignDatePicker && (
          <DateTimePicker
            testID="assignDatePicker"
            value={new Date(taskAssignDate || Date.now())}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChangeAssignDate}
          />
        )}

        {/* Deadline Date Picker */}
        <TouchableOpacity
          onPress={() => setShowDeadlineDatePicker(true)}
          style={styles.dateInput}
        >
          <Text style={styles.dateInputText}>
            {taskDeadline || 'Task Deadline (YYYY-MM-DD)'}
          </Text>
        </TouchableOpacity>
        {showDeadlineDatePicker && (
          <DateTimePicker
            testID="deadlineDatePicker"
            value={new Date(taskDeadline || Date.now())}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChangeDeadline}
          />
        )}

        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.buttonText}>Add Task</Text>
        </TouchableOpacity>

        <Text style={styles.subHeader}>Pending Tasks</Text>
        {tasks.filter((task) => task.status === 'Pending').length === 0 ? (
          <Text style={styles.noTasksText}>No Pending Tasks</Text>
        ) : (
          <FlatList
            data={tasks.filter((task) => task.status === 'Pending')}
            renderItem={renderTaskItem}
            keyExtractor={(item) => item.id}
          />
        )}

        <Text style={styles.subHeader}>Completed Tasks</Text>
        {tasks.filter((task) => task.status === 'Completed').length === 0 ? (
          <Text style={styles.noTasksText}>No Completed Tasks</Text>
        ) : (
          <FlatList
            data={tasks.filter((task) => task.status === 'Completed')}
            renderItem={renderTaskItem}
            keyExtractor={(item) => item.id}
          />
        )}

        <Text style={styles.subHeader}>Deleted Tasks</Text>
        {deletedTasks.length === 0 ? (
          <Text style={styles.noTasksText}>No Deleted Tasks</Text>
        ) : (
          <FlatList
            data={deletedTasks}
            renderItem={renderDeletedTaskItem}
            keyExtractor={(item) => item.id}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
    color: '#333',
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
    justifyContent: 'center',
  },
  dateInputText: {
    color: '#666',
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 16,
    color: '#333',
  },
  taskItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#fff',
  },
  completedTask: {
    backgroundColor: '#d4edda',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
    alignItems: 'center',
  },
  completeButton: {
    backgroundColor: '#28a745',
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
    alignItems: 'center',
  },
  noTasksText: {
    textAlign: 'center',
    color: '#666',
    marginVertical: 16,
  },
  deletedTaskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#f8d7da',
  },
  deletedTaskText: {
    color: '#721c24',
  },
  deletedTaskButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewButton: {
    backgroundColor: '#007bff',
    padding: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  undoButton: {
    backgroundColor: '#28a745',
    padding: 8,
    borderRadius: 8,
  },
});

export default TaskTracker;
