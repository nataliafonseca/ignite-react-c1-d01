import { useState } from 'react';

import '../styles/tasklist.scss';

import { FiTrash, FiCheckSquare } from 'react-icons/fi';

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    if (!newTaskTitle) return;

    const temp_tasks = Array.from(tasks);

    temp_tasks.push({
      id: Math.random(),
      title: newTaskTitle,
      isComplete: false,
    });

    setTasks(temp_tasks);
  }

  function handleToggleTaskCompletion(id: number) {
    const temp_tasks = Array.from(tasks);

    const task = temp_tasks.find((task) => task.id === id);
    if (!task) return;
    task.isComplete = task.isComplete ? false : true;

    setTasks(temp_tasks);
  }

  function handleRemoveTask(id: number) {
    const temp_tasks = Array.from(tasks);

    const taskIndex = temp_tasks.findIndex((task) => task.id === id);
    if (!temp_tasks[taskIndex]) return;
    temp_tasks.splice(taskIndex, 1);

    setTasks(temp_tasks);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? 'completed' : ''}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
