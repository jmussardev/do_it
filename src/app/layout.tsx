import Header from "./components/Header";
import TimerContext from "./context/ChronoContext";
import AuthContext from "./context/AuthContext";
import "./globals.css";
import { getPayload } from "../../utilities/payload";
import { getTasks } from "../../utilities/getTasks";
import Providers from "./context/ThemeContext";

export const metadata = {
  title: "Do.it",
  description: "minimalist todolist",
};

const { getNumTasks, getTasksDone } = getTasks();

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const payload = getPayload();
  let numTasks;
  let numTasksDone;

  if (payload) {
    numTasks = await getNumTasks(payload);
    numTasksDone = await getTasksDone(payload);
  }

  return (
    <html lang="en">
      <body className=" ">
        <Providers>
          <main
            className=" flex flex-col h-screen w-screen -- sm:flex-row sm:h-[50rem] sm:m-auto 
         sm:max-w-5xl "
          >
            <AuthContext>
              <TimerContext>
                {payload && (
                  <Header
                    payload={payload}
                    numTasks={numTasks}
                    numTasksDone={numTasksDone}
                  />
                )}

                <main className="flex h-full -- sm:center sm:m-auto sm:w-3/4  sm:py-8 ">
                  <main className="relative m-auto w-full h-full xsm:w-full xsm:h-full  dark:bg-[#3A405F] bg-white shadow-inner -- sm:h-[95%] sm:w-[70%] sm:min-w-[70%] sm:m-auto sm:rounded">
                    {children}
                    <div className="sm:absolute origin-center bottom-12 left-[20%] text-xs xsm:text-sm xsm:bottom-12 xsm:left-[30%] sm:-bottom-12  sm:left-[25%]  text-center">
                      CRUD PROJECT BY MUSSARD JEFFREY
                    </div>
                  </main>
                </main>
              </TimerContext>
            </AuthContext>
          </main>
        </Providers>
      </body>
    </html>
  );
}

// bg-topo-pattern
