/* eslint-disable react-hooks/exhaustive-deps */
import {
  ChangeEvent,
  KeyboardEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { useTask } from "../../../hooks/useTask";
import getDate from "../../../utilities/date";
import { ChronoContext } from "../context/ChronoContext";
import { motion, useDragControls } from "framer-motion";

//TYPES
import { Task } from "./../../../config/types";
//COMPONENTS
import Image, { StaticImageData } from "next/image";
import Chrono from "./Chrono";
import OverlayMenu from "./OverlayMenu";
import OptionPriority from "./OptionPriority";
import bigCheck from "./../../../public/icons/bigCheck.png";
import bigCheck_dark from "./../../../public/icons/bigcheck-dark.png";
import done from "./../../../public/icons/done.png";
import done_dark from "./../../../public/icons/done-dark.png";
import delIcon from "./../../../public/icons/delete.png";
import delIcon_dark from "./../../../public/icons/bin-dark.png";
import useStateCallback from "../../../hooks/useStateCallback";
import { useTheme } from "next-themes";

interface TaskProps {
  task: Task;
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
  const { theme } = useTheme();
  const [inputs, setInputs] = useStateCallback({
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
  const { updateTask, deleteTask } = useTask();
  const [isChanged, setIsChanged] = useState(false);
  const [onDelete, setOnDelete] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [overlaySwitch, setOverlaySwitch] = useState(0);

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

  const handleUpdate = async () => {
    if (isChanged === true) {
      console.log(inputs.iscompleted);
      try {
        await updateTask({
          taskId: inputs.id,
          description: inputs.description,
          priority: inputs.priority,
          timer: inputs.timer,
          iscompleted: inputs.iscompleted,
        });
      } catch (error) {}
      setIsChanged(false);
    }
  };

  const handleCompleted = async () => {
    try {
      await updateTask({
        taskId: inputs.id,
        description: inputs.description,
        priority: inputs.priority,
        timer: inputs.timer,
        iscompleted: true,
      });
    } catch (error) {
    } finally {
      router.refresh();
    }
  };

  const handleDelete = async () => {
    await deleteTask({ taskId: inputs.id });
    router.refresh();
    setOnDelete(true);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape" || event.key === "Enter") {
      setEdit(false);
      handleUpdate();
    }
  };

  const router = useRouter();

  const setTaskDone = async () => {
    setInputs(
      {
        id: inputs.id,
        description: inputs.description,
        priority: inputs.priority,
        timer: inputs.timer,
        iscompleted: !inputs.iscompleted,
      },
      handleCompleted
    );
    if (start || isPaused) {
      setTimerState({
        task_id: null,
        value: value,
        start: false,
        end: false,
        isPaused: false,
      });
    }
    setIsOverlayOpen(false);
  };
  const handleOverlay = (overlay: number) => {
    // setIsOverlayOpen(true);
    overlay === 0 ? setIsOverlayOpen(true) : "";
    // setOverlaySwitch(1);
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
  }, [inputs]);

  useEffect(() => {
    if (end) {
      setTaskNotActivated();
    }
  }, [end]);
  //save task infos in state
  useEffect(() => {
    setCurrentTask();
  }, []);
  // useEffect(() => {
  //   setOverlaySwitch(0);
  // }, [start, isChronoOpen, task_id, edit, inputs]);
  // let isMobile = window.matchMedia("(pointer:coarse)").matches;
  const controls = useDragControls();
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      onClick={() => {
        handleOverlay(overlaySwitch);
      }}
      onKeyDown={(e) => {
        handleKeyPress(e);
      }}
      onBlur={() => {
        handleUpdate();
        setIsOverlayOpen(false);
        setOverlaySwitch(0);
      }}
      drag="x"
      dragConstraints={{ left: 0, right: 100 }}
      dragSnapToOrigin={true}
      dragElastic={0.1}
      onDrag={(event, info) => {
        if (info.offset.x > 200) {
          isOldTask() || task_id === inputs.id
            ? ""
            : ref.current === null
            ? ""
            : (ref.current.style.background = "#D84242");
        } else {
          ref.current === null
            ? ""
            : (ref.current.style.background = "transparent");
        }
      }}
      onDragEnd={(event, info) => {
        if (info.offset.x > 200) {
          isOldTask() || task_id === inputs.id ? "" : handleDelete();
        } else {
          ref.current === null
            ? ""
            : (ref.current.style.background = "transparent");
        }
      }}
      dragControls={controls}
    >
      <motion.div
        ref={ref}
        tabIndex={0}
        className={` ${
          inputs.id === task_id && isPaused === false
            ? "isActive"
            : inputs.id === task_id && isPaused
            ? "isPaused"
            : ""
        } relative  overflow-hidden rounded-lg p-[3px] w-full h-[6rem] drop-shadow-[0_5px_3px_rgba(0,0,0,0.3)]  `}
        initial={{ height: 100, x: 0 }}
        animate={{ height: onDelete ? 0 : 100, x: onDelete ? 500 : 0 }}
        transition={{ delay: 0, ease: "linear" }}
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <div
          className={`  overflow-hidden  relative font-bold flex p-2 w-full h-full mb-2   rounded-lg bg-white --dark-- dark:border-2 dark:border-[#E18B15] dark:bg-[#3A405F]   `}
        >
          {/* //overlay// */}
          {inputs.iscompleted ? (
            <div className="absolute flex justify-end items-center rounded-lg w-full h-full top-0 left-0 bg-[#DEFFBC] bg-opacity-60 --dark-- dark:bg-[#2c314e] dark:bg-opacity-60">
              <div className="h-[6rem] w-[6rem] pr-2 opacity-30">
                {theme === "dark" ? (
                  <Image src={bigCheck_dark} priority alt="" />
                ) : (
                  <Image src={bigCheck} priority alt="" />
                )}
              </div>
            </div>
          ) : (
            ""
          )}

          {isOldTask() ? (
            ""
          ) : (
            <div hidden={edit ? true : false}>
              <div
                className={` ${
                  isOverlayOpen ? "opacity-100" : "opacity-0"
                } transition-all ease-in `}
              >
                {isChronoOpen ? (
                  <Chrono
                    inputs={inputs}
                    setInputs={setInputs}
                    setIsChronoOpen={setIsChronoOpen}
                    setIsOverlayOpen={setIsOverlayOpen}
                    handleUpdate={handleUpdate}
                  />
                ) : (
                  <div
                  // onClick={() => {
                  //   handleOverlay(overlaySwitch);
                  // }}
                  >
                    <OverlayMenu
                      isOverlayOpen={isOverlayOpen}
                      setIsOverlayOpen={setIsOverlayOpen}
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
                  </div>
                )}
              </div>
            </div>
          )}

          {/* //overlay// */}
          {/* //options// */}

          <OptionPriority
            inputs={inputs}
            setInputs={setInputs}
            priorityIcon={priorityIcon}
            setPriorityIcon={setPriorityIcon}
            isOld={isOld}
            isArchived={isArchived}
          />
          {/* //options// */}
          {/* //description// */}
          <div className={`flex items-center w-4/5 p-2`}>
            <input
              className={`w-full h-full border-transparent bg-transparent placeholder:text-gray-200  ${
                inputs.id === task_id ? "placeholder:text-transparent " : ""
              } focus:outline-none `}
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
                setIsOverlayOpen(false);
              }}
            />
          </div>
          {/* //description// */}

          {edit ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleDelete();
              }}
              className="absolute top-0 right-0 border-r-lg ml-3 flex flex-col h-full w-14 "
            >
              <button
                type="submit"
                title="delete"
                className="flex justify-center items-center border-b-2 dark:border-[#E18B15] w-full h-1/3"
              >
                <div>
                  {theme === "dark" ? (
                    <Image className="h-4 w-3.5" src={delIcon_dark} alt="" />
                  ) : (
                    <Image src={delIcon} alt="" />
                  )}
                </div>
              </button>

              <button
                title="confirm"
                className="flex justify-center items-center w-full h-2/3"
                onClick={() => {
                  setEdit(false);
                  setIsOverlayOpen(false);
                }}
              >
                <div className=" h-4 w-4 ">
                  {theme === "dark" ? (
                    <Image src={done_dark} alt="" />
                  ) : (
                    <Image src={done} alt="" />
                  )}
                </div>
              </button>
            </form>
          ) : (
            ""
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
