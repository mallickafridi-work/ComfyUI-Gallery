import { Folder, Home } from "lucide-react";
import { useAppStore } from "../store";

const CurrentPathInfo = () => {
  const { tree, currentFolder, handleFolderClick } = useAppStore();

  if (!tree || !currentFolder) {
    return <div className="rounded-t-md bg-accent italic text-gray-500">
      <Home />
    </div>;
  }

  const findTrail = (node, targetPath, trail = []) => {
    const newTrail = [...trail, node];
    if (node.path === targetPath) return newTrail;
    if (node.children) {
      for (const child of node.children) {
        const result = findTrail(child, targetPath, newTrail);
        if (result) return result;
      }
    }
    return null;
  };

  const trail = findTrail(tree, currentFolder) || [tree];

  return (
    <div className="flex items-center gap-2 px-2 py-1 bg-accent rounded-t-md py-2">
      {trail.map((crumb, idx) => (
        <span key={crumb.path} className="flex items-center">
          <Folder className="w-7 h-5 mr-0.5" />
          <button
            onClick={() => handleFolderClick(crumb.path)}
            className="hover:underline truncate"
          >
            {crumb.name}
          </button>
          {idx < trail.length - 1 && <span className="mx-1 text-gray-500">›</span>}
        </span>
      ))}
    </div>
  );
};

export default CurrentPathInfo  