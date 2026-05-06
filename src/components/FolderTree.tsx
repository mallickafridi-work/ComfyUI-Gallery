// src/FolderTree.tsx
import { useState } from "react";
import { ChevronRight, ChevronDown, Folder } from "lucide-react";

function FolderTree({ node, onClick, currentFolder }) {
  return (
    <ul className="pl-2">
      <FolderNode
        key={node.path}
        node={node}
        onClick={onClick}
        currentFolder={currentFolder}
      />
    </ul>
  );
}

function FolderNode({ node, onClick, currentFolder }) {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);
  const isActive = currentFolder === node.path;

  return (
    <li className="list-none">
      <div
        className={`bg-card flex items-center gap-2 cursor-pointer rounded-xs px-2 py-1 my-0.5
          ${isActive ? "bg-blue-100 dark:bg-blue-900 font-semibold" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
        onClick={() => {
          toggle();
          onClick(node.path);
        }}
      >
        {node.children && node.children.length > 0 ? (
          open ? (
            <ChevronDown className="w-4 h-4 text-black" />
          ) : (
            <ChevronRight className="w-4 h-4 text-black" />
          )
        ) : (
          <span className="w-4 h-4" />
        )}

        <Folder className={`w-4 h-4 ${isActive ? "text-blue-600" : "text-blue-500"}`} />
        <span className="truncate">{node.name}</span>
      </div>

      {open && node.children && node.children.length > 0 && (
        <ul className="pl-4">
          {node.children.map((child) => (
            <FolderNode
              key={child.path}
              node={child}
              onClick={onClick}
              currentFolder={currentFolder}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default FolderTree;
