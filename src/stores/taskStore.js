import { reactive, computed } from 'vue';

export const useTaskStore = () => {
  const state = reactive({
    tasks: [],
    nextId: 1,
  });

  const addTask = (title) => {
    state.tasks.push({ id: state.nextId++, title, completed: false });
  };

  const deleteTask = (taskId) => {
    state.tasks = state.tasks.filter(task => task.id !== taskId);
  };

  const toggleTaskCompletion = (taskId) => {
    const task = state.tasks.find(task => task.id === taskId);
    if (task) {
      task.completed = !task.completed;
    }
  };

  const editTask = (taskId, newTitle) => {
    const task = state.tasks.find(task => task.id === taskId);
    if (task) {
      task.title = newTitle;
    }
  };

  const incompleteTasksCount = computed(() => {
    return state.tasks.filter(task => !task.completed).length;
  });

  return {
    tasks: state.tasks,
    addTask,
    deleteTask,
    toggleTaskCompletion,
    editTask,
    incompleteTasksCount,
  };
};