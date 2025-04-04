import Image from "next/image";

import { cn, getTechLogos } from "@/lib/utils";

const DisplayTechIcons = async ({ techStack }: TechIconProps) => {
  console.log("Received techStack:", techStack); // Debugging

  // Ensure techStack is an array before passing it to getTechLogos
  const safeTechStack = Array.isArray(techStack) ? techStack : [];

  const techIcons = await getTechLogos(safeTechStack);

  console.log("Processed techIcons:", techIcons); // Debugging

  return (
    <div className="flex flex-row">
      {techIcons.slice(0, 3).map(({ tech, url }, index) => (
        <div key={tech} className="relative group bg-dark-300 rounded-full p-2 flex flex-center">
          <span className="tech-tooltip">{tech}</span>
          <Image src={url} alt={tech} width={100} height={100} className="size-5" />
        </div>
      ))}
    </div>
  );
};


export default DisplayTechIcons;