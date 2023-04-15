"use client";
import {
  ChangeEvent,
  KeyboardEvent,
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

//TYPES
import { TaskType } from "../page";
//COMPONENTS
import Image, { StaticImageData } from "next/image";
import Chrono from "./Chrono";
import OverlayMenu from "./OverlayMenu";
import OptionPriority from "./OptionPriority";
import { ChronoContext } from "../context/ChronoContext";
import getDate from "../../../utilities/date";
import { useTask } from "../../../hooks/useTask";

interface TaskProps {
  task: TaskType;
  date: string;
  onWeek?: boolean;
  isOld?: boolean;
  isArchived?: boolean;
}

export default function TaskCard({
  task,
  date,
  onWeek,
  isOld,
  isArchived,
}: TaskProps) {
  const [inputs, setInputs] = useState({
    id: 0,
    description: "",
    priority: "",
    timer: 0,
    iscompleted: false,
  });
  const [priorityIcon, setPriorityIcon] = useState<StaticImageData>();
  const [isChronoOpen, setIsChronoOpen] = useState(false);
  const { setTimerState, start, end, value, isPaused, task_id } =
    useContext(ChronoContext);
  const [edit, setEdit] = useState(false);
  const { taskDay, compareDate } = getDate();
  const taskDate = taskDay(date);
  const { createTask, updateTask, deleteTask } = useTask();
  const [isChanged, setIsChanged] = useState(false);
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  const isOldTask = () => {
    if (compareDate(taskDate) < 0) {
      return true;
    } else {
      return false;
    }
  };

  const setCurrentTask = () => {
    setInputs({
      id: task.id,
      description: task.description,
      priority: task.priority,
      timer: task.timer,
      iscompleted: task.iscompleted,
    });
  };

  const handleUpdate = () => {
    if (isChanged) {
      setIsChanged(false);
      updateTask({
        taskId: inputs.id,
        description: inputs.description,
        priority: inputs.priority,
        timer: inputs.timer,
        iscompleted: inputs.iscompleted,
      });
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape" || event.key === "Enter") {
      setEdit(false);
      handleUpdate();
    }
  };
  const setTaskDone = () => {
    setInputs({
      id: inputs.id,
      description: inputs.description,
      priority: inputs.priority,
      timer: inputs.timer,
      iscompleted: !inputs.iscompleted,
    });
  };

  const setTaskNotActivated = () => {
    return setTimerState({
      task_id: null,
      value: inputs.timer,
      start: false,
      end: false,
      isPaused: false,
    });
  };
  useEffect(() => {
    setIsChanged(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputs]);

  useEffect(() => {
    if (end) {
      setTaskNotActivated();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [end]);

  useEffect(() => {
    setCurrentTask();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`relative flex p-2 w-full h-[6rem] mb-2 ${
        inputs.id === task_id ? "border-dashed" : ""
      } border-2 border-black rounded-lg bg-white`}
      onKeyDown={(e) => {
        handleKeyPress(e);
      }}
      onBlur={() => {
        handleUpdate();
      }}
    >
      {/* //overlay// */}
      {isOldTask() ? (
        ""
      ) : (
        <>
          <div
            className="opacity-0 hover:opacity-100 transition-all ease-in "
            hidden={edit ? true : false}
          >
            {isChronoOpen ? (
              <Chrono
                inputs={inputs}
                setInputs={setInputs}
                setIsChronoOpen={setIsChronoOpen}
              />
            ) : (
              <OverlayMenu
                setTaskDone={setTaskDone}
                inputs={inputs}
                setEdit={setEdit}
                setIsChronoOpen={setIsChronoOpen}
                task_id={task_id}
                start={start}
                end={end}
                setTimerState={setTimerState}
                isPaused={isPaused}
                value={value}
                onWeek={onWeek ? true : false}
              />
            )}
          </div>
        </>
      )}

      {/* //overlay// */}
      {/* //description// */}
      <div className="flex items-center w-4/5 p-2 ">
        <input
          className="w-full h-full border-transparent focus:outline-none "
          readOnly={edit ? false : true}
          type="text"
          value={inputs.description}
          placeholder="Describe your task.."
          name="description"
          onChange={(e) => {
            handleChangeInput(e);
          }}
          onBlur={() => {
            setEdit(false);
            // handleUpdate();
          }}
        />
      </div>
      {/* //description// */}
      {/* //options// */}

      <OptionPriority
        inputs={inputs}
        setInputs={setInputs}
        priorityIcon={priorityIcon}
        setPriorityIcon={setPriorityIcon}
        edit={edit}
        isOld={isOld}
        isArchived={isArchived}
      />

      {/* //options// */}
    </div>
  );
}
