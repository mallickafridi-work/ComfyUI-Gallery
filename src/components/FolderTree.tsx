// src/FolderTree.tsx
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useAppStore } from "@/store";

function FolderTree() {

  const { tree } = useAppStore();

  if (!tree) {
    return null;
  }

  return (
    <ul className="pl-2 transition-all duration-200 ease-in-out">
      <FolderNode
        key={tree.path}
        node={tree}
      />
    </ul>
  );
}

function FolderNode({ node }: any) {

  const { getImages, currentFolder } = useAppStore();

  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);
  const isActive = currentFolder === node.path;

  return (
    <li className="list-none">
      <div
        className={`border border-ring flex items-center gap-2 cursor-pointer rounded-xs px-2 py-1 my-0.5
          ${isActive ? "bg-blue-300 dark:bg-blue-900 font-semibold" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
        onClick={() => {
          toggle();
          getImages(node.path);
        }}
      >

        {node.children && node.children.length > 0 ? (
          open ? (
            <ChevronDown className={`w-4 h-4 ${isActive ? "text-blue-600" : "text-blue-500"}`} />
          ) : (
            <ChevronRight className={`w-4 h-4 ${isActive ? "text-blue-600" : "text-blue-500"}`} />
          )
        ) : (
          <ChevronRight className={`w-4 h-4 ${isActive ? "text-blue-600" : "text-blue-500"}`} />
        )}


        <span className="truncate">{node.name}</span>
      </div>

      {open && node.children && node.children.length > 0 && (
        <ul className="pl-4">
          {node.children.map((child: any) => (
            <FolderNode
              key={child.path}
              node={child}
              onClick={getImages}
              currentFolder={currentFolder}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default FolderTree;
