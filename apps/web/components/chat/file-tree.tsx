import FileTreeNode from "./file-tree-node";
import { TreeNode } from "@/app/types";

const tree: TreeNode[] = [
  {
    id: "1",
    name: "src",
    path: "src",
    type: "folder",
    children: [
      {
        id: "2",
        name: "app",
        path: "src/app",
        type: "folder",
        children: [
          {
            id: "3",
            name: "page.tsx",
            path: "",
            type: "file",
          },
          {
            id: "4",
            name: "layout.tsx",
            path: "",
            type: "file",
          },
        ],
      },
      {
        id: "5",
        name: "components",
        path: "",
        type: "folder",
        children: [
          {
            id: "6",
            name: "button.tsx",
            path: "",
            type: "file",
          },
        ],
      },
    ],
  },
  {
    id: "7",
    name: "package.json",
    path: "",
    type: "file",
  },
  {
    id: "8",
    name: "README.md",
    path: "",
    type: "file",
  },
];

export default function FileTree() {
  return (
    <div className="space-y-1">
      {tree.map((node) => (
        <FileTreeNode key={node.id} node={node} />
      ))}
    </div>
  );
}
