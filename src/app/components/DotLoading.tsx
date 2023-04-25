import { useTheme } from "next-themes";

export default function DotLoading() {
  const { theme } = useTheme();

  return (
    <div className="  h-full w-full flex justify-center mt-24">
      <div className={theme === "dark" ? "lds-ellipsis--dark" : "lds-ellipsis"}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
