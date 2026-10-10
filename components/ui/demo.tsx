import { DiaText } from "@/components/ui/text-dia";

export default function Default() {
  return (
    <div className="flex min-h-[300px] w-full items-center justify-center bg-white dark:bg-black">
      <h1 className="text-4xl font-semibold tracking-tight text-black dark:text-white">
        Боремся за<br />
        <DiaText words={["независимость", "правду", "Россию"]} duration={2400} />
      </h1>
    </div>
  );
}
